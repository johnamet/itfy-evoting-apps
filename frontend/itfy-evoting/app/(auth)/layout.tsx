import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentication - IT FOR Youth Ghana Evoting',
  description: 'Login to access your account',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]" />
      </div>

      {/* Content */}
      <main className="relative flex min-h-screen flex-col">
        {children}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 py-4 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} IT FOR Youth Ghana. All rights reserved.</p>
      </footer>
    </div>
  );
}
