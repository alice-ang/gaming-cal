'use client';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { timeSlots } from '@/lib/mock';
import { Edit2, Trash2 } from 'lucide-react';
import { FC, useCallback, useEffect, useRef, useState } from 'react';

type Booking = {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  color: string;
};

type CalendarDayViewProps = {
  // currentDate: Date;
  initialBookings: Booking[];
};

export const CalendarDayView: FC<CalendarDayViewProps> = ({
  initialBookings,
}) => {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragEnd, setDragEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const timeGridRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (index: number) => {
    setDragStart(index);
    setDragEnd(index);
    setIsDragging(true);
    setEditingBooking(null);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && timeGridRef.current) {
      const rect = timeGridRef.current.getBoundingClientRect();
      const y = e.clientY - rect.top;
      const slotHeight = rect.height / timeSlots.length;
      const slotIndex = Math.floor(y / slotHeight);
      setDragEnd(Math.max(0, Math.min(slotIndex, timeSlots.length - 1)));
    }
  };

  const handleMouseUp = useCallback(() => {
    if (dragStart !== null && dragEnd !== null) {
      const startHour = Math.min(dragStart, dragEnd);
      const endHour = Math.max(dragStart, dragEnd) + 1;

      const startTime = `${startHour.toString().padStart(2, '0')}:00`;
      const endTime =
        endHour === 24 ? '00:00' : `${endHour.toString().padStart(2, '0')}:00`;
      if (editingBooking) {
        setBookings((prev) =>
          prev.map((booking) =>
            booking.id === editingBooking.id
              ? { ...booking, startTime, endTime }
              : booking
          )
        );
        setEditingBooking(null);
      } else {
        const newBooking: Booking = {
          id: Date.now().toString(),
          name: 'You',
          startTime,
          endTime,
          color: 'bg-orange-200',
        };
        setBookings((prev) => [...prev, newBooking]);
      }
    }
    setIsDragging(false);
    setDragStart(null);
    setDragEnd(null);
  }, [
    dragStart,
    dragEnd,
    editingBooking,
    setBookings,
    setEditingBooking,
    setIsDragging,
    setDragStart,
    setDragEnd,
  ]);

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleMouseUp();
      }
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, dragStart, dragEnd, handleMouseUp]);

  const getDraggableStyle = () => {
    if (dragStart === null || dragEnd === null) return {};
    const top = `${
      (Math.min(dragStart, dragEnd) / (timeSlots.length * 4)) * 100
    }%`;
    const height = `${
      ((Math.abs(dragEnd - dragStart) + 1) / (timeSlots.length * 4)) * 100
    }%`;
    return { top, height };
  };

  const getBookingStyle = (booking: Booking) => {
    const startHour = parseInt(booking.startTime.split(':')[0]);
    const endHour = parseInt(booking.endTime.split(':')[0]);

    const startIndex = startHour;
    const endIndex = endHour === 0 ? 24 : endHour;

    const top = `${(startIndex / timeSlots.length) * 100}%`;
    const height = `${((endIndex - startIndex) / timeSlots.length) * 100}%`;
    return { top, height };
  };

  const handleEditBooking = (booking: Booking) => {
    setEditingBooking(booking);
    const startHour = parseInt(booking.startTime.split(':')[0]);
    const endHour = parseInt(booking.endTime.split(':')[0]);

    const startIndex = startHour;
    const endIndex = endHour === 0 ? 23 : endHour - 1;

    setDragStart(startIndex);
    setDragEnd(endIndex);
    setIsDragging(true);
  };

  const handleDeleteBooking = (bookingId: string) => {
    setBookings((prev) => prev.filter((booking) => booking.id !== bookingId));
  };

  const getOverlappingBookings = useCallback(
    (time: string) => {
      return bookings?.filter(
        (booking) => booking.startTime <= time && time < booking.endTime
      );
    },
    [bookings]
  );

  const hasAllUsersOverlapping = useCallback(
    (slotIndex: number) => {
      const time = `${slotIndex.toString().padStart(2, '0')}:00`;
      const overlappingBookings = getOverlappingBookings(time);

      // Get unique user names from the bookings
      const uniqueUsers = new Set(bookings.map((booking) => booking.name));

      // Check if the number of overlapping bookings equals the number of unique users
      return (
        overlappingBookings.length === uniqueUsers.size &&
        overlappingBookings.length > 1
      );
    },
    [bookings, getOverlappingBookings]
  );

  const findOverlappingPeriods = useCallback(() => {
    const periods: { start: number; end: number }[] = [];
    let currentPeriod: { start: number; end: number } | null = null;

    for (let i = 0; i < timeSlots.length * 4; i++) {
      if (hasAllUsersOverlapping(i)) {
        if (!currentPeriod) {
          currentPeriod = { start: i, end: i };
        } else {
          currentPeriod.end = i;
        }
      } else if (currentPeriod) {
        periods.push(currentPeriod);
        currentPeriod = null;
      }
    }

    if (currentPeriod) {
      periods.push(currentPeriod);
    }

    return periods;
  }, [hasAllUsersOverlapping]);

  return (
    <div className="w-full rounded-lg overflow-hidden">
      <ScrollArea>
        <div
          className="relative"
          ref={timeGridRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseUp}
        >
          {timeSlots.map((slot, index) => (
            <div key={slot.title} className="relative select-none	">
              <div
                className="flex items-center h-6 mb-1"
                onMouseDown={() => handleMouseDown(index)}
              >
                <div className="w-16 text-xs text-gray-500">{slot.title}</div>
                <div className="flex-1 border-t border-gray-200"></div>
              </div>
            </div>
          ))}
          {bookings?.map((booking) => {
            return (
              <Popover key={booking.id}>
                <PopoverTrigger asChild>
                  <div
                    className={`absolute left-16 right-4 ${booking.color} rounded-md flex items-center justify-between text-xs px-2 cursor-pointer`}
                    style={getBookingStyle(booking)}
                  >
                    <span>{booking.name}</span>
                    <span>
                      {booking.startTime} - {booking.endTime}
                    </span>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-40">
                  <div className="flex flex-col space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditBooking(booking)}
                    >
                      <Edit2 className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteBooking(booking.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            );
          })}
          {findOverlappingPeriods().map((period, index) => {
            const startTime = `${Math.floor(period.start / 4)
              .toString()
              .padStart(2, '0')}:${((period.start % 4) * 15)
              .toString()
              .padStart(2, '0')}`;
            const endTime = `${Math.floor((period.end + 1) / 4)
              .toString()
              .padStart(2, '0')}:${(((period.end + 1) % 4) * 15)
              .toString()
              .padStart(2, '0')}`;
            const style = getBookingStyle({ startTime, endTime } as Booking);
            return (
              <div
                key={index}
                className="absolute left-16 right-4 bg-red-500 opacity-50 z-20"
                style={style}
              ></div>
            );
          })}
          {isDragging && (
            <div
              className="absolute left-16 right-4 bg-orange-200 opacity-50 rounded-md flex items-center justify-center"
              style={getDraggableStyle()}
            >
              {editingBooking ? 'Editing' : 'New Booking'}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
