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
    return newCal
  } catch (error) {
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
    return deletedCalendar;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};