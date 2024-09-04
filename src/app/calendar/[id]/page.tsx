import { CalendarEdit, ScheduleCalendar, ShareCalendar } from '@/components';
import { Badge } from '@/components/ui/badge';
import { initialFriendsAvailability } from '@/lib/mock';
const bookedDays = [
  new Date(2024, 8, 8),
  new Date(2024, 8, 9),
  new Date(2024, 8, 11),
];

export default async function CalendarPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <main className="p-4 constraints space-y-6 lg:space-y-6">
      {/* <LoginForm /> */}

      {/* <CalendarEdit /> */}
      <h1 className="text-3xl font-bold mb-6">{params.id}</h1>
      <div className="space-x-4">
        <Badge variant="success">All Available</Badge>
        <Badge variant="secondary">Your slots</Badge>
      </div>
      <ScheduleCalendar availability={initialFriendsAvailability} />
      <div className="flex items-center flex-row justify-between">
        <CalendarEdit />

        <ShareCalendar />
      </div>
    </main>
  );
}
