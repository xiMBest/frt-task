import { TicketService } from '../domain/ticketService';
import { Ticket } from '../domain/ticketService';

export interface TicketData {
  section: string;
  row: string;
  seatNumber: string;
  price: number;
}

export class TicketController {
  private ticketService: TicketService;

  constructor(ticketService: TicketService) {
    this.ticketService = ticketService;
  }

  async getTicketsForEvent(eventId: number): Promise<TicketData[]> {
    try {
      const tickets: Ticket[] = await this.ticketService.fetchTicketsForEvent(eventId);

      // Convert 'Ticket' to 'TicketData' before returning
      return tickets.map((ticket: Ticket) => ({
        section: ticket.section,
        row: ticket.row,
        seatNumber: ticket.seatNumber,
        price: ticket.price,
      }));
    } catch (error) {
      console.error('Error getting tickets for event:', error);
      throw new Error('Failed to get tickets for event.');
    }
  }
}
