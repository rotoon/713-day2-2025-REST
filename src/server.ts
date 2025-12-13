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

app.get('/events', (req, res) => {
  if (req.query.category) {
    const category = req.query.category as string
    const filteredEvents = getEventByCategory(category)
    res.json(filteredEvents)
  } else if (req.query.title) {
    const title = req.query.title as string
    const filteredEvents = getAllEvents().filter((event) =>
      event.title.startsWith(title)
    )
    res.json(filteredEvents)
  } else {
    res.json(getAllEvents())
  }
})

app.get('/events/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const event = getEventById(id)
  if (event) {
    res.json(event)
  } else {
    res.status(404).send('Event not found')
  }
})

app.post('/events', (req, res) => {
  const newEvent = req.body
  if (newEvent.id) {
    const existingIndex = getAllEvents().findIndex(
      (event) => event.id === newEvent.id
    )
    if (existingIndex !== -1) {
      getAllEvents()[existingIndex] = newEvent
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
