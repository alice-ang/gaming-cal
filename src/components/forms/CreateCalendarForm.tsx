'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { FC } from 'react';
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
import { useForm } from 'react-hook-form';
import { ColorPicker } from '../ColorPicker';
import { createCalendar } from '@/lib/functions';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Calendar name must be at least 2 characters.',
  }),
  color: z.string(),
});
export const CreateCalendarForm: FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      color: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const newCalendar = await createCalendar({
        title: values.name,
        color: values.color,
      });
      console.log('New calendar created:', newCalendar);
      // Här kan du lägga till logik för att uppdatera UI eller hantera framgångsrikt skapande
    } catch (error) {
      console.error('Error creating calendar:', error);
      // Här kan du lägga till felhantering, t.ex. visa ett felmeddelande för användaren
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-12 gap-4 w-full"
      >
        <FormField
          control={form.control}
          name="name"
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
                <ColorPicker
                  {...field}
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    form.setValue('color', value);
                  }}
                />
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
