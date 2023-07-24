import { buildSchema } from 'graphql';

const typeDefs = `
  type Ticket {
    section: String
    row: String
    seatNumber: String
    price: Float
  }

  type Query {
    getTicketsForEvent(eventId: Int!): [Ticket]
  }
`;

const resolvers = {
  Query: {
    getTicketsForEvent: async (_: any, { eventId }: any, { ticketController }: any) => {
      return ticketController.getTicketsForEvent(eventId);
    },
  },
};

export const schema = buildSchema(typeDefs);
export default resolvers;
