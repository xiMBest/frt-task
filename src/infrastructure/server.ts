import express, { Express, Request, Response } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { TicketController } from '../application/ticketController';
import { TicketService } from '../domain/ticketService';
import { schema } from '../application/graphqlSchema';

const app: Express = express();
const port = 3000; // Replace with your desired port number

app.get('/tickets/:eventId', async (req: Request, res: Response) => {
  const eventId: number = parseInt(req.params.eventId, 10);
  if (isNaN(eventId)) {
    res.status(400).json({ error: 'Invalid event ID.' });
    return;
  }

  const ticketService = new TicketService();
  const ticketController = new TicketController(ticketService);
  const tickets = await ticketController.getTicketsForEvent(eventId);
  res.json(tickets);
});


app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

