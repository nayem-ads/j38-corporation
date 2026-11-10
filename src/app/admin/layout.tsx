import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Portal — J38 Corporation',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
