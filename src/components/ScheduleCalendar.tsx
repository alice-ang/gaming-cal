'use client';
import { ChevronLeft, ChevronRight, CirclePlus, Trash2, X } from 'lucide-react';
import { FC, useState } from 'react';
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
import { CalendarDayView } from './CalendarDayView';
import { ScrollArea } from './ui/scroll-area';
import { Avatar } from './ui/avatar';
import { bookings } from '@/lib/mock';

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

  const handleAddTimeSlot = () => {
    setTimeSlots([...timeSlots, { start: '', end: '' }]);
  };

  const handleRemoveTimeSlot = (index: number) => {
    const newTimeSlots = timeSlots.filter((_, i) => i !== index);
    setTimeSlots(newTimeSlots);
  };

  const handleTimeChange = (
    index: number,
    field: 'start' | 'end',
    value: string
  ) => {
    const newTimeSlots = [...timeSlots];
    newTimeSlots[index][field] = value;
    setTimeSlots(newTimeSlots);
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
        <DialogContent className="max-w-md">
          <DialogHeader className="flex flex-row items-center justify-between">
            <Button variant="ghost" size="icon" onClick={handlePrevDay}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-center space-y-1">
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
              <ChevronRight className="h-4 w-4" />
            </Button>
          </DialogHeader>
          <CalendarDayView currentDate={date} initialBookings={bookings} />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" onClick={() => console.log(timeSlots)}>
                Save slots
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
