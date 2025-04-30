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
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Contact Information Skeleton */}
          <div className="md:col-span-1">
            <Skeleton className="mb-6 h-8 w-48" />

            <div className="space-y-6">
              {/* Cards Skeleton */}
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-48 w-full rounded-md" />
              ))}

              {/* Map Skeleton */}
              <Skeleton className="h-64 w-full rounded-md" />
            </div>
          </div>

          {/* Contact Form Skeleton */}
          <div className="md:col-span-2">
            <Skeleton className="mb-6 h-8 w-48" />
            <Skeleton className="h-[600px] w-full rounded-md" />
          </div>
        </div>

        {/* FAQ Section Skeleton */}
        <div className="mt-16">
          <div className="mb-8 text-center">
            <Skeleton className="mx-auto mb-4 h-8 w-64" />
            <Skeleton className="mx-auto h-6 w-full max-w-2xl" />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-40 w-full rounded-md" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
