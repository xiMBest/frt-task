import { TicketService, Ticket } from '../domain/ticketService';
import { TicketController } from './ticketController';

describe('TicketController', () => {
  const mockTickets: Ticket[] = [
    { section: 'A', row: '1', seatNumber: '101', price: 50 },
    { section: 'B', row: '2', seatNumber: '202', price: 40 },
    { section: 'C', row: '3', seatNumber: '303', price: 30 },
  ];

  const mockTicketService: TicketService = {
    fetchTicketsForEvent: jest.fn().mockResolvedValue(mockTickets),
  } as any;

  const ticketController = new TicketController(mockTicketService);

  it('should fetch tickets for a valid event ID', async () => {
    const eventId = 123;

    const tickets = await ticketController.getTicketsForEvent(eventId);

    expect(mockTicketService.fetchTicketsForEvent).toHaveBeenCalledWith(eventId);
    expect(tickets).toEqual(mockTickets);
  });

  it('should throw an error for an invalid event ID', async () => {
    const eventId = 'invalid';

    await expect(ticketController.getTicketsForEvent(eventId)).rejects.toThrow('Invalid event ID.');
    expect(mockTicketService.fetchTicketsForEvent).not.toHaveBeenCalled();
  });
});
