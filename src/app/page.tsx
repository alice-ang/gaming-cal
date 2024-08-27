import {
  CalendarEdit,
  LoginForm,
  ScheduleCalendar,
  ShareCalendar,
} from '@/components';
import { Button } from '@/components/ui/button';
const bookedDays = [
  new Date(2024, 7, 8),
  new Date(2024, 7, 9),
  new Date(2024, 7, 11),
];

export default function Home() {
  return (
    <main className="">
      <LoginForm />
      <Button size="sm">Availibility</Button>
      <CalendarEdit />
      <ScheduleCalendar bookedDays={bookedDays} />
      <ShareCalendar />
    </main>
  );
}
