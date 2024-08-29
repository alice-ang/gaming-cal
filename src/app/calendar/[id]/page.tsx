import { CalendarEdit, ScheduleCalendar, ShareCalendar } from '@/components';
import { Badge } from '@/components/ui/badge';
const bookedDays = [
  new Date(2024, 7, 8),
  new Date(2024, 7, 9),
  new Date(2024, 7, 11),
];

export default function CalendarPage({ params }: { params: { id: string } }) {
  return (
    <main className="p-4 constraints space-y-6 lg:space-y-6">
      {/* <LoginForm /> */}

      {/* <CalendarEdit /> */}
      <h1 className="text-3xl font-bold mb-6">{decodeURI(params.id)}</h1>
      <div>
        <Badge variant="success">All Available</Badge>
      </div>
      <ScheduleCalendar bookedDays={bookedDays} />
      <div className="flex items-center flex-row justify-between">
        <CalendarEdit />

        <ShareCalendar />
      </div>
    </main>
  );
}
