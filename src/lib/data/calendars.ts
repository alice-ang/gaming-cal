import { useQuery } from "@tanstack/react-query"
import { fetchCalendars, getCalendarById } from "./actions"


export function useGetCalendars ()  {
    return useQuery({
        queryKey: ["calendars"], 
        queryFn: async () =>  fetchCalendars(), 
    })
}

export function useGetCalendarById (id: string)  {
    return useQuery({
        queryKey: ["calendarbyId", id],
        queryFn: async () => getCalendarById(id),
    }  )
}

