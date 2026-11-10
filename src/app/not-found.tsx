import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F5F5F2] text-[#0A0A0A] flex flex-col justify-between p-6 sm:p-12">
      <header>
        <Link href="/" className="inline-block">
          <Image
            src="/logo-black.png"
            alt="J38 Corporation"
            width={1541}
            height={178}
            priority
            className="h-6 w-auto block object-contain"
          />
        </Link>
      </header>

      <main className="max-w-xl my-auto py-12">
        <div className="text-xs font-bold tracking-[0.2em] text-[#0C4137] uppercase mb-4">
          Error 404
        </div>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight mb-6">
          Page not found.
        </h1>
        <p className="text-lg text-[#3A3A3A] leading-relaxed mb-8">
          The page you are looking for doesn&apos;t exist or has been moved. Head back to the homepage to explore our growth engines or request an audit.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center min-h-[50px] bg-[#0A0A0A] hover:bg-[#0C4137] text-[#F5F5F2] px-6 rounded-xl text-xs font-bold tracking-[0.1em] uppercase transition-colors"
          >
            ← Back to Homepage
          </Link>
          <Link
            href="/#j38-audit"
            className="inline-flex items-center justify-center min-h-[50px] border border-black/20 hover:border-black text-[#0A0A0A] px-6 rounded-xl text-xs font-bold tracking-[0.1em] uppercase transition-colors"
          >
            Get Free Audit ↗
          </Link>
        </div>
      </main>

      <footer className="text-sm text-[#777777] border-t border-black/10 pt-6">
        © J38 Corporation • Built for What&apos;s Next.
      </footer>
    </div>
  );
}
