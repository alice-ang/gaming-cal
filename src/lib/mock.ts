export const timeSlots = Array.from({ length: 24 }, (_, i) => {
  const date = new Date();
  date.setHours(i, 0, 0, 0);
  return {
    title: date.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' }),
    value: date.getHours().toString().padStart(2, '0'),
  };
});


export const user = {
  name: "Alice",
  username: "brallis_",
  avatar: "",
  color: "yellow",
  availableDates: [
    {
      isoDate: new Date().toISOString() ,
      timeslots: []  
      }
  ]
}


export type Booking = {
  id: string;
  name: string;
  avatar: string;
  startTime: string;
  endTime: string;
  color: string;
};

export const bookings: Booking[] = [
  {
    id: '1',
    name: 'Alice',
    avatar: 'https://github.com/shadcn.png',
    startTime: '16:00',
    endTime: '18:00',
    color: 'bg-yellow-200',
  },
  {
    id: '2',
    name: 'Elin',
    avatar: 'https://github.com/shadcn.png',
    startTime: '17:30',
    endTime: '21:00',
    color: 'bg-green-200',
  },
  {
    id: '3',
    name: 'Frida',
    avatar: 'https://github.com/shadcn.png',
    startTime: '19:00',
    endTime: '22:00',
    color: 'bg-purple-200',
  },
];