import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-16">
      {/* Hero Section Skeleton */}
      <section className="relative bg-[#001F3F] py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Skeleton className="mx-auto mb-4 h-10 w-64" />
            <Skeleton className="mx-auto mb-8 h-6 w-full max-w-2xl" />
            <Skeleton className="mx-auto h-12 w-full max-w-2xl rounded-md" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Tabs Skeleton */}
        <div className="mb-8 flex space-x-2 overflow-x-auto">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-32 flex-shrink-0" />
          ))}
        </div>

        {/* FAQ Items Skeleton */}
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-md" />
          ))}
        </div>
      </div>
    </div>
  )
}
