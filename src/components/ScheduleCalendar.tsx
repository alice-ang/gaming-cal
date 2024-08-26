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
      className="rounded-md border"
      modifiers={{
        booked: bookedDays,
      }}
      modifiersClassNames={{
        booked: "bg-green-500",
      }}
    />
  );
};
