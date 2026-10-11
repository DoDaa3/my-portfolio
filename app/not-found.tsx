import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Page not found | Omar Amine' };

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4 pt-24 pb-16">
      <div className="text-center max-w-md">
        <p className="text-7xl sm:text-8xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
          404
        </p>
        <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Page not found</h1>
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          The page you’re looking for doesn’t exist or has moved.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
          >
            Back to home
          </Link>
          <Link
            href="/#projects"
            className="px-6 py-3 border-2 border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 rounded-lg font-medium hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
          >
            See my projects
          </Link>
        </div>
      </div>
    </section>
  );
}
