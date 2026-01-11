import type { House } from '~/types';

export interface Booking {
  id: string;
  house: House;
  dates: {
    start: Date;
    end: Date;
  };
  guests: number;
}

export const useBookings = () => {
  const booking = useState<Booking | null>('current-booking', () => null);

  const setBooking = (house: House) => {
    // Fake dates: next week
    const start = new Date();
    start.setDate(start.getDate() + 7);
    const end = new Date(start);
    end.setDate(end.getDate() + 5);

    booking.value = {
      id: Math.random().toString(36).substring(7),
      house,
      dates: {
        start,
        end,
      },
      guests: 1,
    };
  };

  return {
    booking,
    setBooking,
  };
};
