import { create } from 'zustand';
import { Calendar } from '../mock';
import { createClient, supabase } from '@/lib/supabase/client';


type CalendarStore =  {
  calendars: any[];
  isLoading: boolean;
  error: string | null;
  fetchCalendars: () => Promise<void>;
  addCalendar: (calendar: Omit<Calendar, 'id'>) => Promise<void>;
    deleteCalendar: (id: string) => Promise<void>;

}


export const useCalendarStore = create<CalendarStore>((set) => ({
  calendars: [],
  isLoading: false,
  error: null,
  fetchCalendars: async () => {
    set({ isLoading: true });
    try {
  const { data, error } = await supabase
    .from('calendars')
    .select('');
      if (!data) {
        throw new Error('Failed to fetch calendars');
      }
      
      set({ calendars: data, isLoading: false, error: error });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  addCalendar: async ({title, color}) => {
    try {
   const { data: addedCalendar, error } = await supabase
    .from('calendars')
    .insert([
      {  title, color }
    ])
    .select('');
      set((state) => ({ 
        calendars: [...state.calendars, addedCalendar],
        error: null 
      }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  deleteCalendar: async (id: string) => {
    set({ isLoading: true });
    try {
      const { error } = await supabase
        .from('calendars')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error('Failed to delete calendar');
      }

      set((state) => ({
        calendars: state.calendars.filter(calendar => calendar.id !== id),
        isLoading: false,
        error: null
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
}));