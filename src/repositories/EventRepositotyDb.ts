import * as db from '../db'
import type Event from '../models/Event'

export async function getEventByCategory(category: string): Promise<Event[]> {
  const result = await db.query(
    'SELECT id, category, title, description, location, date, time, pets_allowed as "petsAllowed", organizer FROM events WHERE category = $1',
    [category]
  )
  return result.rows as Event[]
}

export async function getAllEvents(): Promise<Event[]> {
  const result = await db.query(
    'SELECT id, category, title, description, location, date, time, pets_allowed as "petsAllowed", organizer FROM events'
  )
  return result.rows as Event[]
}

export async function getEventById(id: number): Promise<Event | undefined> {
  const result = await db.query(
    'SELECT id, category, title, description, location, date, time, pets_allowed as "petsAllowed", organizer FROM events WHERE id = $1',
    [id]
  )
  const events = result.rows as Event[]
  return events.length > 0 ? events[0] : undefined
}

export async function addEvent(newEvent: Event): Promise<Event> {
  const {
    category,
    title,
    description,
    location,
    date,
    time,
    petsAllowed,
    organizer,
  } = newEvent
  const result = await db.query(
    'INSERT INTO events (category, title, description, location, date, time, pets_allowed, organizer) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, category, title, description, location, date, time, pets_allowed as "petsAllowed", organizer',
    [category, title, description, location, date, time, petsAllowed, organizer]
  )
  return result.rows[0] as Event
}

export async function updateEvent(
  id: number,
  updatedEvent: Event
): Promise<Event> {
  const {
    category,
    title,
    description,
    location,
    date,
    time,
    petsAllowed,
    organizer,
  } = updatedEvent
  const result = await db.query(
    'UPDATE events SET category = $1, title = $2, description = $3, location = $4, date = $5, time = $6, pets_allowed = $7, organizer = $8 WHERE id = $9 RETURNING id, category, title, description, location, date, time, pets_allowed as "petsAllowed", organizer',
    [
      category,
      title,
      description,
      location,
      date,
      time,
      petsAllowed,
      organizer,
      id,
    ]
  )
  return result.rows[0] as Event
}
