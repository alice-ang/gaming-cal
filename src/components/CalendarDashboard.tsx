import { fetchCalendars } from '@/lib/functions';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { FC } from 'react';
import { CreateCalendarForm } from './forms';
import { MyCalendars } from './MyCalendars';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Separator } from './ui/separator';
import { queryClient } from '@/lib/utils';

export const CalendarDashboard: FC = async () => {
  await queryClient.prefetchQuery({
    queryKey: ['calendars'],
    queryFn: fetchCalendars,
  });
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>Your Calendars</CardTitle>
          <CardDescription>Manage and create new calendars</CardDescription>
        </CardHeader>
        <CardContent>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <MyCalendars />
          </HydrationBoundary>
        </CardContent>
        <Separator className="my-4" />
        <CardFooter>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <CreateCalendarForm />
          </HydrationBoundary>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>
            Your next 5 events across all calendars
          </CardDescription>
        </CardHeader>
        {/* <CardContent>
        <ScrollArea className="h-[300px] w-full pr-4">
          {[
            {
              id: '1',
              title: 'Team Meeting',
              date: '2023-06-15',
              calendarId: '2',
            },
            {
              id: '2',
              title: 'Dentist Appointment',
              date: '2023-06-16',
              calendarId: '1',
            },
            {
              id: '3',
              title: 'Family Dinner',
              date: '2023-06-17',
              calendarId: '3',
            },
            {
              id: '4',
              title: 'Project Deadline',
              date: '2023-06-18',
              calendarId: '2',
            },
            {
              id: '5',
              title: 'Gym Session',
              date: '2023-06-19',
              calendarId: '1',
            },
          ].map((event) => {
            const calendar = calendars.find(
              (c) => c.id === Number(event.calendarId)
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
      </CardContent> */}
      </Card>
    </div>
  );
};
