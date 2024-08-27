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
import { timeSlots } from '@/lib/mock';

export type TimeSlotProps = React.ComponentProps<typeof Select> & {
  type?: 'start' | 'end';
  startTime?: string;
};

export const TimeSlot: FC<TimeSlotProps> = ({
  type = 'start',
  startTime,
  onValueChange,
}) => {
  const filteredTimeslots = timeSlots.filter((slot) => {
    if (!startTime) {
      return timeSlots;
    }
    return slot.value >= startTime;
  });
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="w-fit">
        <SelectValue placeholder={type === 'start' ? 'Start' : 'End'} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Time slots</SelectLabel>
          {filteredTimeslots.map((slot) => (
            <SelectItem value={slot.value} key={slot.value}>
              {slot.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
