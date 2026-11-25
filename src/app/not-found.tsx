import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-white dark:bg-black text-black dark:text-white">
      <div className="flex items-center gap-6">
        <h1 className="text-2xl font-medium border-r border-black/30 dark:border-white/30 pr-6 py-2">
          404
        </h1>
        <h2 className="text-sm font-normal">
          This page could not be found.
        </h2>
      </div>
      <div className="mt-8">
        <Link
          href="/"
          className="text-xs text-gray-500 hover:text-black dark:hover:text-white underline"
        >
          Return to aiforui.dev
        </Link>
      </div>
    </div>
  );
}
