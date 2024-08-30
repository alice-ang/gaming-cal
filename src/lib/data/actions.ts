"use server"

import { PrismaClient } from '@prisma/client'
import { Tables } from '../../../database.types'

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
  } 
}





export const fetchCalendars = async () => {
    try {
        const calendars  = await prisma.calendar.findMany({
      orderBy: {
        createdAt: 'desc'
      }
      })
      return calendars

    } catch (error) {
      throw error
    }
  }

export const removeCalendar = async (calendarId: string) => {
  try {
    const deletedCalendar = await prisma.calendar.delete({
      where: {
        id: calendarId,
      },
    });
    return deletedCalendar;
  } catch (error) {
    throw error;
  } 
};

export const getCalendarById = async (calendarId: string) => {
  try {
    const calendar = await prisma.calendar.findUnique({
      where: {
        id: calendarId,
      },
    });
    
    if (!calendar) {
      throw new Error('Calendar not found');
    }

    return calendar;
  } catch (error) {
    throw error;
  } 
};

