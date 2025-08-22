import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { unsubscribeFromNewsletter } from '@/lib/actions/newsletter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Mail } from 'lucide-react';
import Link from 'next/link';

interface UnsubscribePageProps {
  searchParams: {
    email?: string;
    token?: string;
  };
}

async function UnsubscribeContent({ searchParams }: UnsubscribePageProps) {
  const { email, token } = searchParams;

  if (!email || !token) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <XCircle className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle className="text-xl">Invalid Unsubscribe Link</CardTitle>
          <CardDescription>
            This unsubscribe link appears to be invalid or incomplete.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            If you're trying to unsubscribe from our newsletter, please use the unsubscribe link from a recent email.
          </p>
          <Link href="/">
            <Button>Return to Homepage</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  const result = await unsubscribeFromNewsletter(email, token);

  // Redirect to main page after successful unsubscription
  if (result.success) {
    redirect('/');
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${
          result.success ? 'bg-green-100' : 'bg-red-100'
        }`}>
          {result.success ? (
            <CheckCircle className="h-6 w-6 text-green-600" />
          ) : (
            <XCircle className="h-6 w-6 text-red-600" />
          )}
        </div>
        <CardTitle className="text-xl">
          {result.success ? 'Successfully Unsubscribed' : 'Unsubscribe Failed'}
        </CardTitle>
        <CardDescription>
          {result.message}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        {result.success ? (
          <>
            <p className="text-sm text-muted-foreground">
              You have been removed from our newsletter. We're sorry to see you go!
            </p>
            <p className="text-sm text-muted-foreground">
              You can always resubscribe later if you change your mind.
            </p>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            If you continue to have issues, please contact our support team.
          </p>
        )}
        
        <div className="flex flex-col sm:flex-row gap-2 pt-4">
          <Link href="/" className="flex-1">
            <Button variant="outline" className="w-full">
              Return to Homepage
            </Button>
          </Link>
          {result.success && (
            <Link href="/newsletter" className="flex-1">
              <Button className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                Resubscribe
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function UnsubscribePage({ searchParams }: UnsubscribePageProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Suspense
        fallback={
          <Card className="w-full max-w-md mx-auto">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            </CardContent>
          </Card>
        }
      >
        <UnsubscribeContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
