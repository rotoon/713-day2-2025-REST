import type { eventModel as Event } from '../generated/prisma/models/event'
import * as repo from '../repositories/EventRepositoryPrisma'

export function getEventByCategory(category: string) {
  return repo.getEventByCategory(category)
}

export function getAllEvents() {
  return repo.getAllEventsWithOrganizer()
}

export function getEventById(id: number) {
  return repo.getEventWithOrganizer(id)
}

export function addEvent(newEvent: Event) {
  return repo.addEvent(newEvent)
}

export function updateEvent(id: number, updatedEvent: Event) {
  return repo.updateEvent(id, updatedEvent)
}
