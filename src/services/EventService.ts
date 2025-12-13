import type Event from '../models/Event'

const events: Event[] = [
  {
    id: 1,
    category: 'Music',
    title: 'Concert',
    description: 'A live concert',
    location: 'London',
    date: '2021-07-01',
    time: '19:00',
    petsAllowed: false,
    organizer: 'Live Nation',
  },
  {
    id: 2,
    category: 'Music',
    title: 'Festival',
    description: 'A music festival',
    location: 'Manchester',
    date: '2021-07-15',
    time: '12:00',
    petsAllowed: true,
    organizer: 'Festival Republic',
  },
  {
    id: 3,
    category: 'Theatre',
    title: 'Hamilton',
    description: 'A musical',
    location: 'London',
    date: '2021-08-01',
    time: '19:30',
    petsAllowed: false,
    organizer: 'Cameron Mackintosh',
  },
  {
    id: 4,
    category: 'Sports',
    title: 'Wimbledon',
    description: 'Tennis tournament',
    location: 'London',
    date: '2021-06-28',
    time: '13:00',
    petsAllowed: false,
    organizer: 'AELTC',
  },
  {
    id: 5,
    category: 'Art',
    title: 'Exhibition',
    description: 'Modern art exhibition',
    location: 'Paris',
    date: '2021-09-10',
    time: '10:00',
    petsAllowed: true,
    organizer: 'Louvre',
  },
  {
    id: 6,
    category: 'Technology',
    title: 'Tech Conference',
    description: 'A tech conference',
    location: 'San Francisco',
    date: '2021-10-05',
    time: '09:00',
    petsAllowed: false,
    organizer: 'TechCrunch',
  },
  {
    id: 7,
    category: 'Food',
    title: 'Food Market',
    description: 'Street food market',
    location: 'Bangkok',
    date: '2021-11-12',
    time: '17:00',
    petsAllowed: true,
    organizer: 'Foodies',
  },
]

export function getEventByCategory(category: string): Event[] {
  const filteredEvents = events.filter((event) => event.category === category)
  return filteredEvents
}

export function getAllEvents(): Event[] {
  return events
}

export function getEventById(id: number): Event | undefined {
  return events.find((event) => event.id === id)
}

export function addEvent(newEvent: Event): Event {
  newEvent.id = events.length + 1
  events.push(newEvent)
  return newEvent
}
