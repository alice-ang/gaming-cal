'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { FC, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useCalendarStore } from '@/lib/store/calendarStore';
import { CalendarColor } from '@/lib/mock';

const colorOptions = [
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'purple', label: 'Purple' },
  { value: 'orange', label: 'Orange' },
  { value: 'pink', label: 'Pink' },
  { value: 'teal', label: 'Teal' },
];

export const CreateCalendarForm: FC = () => {
  const addCalendar = useCalendarStore((state) => state.addCalendar);

  const zodSchema = z.object({
    title: z.string().min(3, {
      message: 'Calendar name must be at least 2 characters.',
    }),
    color: z.nativeEnum(CalendarColor, {
      required_error: 'Please select a color.',
    }),
  });

  const form = useForm<z.infer<typeof zodSchema>>({
    resolver: zodResolver(zodSchema),
    defaultValues: {
      title: '',
      color: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof zodSchema>) {
    addCalendar(values)
      .then(() => {
        form.reset();
      })
      .catch((error) => {
        console.error('Failed to insert calendar:', error);
      });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-12 gap-4 w-full"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="col-span-10">
              <FormControl>
                <Input placeholder="New calendar name" required {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a color" />
                  </SelectTrigger>
                  <SelectContent>
                    {colorOptions.map((color) => (
                      <SelectItem key={color.value} value={color.value}>
                        <div className="flex items-center">
                          <div
                            className="w-4 h-4 rounded-full mr-2"
                            style={{ backgroundColor: color.value }}
                          />
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="col-span-12">
          <Plus className="mr-2" size={16} /> Add Calendar
        </Button>
      </form>
    </Form>
  );
};
