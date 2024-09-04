import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
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
import { ScrollArea } from './ui/scroll-area';
import { mockCalendars, sessionData } from '@/lib/mock';
import { SessionCard } from './SessionCard';

export const CalendarDashboard: FC = async () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>Your Calendars</CardTitle>
          <CardDescription>Manage and create new calendars</CardDescription>
        </CardHeader>
        <CardContent>
          <MyCalendars />
        </CardContent>

        <Separator className="my-4" />
        <CardFooter>
          <CreateCalendarForm />
        </CardFooter>
      </Card>
      <Card>
        <CardHeader className=" max-h-screen ">
          <CardTitle>Upcoming Sessions</CardTitle>
          <CardDescription>
            Your next 5 sessions across all calendars
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="w-full h-[60vh]">
            <div className="space-y-4">
              {sessionData.map((event) => {
                const calendar = mockCalendars.find(
                  (c) => c.id === event.calendarId
                );
                return (
                  <SessionCard
                    key={event.id}
                    color={calendar?.color ?? 'black'}
                    name={calendar?.title ?? 'Calendar name'}
                    {...event}
                  />
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};
