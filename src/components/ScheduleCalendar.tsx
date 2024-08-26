"use client";
import React, { FC, useState } from "react";
import { Calendar } from "./ui/calendar";

export const ScheduleCalendar: FC<{ bookedDays: Date[] }> = ({
  bookedDays,
}) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border max-w-4xl"
      modifiers={{
        booked: bookedDays,
      }}
      modifiersClassNames={{
        booked: "bg-green-500",
      }}
    />
  );
};
