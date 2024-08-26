"use client";
import React, { FC, useState } from "react";
import { Calendar } from "./ui/calendar";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { CirclePlus, X } from "lucide-react";
import { TimeSlot } from "./TimeSlot";

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

type TimeSlot = {
  start: string;
  end: string;
};

export const ScheduleCalendar: FC<{ bookedDays: Date[] }> = ({
  bookedDays,
}) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { start: "", end: "" },
  ]);

  const handleDateSelect = (date: Date | undefined) => {
    setDate(date);
  };

  const handleAddTimeSlot = () => {
    setTimeSlots([...timeSlots, { start: "", end: "" }]);
  };

  const handleRemoveTimeSlot = (index: number) => {
    const newTimeSlots = timeSlots.filter((_, i) => i !== index);
    setTimeSlots(newTimeSlots);
  };

  const handleTimeChange = (
    index: number,
    field: "start" | "end",
    value: string
  ) => {
    const newTimeSlots = [...timeSlots];
    newTimeSlots[index][field] = value;
    setTimeSlots(newTimeSlots);
  };

  return (
    <>
      <DialogTrigger asChild>
        <div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            className="rounded-md border max-w-4xl mx-auto bg-background"
            modifiers={{
              booked: bookedDays,
            }}
            modifiersClassNames={{
              booked: "bg-green-100",
            }}
          />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{date?.toDateString()}</DialogTitle>
          <DialogDescription>Select time slots</DialogDescription>
        </DialogHeader>
        <div>
          {timeSlots.map((slot, index) => (
            <div className="flex flex-row justify-between" key={index}>
              <div className="flex flex-row items-center space-x-4">
                <TimeSlot /> <p>to</p> <TimeSlot type="end" />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveTimeSlot(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <DialogFooter>
          <div className="flex flex-row justify-between w-full">
            <Button
              variant="outline"
              className="gap-2"
              onClick={handleAddTimeSlot}
            >
              <CirclePlus size={16} />
              Add time slot
            </Button>
            <Button>Save changes</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </>
  );
};
