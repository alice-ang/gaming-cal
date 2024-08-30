'use client';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

export const MyCalendars: FC = () => {
  const mockCalendars = [
    { id: '1', title: 'Arbete', color: '#FF5733', events: 5 },
    { id: '2', title: 'Personligt', color: '#33FF57', events: 3 },
    { id: '3', title: 'Träning', color: '#3357FF', events: 2 },
    { id: '4', title: 'Studier', color: '#FF33F1', events: 4 },
    { id: '5', title: 'Familj', color: '#33FFF1', events: 6 },
  ];

  return (
    <ScrollArea className="max-h-screen w-full pr-4">
      {mockCalendars?.map((calendar) => (
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
            <Button variant="ghost" size="icon">
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
      ))}
    </ScrollArea>
  );
};
