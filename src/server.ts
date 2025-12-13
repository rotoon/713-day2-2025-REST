import express, { type Request, type Response } from 'express'
import {
  getEventByCategory,
  getAllEvents,
  getEventById,
  addEvent,
} from './services/EventService'

const app = express()
const port = 3000

app.use(express.json())

app.get('/events', async (req: Request, res: Response) => {
  if (req.query.category) {
    const category = req.query.category as string
    const filteredEvents = await getEventByCategory(category)
    res.json(filteredEvents)
  } else if (req.query.title) {
    const title = req.query.title as string
    const events = await getAllEvents()
    const filteredEvents = events.filter((event) =>
      event.title.startsWith(title)
    )
    res.json(filteredEvents)
  } else {
    res.json(await getAllEvents())
  }
})

app.get('/events/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const event = await getEventById(id)
  if (event) {
    res.json(event)
  } else {
    res.status(404).send('Event not found')
  }
})

app.post('/events', async (req: Request, res: Response) => {
  const newEvent = req.body
  const events = await getAllEvents()
  if (newEvent.id) {
    const existingIndex = events.findIndex((event) => event.id === newEvent.id)
    if (existingIndex !== -1) {
      events[existingIndex] = newEvent
      res.json(newEvent)
      return
    }
  }
  addEvent(newEvent)
  res.json(newEvent)
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
