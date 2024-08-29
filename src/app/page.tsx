import { CalendarEdit, ScheduleCalendar, ShareCalendar } from '@/components';
const bookedDays = [
  new Date(2024, 7, 8),
  new Date(2024, 7, 9),
  new Date(2024, 7, 11),
];

export default function Home() {
  return (
    <main className="p-4 constraints">
      {/* <LoginForm /> */}

      <CalendarEdit />
      <ScheduleCalendar bookedDays={bookedDays} />
      <ShareCalendar />
    </main>
  );
}
