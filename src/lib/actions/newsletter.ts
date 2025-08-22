"use server";

import { rateLimit } from "@/lib/rate-limit";
import { addSubscriber } from "@/lib/db/newsletter";
import { sendWelcomeEmail } from "@/lib/mail";
import type { SupportedLocale } from "@/lib/mail";
import { headers } from "next/headers";

export interface NewsletterSignupData {
  email: string;
  locale: SupportedLocale;
  firstName?: string;
  lastName?: string;
  source?: string;
}

export interface NewsletterSignupResult {
  success: boolean;
  message: string;
  rateLimited?: boolean;
  errorCode?: string;
}

export async function signupForNewsletter(
  data: NewsletterSignupData
): Promise<NewsletterSignupResult> {
  const startTime = Date.now();
  
  try {
    // Get client information
    const headersList = await headers();
    const forwarded = headersList.get("x-forwarded-for");
    const realIp = headersList.get("x-real-ip");
    const ipAddress = forwarded?.split(",")[0] || realIp || "unknown";
    const userAgent = headersList.get("user-agent") || "unknown";

    console.log(`Newsletter signup attempt: ${data.email} from ${ipAddress}`);

    // Apply rate limiting (5 attempts per hour per IP)
    const { success: rateLimitSuccess } = await rateLimit(
      `newsletter-signup:${ipAddress}`,
      5,
      3600000 // 1 hour
    );

    if (!rateLimitSuccess) {
      console.warn(`Rate limit exceeded for IP: ${ipAddress}`);
      return {
        success: false,
        message: "Too many signup attempts. Please try again later.",
        rateLimited: true,
        errorCode: "RATE_LIMITED",
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      console.warn(`Invalid email format: ${data.email}`);
      return {
        success: false,
        message: "Please enter a valid email address.",
        errorCode: "INVALID_EMAIL",
      };
    }

    // Add subscriber to database
    const subscriber = await addSubscriber({
      email: data.email,
      locale: data.locale,
      firstName: data.firstName,
      lastName: data.lastName,
      ipAddress,
      userAgent,
      source: data.source || "website",
    });

    if (!subscriber) {
      console.warn(`Subscriber already exists: ${data.email}`);
      return {
        success: false,
        message: "Email is already subscribed to our newsletter.",
        errorCode: "ALREADY_SUBSCRIBED",
      };
    }

    console.log(`New subscriber added: ${data.email} (ID: ${subscriber.id})`);

    // Send welcome email
    try {
      const emailSent = await sendWelcomeEmail({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        locale: data.locale,
        unsubscribeToken: subscriber.unsubscribeToken,
      });

      if (!emailSent) {
        console.error(`Failed to send welcome email to: ${data.email}`);
        // Don't fail the signup if email fails, but log it
      } else {
        console.log(`Welcome email sent to: ${data.email}`);
      }
    } catch (emailError) {
      console.error("Welcome email error:", emailError);
      // Don't fail the signup if email fails
    }

    const duration = Date.now() - startTime;
    console.log(`Newsletter signup completed in ${duration}ms for: ${data.email}`);

    return {
      success: true,
      message: "Successfully subscribed! Check your email for confirmation.",
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`Newsletter signup error after ${duration}ms:`, error);
    
    return {
      success: false,
      message: "An error occurred. Please try again later.",
      errorCode: "INTERNAL_ERROR",
    };
  }
}

export async function unsubscribeFromNewsletter(
  email: string,
  token: string
): Promise<{ success: boolean; message: string; errorCode?: string }> {
  try {
    console.log(`Unsubscribe attempt: ${email}`);
    
    const { unsubscribeUser } = await import("@/lib/db/newsletter");
    const success = await unsubscribeUser(email, token);

    if (success) {
      console.log(`Successfully unsubscribed: ${email}`);
      return {
        success: true,
        message: "Successfully unsubscribed from the newsletter.",
      };
    } else {
      console.warn(`Invalid unsubscribe attempt: ${email}`);
      return {
        success: false,
        message: "Invalid unsubscribe link or email already unsubscribed.",
        errorCode: "INVALID_TOKEN",
      };
    }
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return {
      success: false,
      message: "An error occurred. Please try again later.",
      errorCode: "INTERNAL_ERROR",
    };
  }
}
