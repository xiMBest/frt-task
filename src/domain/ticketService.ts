import { TicketData } from '../application/ticketController';
import axios from 'axios';

export interface Ticket { // Export the 'Ticket' interface
  section: string;
  row: string;
  seatNumber: string;
  price: number;
}

const TICKET_API_URL = 'https://my.laphil.com/api/events'; // Replace with the actual API URL

export class TicketService {
  async fetchTicketsForEvent(eventId: number): Promise<TicketData[]> {
    try {
      const response = await axios.get(`${TICKET_API_URL}/${eventId}/tickets`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tickets for event:', error);
      throw new Error('Failed to fetch tickets for event.');
    }
  }
}
