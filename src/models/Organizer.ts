import type Event from './Event'

export interface Organizer {
  id: number
  name: string
  events: Event[]
}
