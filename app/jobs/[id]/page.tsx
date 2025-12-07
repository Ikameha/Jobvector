import { AppNav } from "@/components/app-nav"
import JobDetail from "@/components/job-detail"

export default async function JobDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      <JobDetail jobId={params.id} />
    </div>
  )
}
