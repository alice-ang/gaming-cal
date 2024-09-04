import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Session } from '@/lib/mock';
import { CalendarIcon, ClockIcon, MapPinIcon } from 'lucide-react';
import { FC } from 'react';

export const SessionCard: FC<Session> = ({ color, title, name }) => {
  return (
    <Card className="w-full shadow">
      <CardHeader className="flex flex-col lg:flex-row items-center gap-4">
        <div className=" rounded-full p-2" style={{ backgroundColor: color }}>
          <CalendarIcon className="text-foreground" size={16} />
        </div>
        <div>
          <CardDescription>{name}</CardDescription>
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="grid gap-2">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4 opacity-70" />
          <span className="text-sm">September 15, 2023</span>
        </div>
        <div className="flex items-center gap-2">
          <ClockIcon className="h-4 w-4 opacity-70" />
          <span className="text-sm">9:00 AM - 5:00 PM</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPinIcon className="h-4 w-4 opacity-70" />
          <span className="text-sm">Convention Center, Tech City</span>
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};
