'use client';
import { UserAvailability } from '@/lib/mock';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FC, useCallback, useMemo, useState } from 'react';
import { DayView } from './DayView';
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

export const ScheduleCalendar: FC<{ availability: UserAvailability[] }> = ({
  availability,
}) => {
  const [friendsAvailability, setFriendsAvailability] = useState(availability);
  const [date, setDate] = useState<Date>(new Date());
  const [confirmed, setConfirmed] = useState<Date[]>([new Date()]);

  const [userAvailability, setUserAvailability] = useState<UserAvailability>({
    id: 0,
    name: 'You',
    availableDates: {
      '2024-09-02': [{ start: '09:00', end: '17:00' }],
    },
  });

  const [open, setOpen] = useState(false);

  const handleMounthChange = (mounth: Date | undefined) => {
    if (!mounth) {
      return;
    }
    const startOfMonth = new Date(mounth.getFullYear(), mounth.getMonth(), 1);
    const endOfMonth = new Date(mounth.getFullYear(), mounth.getMonth() + 1, 0);
    const confirmedDates: Date[] = [];

    for (
      let day = startOfMonth;
      day <= endOfMonth;
      day.setDate(day.getDate() + 1)
    ) {
      const dateString = format(day, 'yyyy-MM-dd');
      const allUsersAvailable = [
        userAvailability,
        ...friendsAvailability,
      ].every(
        (user) =>
          user.availableDates[dateString] &&
          user.availableDates[dateString].length > 0
      );

      if (allUsersAvailable) {
        confirmedDates.push(new Date(day));
      }
    }

    setConfirmed(confirmedDates);
  };

  const handleAvailabilityChange = (date: Date | undefined) => {
    if (date) {
      setOpen(true);
      const dateString = format(date, 'yyyy-MM-dd');
      const newAvailability = { ...userAvailability.availableDates };
      if (!newAvailability[dateString]) {
        newAvailability[dateString] = [{ start: '09:00', end: '17:00' }];
      }
      setUserAvailability({
        ...userAvailability,
        availableDates: newAvailability,
      });
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
        onSelect={handleAvailabilityChange}
        className="rounded-md border bg-background"
        modifiers={{
          booked: confirmed,
        }}
        onMonthChange={handleMounthChange}
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
          <DayView
            date={date}
            userAvailability={userAvailability}
            friendsAvailability={friendsAvailability}
            setUserAvailability={setUserAvailability}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" className="w-full" size="lg">
                Save
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
