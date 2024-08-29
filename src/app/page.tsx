'use client';
import { CreateCalendarForm } from '@/components';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Calendar, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

type CalendarItem = {
  id: string;
  name: string;
  color: string;
  eventCount: number;
};

type Event = {
  id: string;
  title: string;
  date: string;
  calendarId: string;
};

export default function Home() {
  const [calendars, setCalendars] = useState<CalendarItem[]>([
    { id: '1', name: 'Personal', color: '#3b82f6', eventCount: 3 },
    { id: '2', name: 'Work', color: '#ef4444', eventCount: 5 },
    { id: '3', name: 'Family', color: '#22c55e', eventCount: 2 },
  ]);

  const [events, setEvents] = useState<Event[]>([
    { id: '1', title: 'Team Meeting', date: '2023-06-15', calendarId: '2' },
    {
      id: '2',
      title: 'Dentist Appointment',
      date: '2023-06-16',
      calendarId: '1',
    },
    { id: '3', title: 'Family Dinner', date: '2023-06-17', calendarId: '3' },
    { id: '4', title: 'Project Deadline', date: '2023-06-18', calendarId: '2' },
    { id: '5', title: 'Gym Session', date: '2023-06-19', calendarId: '1' },
  ]);

  const [newCalendarName, setNewCalendarName] = useState('');

  const addCalendar = () => {
    if (newCalendarName.trim() !== '') {
      const newCalendar: CalendarItem = {
        id: (calendars.length + 1).toString(),
        name: newCalendarName,
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        eventCount: 0,
      };
      setCalendars([...calendars, newCalendar]);
      setNewCalendarName('');
    }
  };

  const removeCalendar = (id: string) => {
    setCalendars(calendars.filter((calendar) => calendar.id !== id));
    setEvents(events.filter((event) => event.calendarId !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Calendar Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Your Calendars</CardTitle>
            <CardDescription>Manage and create new calendars</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] w-full pr-4">
              {calendars.map((calendar) => (
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
                    <span>{calendar.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-4">
                      {calendar.eventCount} events
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeCalendar(calendar.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </Link>
              ))}
            </ScrollArea>
          </CardContent>
          <Separator className="my-4" />
          <CardFooter>
            <CreateCalendarForm />
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>
              Your next 5 events across all calendars
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] w-full pr-4">
              {events.map((event) => {
                const calendar = calendars.find(
                  (c) => c.id === event.calendarId
                );
                return (
                  <div key={event.id} className="flex items-center mb-4">
                    <Calendar
                      className="mr-2 h-4 w-4"
                      style={{ color: calendar?.color }}
                    />
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-gray-500">{event.date}</p>
                    </div>
                  </div>
                );
              })}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
