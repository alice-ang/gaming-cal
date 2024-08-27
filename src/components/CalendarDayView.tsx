'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar } from '@/components/ui/avatar';

type Booking = {
  id: string;
  name: string;
  avatar: string;
  startTime: string;
  endTime: string;
  color: string;
};

const bookings: Booking[] = [
  {
    id: '1',
    name: 'Alice',
    avatar: '/placeholder.svg?height=32&width=32',
    startTime: '16:00',
    endTime: '18:00',
    color: 'bg-yellow-200',
  },
  {
    id: '2',
    name: 'Elin',
    avatar: '/placeholder.svg?height=32&width=32',
    startTime: '17:30',
    endTime: '21:00',
    color: 'bg-green-200',
  },
  {
    id: '3',
    name: 'Frida',
    avatar: '/placeholder.svg?height=32&width=32',
    startTime: '19:00',
    endTime: '22:00',
    color: 'bg-purple-200',
  },
];

export const CalendarDayView = () => {
  const [selectedDate, setSelectedDate] = useState(new Date(2024, 6, 20));
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const timeSlots = Array.from({ length: 18 }, (_, i) => {
    const hour = Math.floor(i / 2) + 15;
    const minute = i % 2 === 0 ? '00' : '30';
    return `${hour.toString().padStart(2, '0')}:${minute}`;
  });

  const handlePrevDay = () => {
    setSelectedDate((prev) => new Date(prev.setDate(prev.getDate() - 1)));
  };

  const handleNextDay = () => {
    setSelectedDate((prev) => new Date(prev.setDate(prev.getDate() + 1)));
  };

  const handleSlotClick = (slot: string) => {
    setSelectedSlot(selectedSlot === slot ? null : slot);
  };

  const isSlotBooked = (slot: string) => {
    return bookings.some(
      (booking) => booking.startTime <= slot && slot < booking.endTime
    );
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="icon" onClick={handlePrevDay}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-semibold">
            {selectedDate.toLocaleDateString('en-US', {
              weekday: 'short',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </h2>
          <Button variant="ghost" size="icon" onClick={handleNextDay}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setSelectedSlot(null)}
        >
          <X className="h-4 w-4 mr-2" />
          Close
        </Button>
      </div>
      <ScrollArea className="h-[400px]">
        <div className="p-4">
          {timeSlots.map((slot) => {
            const isBooked = isSlotBooked(slot);
            const booking = bookings.find((b) => b.startTime === slot);
            return (
              <div key={slot} className="flex items-center mb-2">
                <div className="w-16 text-sm text-gray-500">{slot}</div>
                <div className="flex-1 h-12 relative">
                  {isBooked ? (
                    <div
                      className={`absolute inset-0 ${booking?.color} rounded-md flex items-center px-2`}
                    >
                      <Avatar className="h-8 w-8">
                        <img src={booking?.avatar} alt={booking?.name} />
                      </Avatar>
                      <span className="ml-2 text-sm font-medium">
                        {booking?.name}
                      </span>
                    </div>
                  ) : (
                    <Button
                      variant={selectedSlot === slot ? 'default' : 'outline'}
                      className="w-full h-full"
                      onClick={() => handleSlotClick(slot)}
                    >
                      {selectedSlot === slot ? 'Selected' : 'Available'}
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <Button className="w-full">Add</Button>
      </div>
    </div>
  );
};
