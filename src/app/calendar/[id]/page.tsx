import { CalendarEdit, ScheduleCalendar, ShareCalendar } from '@/components';
import { Badge } from '@/components/ui/badge';
import { getCalendarById } from '@/lib/data/actions';
const bookedDays = [
  new Date(2024, 7, 8),
  new Date(2024, 7, 9),
  new Date(2024, 7, 11),
];

export default async function CalendarPage({
  params,
}: {
  params: { id: string };
}) {
  const calendar = await getCalendarById(params.id);
  return (
    <main className="p-4 constraints space-y-6 lg:space-y-6">
      {/* <LoginForm /> */}

      {/* <CalendarEdit /> */}
      <h1 className="text-3xl font-bold mb-6">{calendar.title}</h1>
      <div className="space-x-4">
        <Badge variant="success">All Available</Badge>
        <Badge variant="secondary">Your slots</Badge>
      </div>
      <ScheduleCalendar bookedDays={bookedDays} />
      <div className="flex items-center flex-row justify-between">
        <CalendarEdit />

        <ShareCalendar />
      </div>
    </main>
  );
}
