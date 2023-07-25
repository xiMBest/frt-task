import axios from 'axios';

enum SeatAvailability {
  Available = 0,
}

interface Section {
  Id: number;
  Description: string;
}

interface Price {
  Id: number;
  Price: number;
}

interface Seat {
  Id: number;
  SectionId: number;
  Row: string;
  Number: string;
  Availability: SeatAvailability;
}

export class TicketService {
  private TICKET_API_URL = 'https://my.laphil.com/en/rest-proxy/TXN/Packages/1195/';
  private TICKET_SECTIONS_API_URL = 'https://my.laphil.com/en/rest-proxy/ReferenceData/'

  async fetchSeats(eventId: number): Promise<Seat[]> {
    const response = await axios.get(`${this.TICKET_API_URL}/Seats?constituentId=0&modeOfSaleId=26&packageId=1195`);
    return response.data;
  }

  async fetchSections(eventId: number): Promise<Section[]> {
    const response = await axios.get(`${this.TICKET_SECTIONS_API_URL}/Sections?seatMapId=12`);
    return response.data;
  }

  async fetchPrices(eventId: number): Promise<Price[]> {
    const response = await axios.get(`${this.TICKET_API_URL}/Prices?expandPerformancePriceType=&includeOnlyBasePrice=&modeOfSaleId=26&priceTypeId=&sourceId=30885`);
    return response.data;
  }

  async fetchTicketsForEvent(eventId: number): Promise<any[]> {
    try {
      const [seats, sections, prices] = await Promise.all([
        this.fetchSeats(eventId),
        this.fetchSections(eventId),
        this.fetchPrices(eventId),
      ]);

      const availableSeats = seats.filter((seat) => seat.Availability === SeatAvailability.Available);

      const tickets = availableSeats.map((seat) => {
        const section = sections.find((s) => s.Id === seat.SectionId);
        const price = prices.find((p) => p.Id === section?.Id);

        return {
          Section: section?.Description || '',
          Row: seat.Row,
          SeatNumber: seat.Number,
          Price: price?.Price || 0,
        };
      });

      return tickets;
    } catch (error) {
      throw new Error('Failed to fetch tickets for event.');
    }
  }
}