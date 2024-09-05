'use client';
import { Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { FC, useEffect } from 'react';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { useCalendarStore } from '@/lib/store/calendarStore';

export const MyCalendars: FC = () => {
  const { calendars, isLoading, error, fetchCalendars, deleteCalendar } =
    useCalendarStore();

  useEffect(() => {
    fetchCalendars();
  }, [fetchCalendars]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occured: {error}</div>;

  return (
    <ScrollArea className="max-h-screen w-full pr-4">
      {calendars.map((calendar) => (
        <div
          className="flex items-center justify-between mb-4 gap-4"
          key={calendar.id}
        >
          <Link
            href={{
              pathname: `/calendar/${calendar.id}`,
            }}
            as={`/calendar/${calendar.id}`}
            className="flex items-center flex-1 hover:underline gap-4"
          >
            <div
              className="w-4 h-4 rounded-full mr-2"
              style={{ backgroundColor: calendar.color }}
            ></div>
            <div>
              <p>{calendar.title}</p>
              <p className="text-sm text-gray-500 ">{calendar.id} sessions</p>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Edit size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-red-100 hover:text-red-500"
              onClick={() => deleteCalendar(calendar.id)}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
      ))}
    </ScrollArea>
  );
};
