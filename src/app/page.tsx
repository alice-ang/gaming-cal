import { CalendarDashboard } from '@/components';

export default async function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Calendar Dashboard</h1>
      <CalendarDashboard />
    </div>
  );
}
