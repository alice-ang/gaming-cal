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

export type Session = {
  name: string;
  id: string;
  title: string;
  date: string;
  calendarId: string;
  color: string;
}

export type Booking = {
  id: string;
  name: string;
  avatar: string;
  startTime: string;
  endTime: string;
  color: string;
};




export const sessionData =[
  {
    id: '1',
    title: 'Team Meeting',
    date: '2023-06-15',
    calendarId: '1',
  },
  {
    id: '2',
    title: 'Dentist Appointment',
    date: '2023-06-16',
    calendarId: '2',
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
    calendarId: '4',
  },
  {
    id: '5',
    title: 'Gym Session',
    date: '2023-06-19',
    calendarId: '5',
  },
  {
    id: '6',
    title: 'Gym Session',
    date: '2023-06-19',
    calendarId: '5',
  },
  {
    id: '7',
    title: 'Gym Session',
    date: '2023-06-19',
    calendarId: '5',
  },
]

 export  const mockCalendars = [
    { id: '1', title: 'Arbete', color: '#FF5733', events: 5 },
    { id: '2', title: 'Personligt', color: '#33FF57', events: 3 },
    { id: '3', title: 'Träning', color: '#3357FF', events: 2 },
    { id: '4', title: 'Studier', color: '#FF33F1', events: 4 },
    { id: '5', title: 'Familj', color: '#33FFF1', events: 6 },
  ];


  export type TimeRange = {
    start: string
    end: string
  }
  
  export type UserAvailability = {
    id: number
    name: string
    availableDates: { [date: string]: TimeRange[] }
  }
  
  export const initialFriendsAvailability: UserAvailability[] = [
    {
      id: 1,
      name: "Alice",
      availableDates: {
        "2024-09-02": [{ start: "09:00", end: "12:00" }, { start: "14:00", end: "18:00" }],
        "2024-09-15": [{ start: "10:00", end: "19:00" }],
        "2024-09-16": [{ start: "13:00", end: "17:00" }],
        "2024-10-18": [{ start: "09:00", end: "17:00" }],
      },
    },
    {
      id: 2,
      name: "Bob",
      availableDates: {
        "2024-09-02": [{ start: "11:00", end: "15:00" }, { start: "18:00", end: "22:00" }],
        "2024-09-16": [{ start: "13:00", end: "17:00" }],
        "2024-09-17": [{ start: "14:00", end: "18:00" }],
        "2024-10-18": [{ start: "10:00", end: "16:00" }],
      },
    },
    {
      id: 3,
      name: "Charlie",
      availableDates: {
        "2024-09-02": [{ start: "13:00", end: "19:00" }],
        "2024-09-16": [{ start: "13:00", end: "17:00" }],
        "2024-09-18": [{ start: "09:00", end: "15:00" }],
        "2024-10-18": [{ start: "14:00", end: "20:00" }],
      },
    },
  ]
