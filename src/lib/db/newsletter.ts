import { PrismaClient } from "@/.prisma/client";
import { createUnsubscribeToken } from "../mail/utils";
import type { SupportedLocale } from "../mail/index";

const prisma = new PrismaClient();

export interface NewsletterSubscriber {
  email: string;
  locale: SupportedLocale;
  firstName?: string;
  lastName?: string;
  ipAddress?: string;
  userAgent?: string;
  source?: string;
}

export interface SubscriberRecord {
  id: string;
  email: string;
  locale: string;
  firstName?: string | null;
  lastName?: string | null;
  unsubscribeToken: string;
  subscribedAt: Date;
  unsubscribedAt?: Date | null;
  isActive: boolean;
  ipAddress?: string | null;
  userAgent?: string | null;
  source?: string | null;
}

/**
 * Add a new subscriber to the newsletter
 */
export async function addSubscriber(
  subscriber: NewsletterSubscriber
): Promise<SubscriberRecord | null> {
  try {
    // Check if email already exists and is active
    const existing = await prisma.newsletter_subscriptions.findUnique({
      where: { email: subscriber.email.toLowerCase() },
    });

    if (existing && existing.isActive) {
      throw new Error("Email already subscribed");
    }

    // Generate unsubscribe token
    const unsubscribeToken = createUnsubscribeToken(subscriber.email);

    // If exists but inactive, reactivate
    if (existing && !existing.isActive) {
      const updated = await prisma.newsletter_subscriptions.update({
        where: { email: subscriber.email.toLowerCase() },
        data: {
          isActive: true,
          unsubscribedAt: null,
          unsubscribeToken,
          locale: subscriber.locale,
          firstName: subscriber.firstName,
          lastName: subscriber.lastName,
          ipAddress: subscriber.ipAddress,
          userAgent: subscriber.userAgent,
          source: subscriber.source,
          subscribedAt: new Date(),
        },
      });
      return updated;
    }

    // Create new subscription
    const newSubscriber = await prisma.newsletter_subscriptions.create({
      data: {
        email: subscriber.email.toLowerCase(),
        locale: subscriber.locale,
        firstName: subscriber.firstName,
        lastName: subscriber.lastName,
        unsubscribeToken,
        ipAddress: subscriber.ipAddress,
        userAgent: subscriber.userAgent,
        source: subscriber.source,
      },
    });

    return newSubscriber;
  } catch (error) {
    console.error("Failed to add subscriber:", error);
    return null;
  }
}

/**
 * Unsubscribe a user from the newsletter
 */
export async function unsubscribeUser(
  email: string,
  token: string
): Promise<boolean> {
  try {
    const subscriber = await prisma.newsletter_subscriptions.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!subscriber || subscriber.unsubscribeToken !== token) {
      return false;
    }

    await prisma.newsletter_subscriptions.update({
      where: { email: email.toLowerCase() },
      data: {
        isActive: false,
        unsubscribedAt: new Date(),
      },
    });

    return true;
  } catch (error) {
    console.error("Failed to unsubscribe user:", error);
    return false;
  }
}

/**
 * Get subscriber by email
 */
export async function getSubscriber(
  email: string
): Promise<SubscriberRecord | null> {
  try {
    return await prisma.newsletter_subscriptions.findUnique({
      where: { email: email.toLowerCase() },
    });
  } catch (error) {
    console.error("Failed to get subscriber:", error);
    return null;
  }
}

/**
 * Get all active subscribers
 */
export async function getActiveSubscribers(): Promise<SubscriberRecord[]> {
  try {
    return await prisma.newsletter_subscriptions.findMany({
      where: { isActive: true },
      orderBy: { subscribedAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to get active subscribers:", error);
    return [];
  }
}

/**
 * Get subscriber count by locale
 */
export async function getSubscriberStats() {
  try {
    const totalActive = await prisma.newsletter_subscriptions.count({
      where: { isActive: true },
    });

    const byLocale = await prisma.newsletter_subscriptions.groupBy({
      by: ["locale"],
      where: { isActive: true },
      _count: true,
    });

    return {
      totalActive,
      byLocale: byLocale.map((item: { locale: string; _count: number }) => ({
        locale: item.locale,
        count: item._count,
      })),
    };
  } catch (error) {
    console.error("Failed to get subscriber stats:", error);
    return { totalActive: 0, byLocale: [] };
  }
}

export { prisma };
