'use client';

import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Booking, timeSlots } from '@/lib/mock';
import { Plus } from 'lucide-react';
import { FC, useState } from 'react';

type CalendarDayViewProps = {
  currentDate: Date;
  initialBookings: Booking[];
};

export const CalendarDayView: FC<CalendarDayViewProps> = ({
  currentDate,
  initialBookings,
}) => {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);

  const handleAddBooking = (slot: string) => {
    const hasOverlappingBooking = bookings.some(
      (booking) =>
        (slot >= booking.startTime && slot < booking.endTime) ||
        (booking.startTime >= slot &&
          booking.startTime <
            new Date(
              new Date(`2000-01-01T${slot}`).getTime() + 60 * 60 * 1000
            ).toLocaleTimeString('sv-SE', {
              hour: '2-digit',
              minute: '2-digit',
            }))
    );

    if (hasOverlappingBooking) {
      alert("Ypu've already booked this slot");
      return;
    }
    const newBooking: Booking = {
      id: Date.now().toString(),
      name: 'Alice A',
      avatar: 'https://github.com/shadcn.png',
      startTime: slot,
      endTime: new Date(
        new Date(`2000-01-01T${slot}`).getTime() + 60 * 60 * 1000
      ).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' }),
      color: 'bg-blue-200',
    };
    setBookings((prev) => [...prev, newBooking]);
  };

  const getBookingsForSlot = (slot: string) => {
    return bookings.filter(
      (booking) => booking.startTime <= slot && slot < booking.endTime
    );
  };

  return (
    <ScrollArea className="h-[400px]">
      <div className="p-4">
        {timeSlots.map((slot) => {
          const slotBookings = getBookingsForSlot(slot.title);
          return (
            <div key={slot.title} className="flex items-center mb-2">
              <div className="w-16 text-sm text-gray-500">{slot.title}</div>
              <div className="flex-1 h-12 relative">
                <div className="absolute inset-0 flex items-center space-x-1 border-b border-muted">
                  {slotBookings.map((booking) => (
                    <TooltipProvider key={booking.id}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Avatar className={`h-8 w-8 ${booking.color}`}>
                            <img src={booking.avatar} alt={booking.name} />
                          </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{booking.name}</p>
                          <p>
                            {booking.startTime} - {booking.endTime}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => handleAddBooking(slot.title)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
};
