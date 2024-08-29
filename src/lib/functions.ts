"use server"

import { PrismaClient } from '@prisma/client'
import { Database ,Tables, Enums } from '../../database.types'

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
    const calendars = await prisma.calendar.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    console.log('Fetched calendars:', calendars);
    return calendars ?? [];
  } catch (error) {
    console.error('Error fetching calendars:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

