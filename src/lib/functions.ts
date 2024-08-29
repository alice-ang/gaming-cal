"use server"

import { PrismaClient } from '@prisma/client'
import { Tables } from '../../database.types'

const prisma = new PrismaClient()

export const  createCalendar = async(calendar: Pick<Tables<'Calendar'>, "title" | "color">) => {
  try {
    const newCal = await prisma.calendar.create({
      data: {
      ...calendar
      },
    })
    console.log('Created new calendar:', newCal)
    return newCal
  } catch (error) {
    console.error('Error creating calendar:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}





export const fetchCalendars = async () => {
    try {
        const calendars  = await prisma.calendar.findMany({
        orderBy: {
            createdAt: 'desc'
          }
      })

      return calendars;
    } catch (error) {
      console.error('Error fetching todos:', error)
      throw error
    }
  }

export const removeCalendar = async (calendarId: number) => {
  try {
    const deletedCalendar = await prisma.calendar.delete({
      where: {
        id: calendarId,
      },
    });
    console.log('Borttagen kalender:', deletedCalendar);
    return deletedCalendar;
  } catch (error) {
    console.error('Fel vid borttagning av kalender:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};