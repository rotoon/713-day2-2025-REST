import { prisma } from '../lib/prisma'
import type { eventModel as Event } from '../generated/prisma/models/event'

export function getEventByCategory(category: string) {
  return prisma.event.findMany({
    where: { category },
  })
}

export function getAllEvents() {
  return prisma.event.findMany()
}

export function getEventById(id: number) {
  return prisma.event.findUnique({
    where: { id },
  })
}

export function addEvent(newEvent: Event) {
  return prisma.event.create({
    data: {
      category: newEvent.category,
      title: newEvent.title,
      description: newEvent.description,
      location: newEvent.location,
      date: newEvent.date,
      time: newEvent.time,
      petsAllowed: newEvent.petsAllowed,
      organizerId: newEvent.organizerId,
    },
  })
}

export function updateEvent(id: number, updatedEvent: Event) {
  return prisma.event.update({
    where: { id },
    data: updatedEvent,
  })
}

export function getAllEventsWithOrganizer() {
  return prisma.event.findMany({
    select: {
      id: true,
      category: true,
      organizerId: false,
      organizer: {
        select: {
          name: true,
        },
      },
      participants: {
        select: {
          id: true,
          name: true,
          email: true,
          events: true,
        },
      },
    },
  })
}

export function getEventWithOrganizer(id: number) {
  return prisma.event.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      time: true,
      organizerId: true,
    },
  })
}
