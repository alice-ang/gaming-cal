'use client';
import { useGetCalendars } from '@/lib/data';
import { removeCalendar } from '@/lib/data/actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

export const MyCalendars: FC = () => {
  const queryClient = useQueryClient();
  const { data: calendars } = useGetCalendars();
  const { mutateAsync: deleteCalendarMutation } = useMutation({
    mutationFn: removeCalendar,

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['calendars'] });
    },
  });

  return (
    <ScrollArea className="max-h-screen w-full pr-4">
      {calendars?.map((calendar) => (
        <div
          className="flex items-center justify-between mb-4 gap-4"
          key={calendar.id}
        >
          <Link
            href={{
              pathname: `/calendar/${calendar.id}`,
            }}
            as={`/calendar/${calendar.id}`}
            className="flex items-center flex-1 hover:underline"
          >
            <div
              className="w-4 h-4 rounded-full mr-2"
              style={{ backgroundColor: calendar.color }}
            ></div>
            <span>{calendar.title}</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 mr-4">
              {calendar.id} events
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={async () => {
                await deleteCalendarMutation(calendar.id);
              }}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
      ))}
    </ScrollArea>
  );
};
