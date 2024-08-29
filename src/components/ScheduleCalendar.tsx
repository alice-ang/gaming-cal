'use client';
import { bookings } from '@/lib/mock';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FC, useState } from 'react';
import { CalendarDayView } from './CalendarDayView';
import { TimeSlot } from './TimeSlot';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

type TimeSlot = {
  start: string;
  end: string;
};

export const ScheduleCalendar: FC<{ bookedDays: Date[] }> = ({
  bookedDays,
}) => {
  const [date, setDate] = useState<Date>(new Date());
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { start: '', end: '' },
  ]);
  const [open, setOpen] = useState(false);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setDate(date);
      setTimeSlots([]);
      setOpen(true);
    }
  };

  const handlePrevDay = () => {
    setDate((prev) => new Date(prev.setDate(prev.getDate() - 1)));
  };

  const handleNextDay = () => {
    setDate((prev) => new Date(prev.setDate(prev.getDate() + 1)));
  };

  return (
    <div>
      <Calendar
        showWeekNumber
        mode="single"
        selected={date}
        onSelect={handleDateSelect}
        className="rounded-md border bg-background"
        modifiers={{
          booked: bookedDays,
        }}
        modifiersClassNames={{
          booked: 'bg-success text-success-foreground',
        }}
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent closeButton={false}>
          <DialogHeader className="flex flex-row items-center justify-between">
            <Button variant="ghost" size="icon" onClick={handlePrevDay}>
              <ChevronLeft />
            </Button>
            <div className="text-center">
              <DialogTitle>
                {date?.toLocaleDateString('en-US', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </DialogTitle>
              <DialogDescription>Select time slots</DialogDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={handleNextDay}>
              <ChevronRight />
            </Button>
          </DialogHeader>
          <CalendarDayView initialBookings={bookings} />
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                onClick={() => console.log(timeSlots)}
                className="w-full"
                size="lg"
              >
                Save
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
