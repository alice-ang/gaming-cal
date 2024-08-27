import React, { FC } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const timeSlots = [
  { title: '00:00', value: '00:00' },
  { title: '01:00', value: '01:00' },
  { title: '02:00', value: '02:00' },
  { title: '03:00', value: '03:00' },
  { title: '04:00', value: '04:00' },
  { title: '05:00', value: '05:00' },
  { title: '06:00', value: '06:00' },
  { title: '07:00', value: '07:00' },
  { title: '08:00', value: '08:00' },
  { title: '09:00', value: '09:00' },
  { title: '10:00', value: '10:00' },
  { title: '11:00', value: '11:00' },
  { title: '12:00', value: '12:00' },
  { title: '13:00', value: '13:00' },
  { title: '14:00', value: '14:00' },
  { title: '15:00', value: '15:00' },
  { title: '16:00', value: '16:00' },
  { title: '17:00', value: '17:00' },
  { title: '18:00', value: '18:00' },
  { title: '19:00', value: '19:00' },
  { title: '20:00', value: '20:00' },
  { title: '21:00', value: '21:00' },
  { title: '22:00', value: '22:00' },
  { title: '23:00', value: '23:00' },
];
export type TimeSlotProps = React.ComponentProps<typeof Select> & {
  type?: 'start' | 'end';
};

export const TimeSlot: FC<TimeSlotProps> = ({
  type = 'start',
  onValueChange,
}) => {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="w-fit">
        <SelectValue placeholder={type === 'start' ? 'Start' : 'End'} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Time slots</SelectLabel>
          {timeSlots.map((slot) => (
            <SelectItem value={slot.value} key={slot.value}>
              {slot.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
