import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard - IT FOR Youth Ghana Evoting',
  description: 'Admin dashboard for managing events, candidates, and voting',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Override the parent (auth) layout with a clean wrapper
  // The AdminDashboard component handles its own layout
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}
