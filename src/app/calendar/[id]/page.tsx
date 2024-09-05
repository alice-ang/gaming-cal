import { CalendarEdit, ScheduleCalendar, ShareCalendar } from '@/components';
import { Badge } from '@/components/ui/badge';
import { initialFriendsAvailability } from '@/lib/mock';
import { createClient } from '@/lib/supabase/client';

export default async function CalendarPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();

  const { data: calendar, error } = await supabase
    .from('calendars')
    .select('*')
    .eq('id', params.id)
    .single();

  return (
    <main className="p-4 constraints space-y-6 lg:space-y-6">
      {/* <LoginForm /> */}

      {/* <CalendarEdit /> */}
      <h1 className="text-3xl font-bold mb-6">{calendar.title}</h1>
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
