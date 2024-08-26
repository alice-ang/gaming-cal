import { ScheduleCalendar } from "@/components";

export default function Schedule() {
  const bookedDays = [
    new Date(2024, 7, 8),
    new Date(2024, 7, 9),
    new Date(2024, 7, 11),
  ];

  return (
    <main className=" ">
      <ScheduleCalendar bookedDays={bookedDays} />
    </main>
  );
}
