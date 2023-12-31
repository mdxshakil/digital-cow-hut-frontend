export default function Loading() {
  return (
    <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center bg-secondary">
      <span className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-gray-400"></span>
    </div>
  );
}
