import { getSubscriberStats, getActiveSubscribers } from '@/lib/db/newsletter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Mail, Globe, TrendingUp } from 'lucide-react';

export async function NewsletterDashboard() {
  const [stats, subscribers] = await Promise.all([
    getSubscriberStats(),
    getActiveSubscribers()
  ]);

  const recentSubscribers = subscribers.slice(0, 10);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Newsletter Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of newsletter subscriptions and engagement
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalActive.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Active newsletter subscribers
            </p>
          </CardContent>
        </Card>

        {stats.byLocale.map((locale) => (
          <Card key={locale.locale}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {locale.locale.toUpperCase()} Subscribers
              </CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{locale.count.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {((locale.count / stats.totalActive) * 100).toFixed(1)}% of total
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Subscribers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Recent Subscribers
          </CardTitle>
          <CardDescription>
            Latest newsletter signups
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentSubscribers.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No subscribers yet
              </p>
            ) : (
              recentSubscribers.map((subscriber) => (
                <div
                  key={subscriber.id}
                  className="flex items-center justify-between space-x-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">
                        {subscriber.firstName || subscriber.lastName
                          ? `${subscriber.firstName || ''} ${subscriber.lastName || ''}`.trim()
                          : subscriber.email
                        }
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {subscriber.locale.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {subscriber.email}
                    </p>
                    {subscriber.source && (
                      <p className="text-xs text-muted-foreground">
                        Source: {subscriber.source}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {new Date(subscriber.subscribedAt).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(subscriber.subscribedAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Locale Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Locale Distribution
          </CardTitle>
          <CardDescription>
            Breakdown of subscribers by language
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stats.byLocale.map((locale) => {
              const percentage = (locale.count / stats.totalActive) * 100;
              return (
                <div key={locale.locale} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{locale.locale.toUpperCase()}</span>
                    <span className="text-muted-foreground">
                      {locale.count} ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default NewsletterDashboard;
