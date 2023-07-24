import express, { Request, Response } from 'express';
import { getTicketsForEvent } from './webScraper'; // Replace './webScraper' with the actual path to your web scraping code

const app = express();

// Your existing routes and other middleware

app.get('/tickets/:eventId', async (req: Request, res: Response) => {
  try {
    const eventId = req.params.eventId;
    const tickets = await getTicketsForEvent(eventId);
    res.json(tickets);
  } catch (error) {
    console.error('Error getting tickets:', error);
    res.status(500).json({ error: 'Failed to fetch tickets for event.' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});

