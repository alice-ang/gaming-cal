'use client';
import { TimeRange, UserAvailability } from '@/lib/mock';
import { format, parse } from 'date-fns';
import { Plus, X } from 'lucide-react';
import { FC, useState } from 'react';
import { Button } from './ui/button';

type DayViewProps = {
  date: Date;
  userAvailability: UserAvailability;
  friendsAvailability: UserAvailability[];
  setUserAvailability: (availability: UserAvailability) => void;
};

export const DayView: FC<DayViewProps> = ({
  date,
  userAvailability,
  setUserAvailability,
  friendsAvailability,
}) => {
  const [newTimeRange, setNewTimeRange] = useState<TimeRange>({
    start: '08:00',
    end: '17:00',
  });

  const dateString = format(date, 'yyyy-MM-dd');
  const allUsers = [userAvailability, ...friendsAvailability];

  const handleAddTimeRange = () => {
    const updatedAvailability = { ...userAvailability };
    if (!updatedAvailability.availableDates[dateString]) {
      updatedAvailability.availableDates[dateString] = [];
    }
    updatedAvailability.availableDates[dateString].push(newTimeRange);
    setUserAvailability(updatedAvailability);
    setNewTimeRange({ start: '09:00', end: '17:00' });
  };

  const handleRemoveTimeRange = (index: number) => {
    const updatedAvailability = { ...userAvailability };
    updatedAvailability.availableDates[dateString].splice(index, 1);
    setUserAvailability(updatedAvailability);
  };

  const findOverlappingTimes = () => {
    const allTimeRanges = allUsers.flatMap((user) =>
      (user.availableDates[dateString] || []).map((range) => ({
        start: parse(range.start, 'HH:mm', date),
        end: parse(range.end, 'HH:mm', date),
      }))
    );

    const sortedRanges = allTimeRanges.sort(
      (a, b) => a.start.getTime() - b.start.getTime()
    );
    const overlaps: { start: Date; end: Date }[] = [];

    for (let i = 0; i < sortedRanges.length; i++) {
      const current = sortedRanges[i];
      let overlapStart = current.start;
      let overlapEnd = current.end;

      for (let j = i + 1; j < sortedRanges.length; j++) {
        const next = sortedRanges[j];
        if (next.start <= overlapEnd) {
          overlapEnd = new Date(
            Math.min(overlapEnd.getTime(), next.end.getTime())
          );
          i = j;
        } else {
          break;
        }
      }

      if (overlapStart < overlapEnd) {
        overlaps.push({ start: overlapStart, end: overlapEnd });
      }
    }

    return overlaps;
  };

  const overlappingTimes = findOverlappingTimes();

  return (
    <div>
      <div className="space-y-4">
        {allUsers.map((user) => (
          <div key={user.id} className="border-t pt-2">
            <h4 className="font-semibold">{user.name}</h4>
            {user.availableDates[dateString]?.map((range, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span>
                  {range.start} - {range.end}
                </span>
                {user.id === userAvailability.id && (
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleRemoveTimeRange(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold">Add Your Availability</h4>
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-2 ">
              <input
                type="time"
                value={newTimeRange.start}
                onChange={(e) =>
                  setNewTimeRange({ ...newTimeRange, start: e.target.value })
                }
                className="border rounded p-1"
              />
              <span>-</span>
              <input
                type="time"
                value={newTimeRange.end}
                onChange={(e) =>
                  setNewTimeRange({ ...newTimeRange, end: e.target.value })
                }
                className="border rounded p-1"
              />
            </div>
            <Button onClick={handleAddTimeRange}>
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h4 className="font-semibold">Overlapping Available Times</h4>
        {overlappingTimes.length > 0 ? (
          overlappingTimes.map((range, index) => (
            <div key={index} className="text-green-600">
              {format(range.start, 'HH:mm')} - {format(range.end, 'HH:mm')}
            </div>
          ))
        ) : (
          <p className="text-red-600">No overlapping times found.</p>
        )}
      </div>
    </div>
  );
};
