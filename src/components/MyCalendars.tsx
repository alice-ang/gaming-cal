'use client';
import { fetchCalendars } from '@/lib/functions';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { useQuery } from '@tanstack/react-query';

export const MyCalendars: FC = () => {
  const {
    data: calendars,
    error,
    isFetched,
  } = useQuery({
    queryKey: ['calendars'],
    queryFn: fetchCalendars,
  });
  return (
    <ScrollArea className="h-[300px] w-full pr-4">
      {calendars?.map((calendar) => (
        <Link
          key={calendar.id}
          className="flex items-center justify-between mb-4"
          href={{
            pathname: `/calendar/${calendar.id}`,
          }}
          as={`/calendar/${calendar.id}`}
        >
          <div className="flex items-center">
            <div
              className="w-4 h-4 rounded-full mr-2"
              style={{ backgroundColor: calendar.color }}
            ></div>
            <span>{calendar.title}</span>
          </div>
          <div className="flex items-center">
            {/* <span className="text-sm text-gray-500 mr-4">
            {calendar.eventCount} events
          </span> */}
            <Button variant="ghost" size="icon">
              <Trash2 size={16} />
            </Button>
          </div>
        </Link>
      ))}
    </ScrollArea>
  );
};
