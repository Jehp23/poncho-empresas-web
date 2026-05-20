import { Skeleton } from "@/shared/ui/skeleton";

export function DashboardLoading() {
  return (
    <div className="mx-auto w-full max-w-[76rem] flex-1 px-6 py-7 lg:px-10">
      <Skeleton className="mb-6 h-8 w-48" />
      <Skeleton className="mb-6 h-20 w-full rounded-xl" />
      <div className="mb-6 grid grid-cols-2 gap-4 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-12">
        <Skeleton className="h-64 rounded-xl lg:col-span-8" />
        <Skeleton className="h-64 rounded-xl lg:col-span-4" />
      </div>
    </div>
  );
}
