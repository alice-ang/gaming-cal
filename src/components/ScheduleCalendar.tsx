'use client';
import { CirclePlus, X } from 'lucide-react';
import { FC, useState } from 'react';
import { TimeSlot } from './TimeSlot';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import {
  Dialog,
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
  const [date, setDate] = useState<Date | undefined>(new Date());
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

  return (
    <div>
      <Calendar
        showWeekNumber
        mode="single"
        selected={date}
        onSelect={handleDateSelect}
        className="rounded-md border max-w-4xl mx-auto bg-background"
        modifiers={{
          booked: bookedDays,
        }}
        modifiersClassNames={{
          booked: 'bg-green-100',
        }}
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{date?.toDateString()}</DialogTitle>
            <DialogDescription>Select time slots</DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            {timeSlots.map((slot, index) => (
              <div className="flex flex-row justify-between" key={index}>
                <div className="flex flex-row items-center space-x-4">
                  <TimeSlot
                    onValueChange={(value) =>
                      handleTimeChange(index, 'start', value)
                    }
                  />
                  <p>to</p>{' '}
                  <TimeSlot
                    type="end"
                    startTime={timeSlots[0]?.['start']}
                    onValueChange={(value) =>
                      handleTimeChange(index, 'end', value)
                    }
                  />
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
              <Button onClick={() => console.log(timeSlots)}>
                Save changes
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
