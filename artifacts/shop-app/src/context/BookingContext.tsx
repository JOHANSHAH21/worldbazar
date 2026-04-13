import React, { createContext, useContext, useState, ReactNode } from "react";
import { Service } from "@/data/mock";
import { useToast } from "@/hooks/use-toast";

export interface Booking {
  id: string;
  name: string;
  phone: string;
  service: string;
  date: string;
  timeSlot: string;
  createdAt: number;
}

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, "id" | "createdAt">) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { toast } = useToast();

  const addBooking = (bookingData: Omit<Booking, "id" | "createdAt">) => {
    const newBooking: Booking = {
      ...bookingData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now(),
    };
    setBookings((prev) => [newBooking, ...prev]);
    toast({
      title: "Booking Confirmed!",
      description: `Your ${bookingData.service} has been booked for ${bookingData.date} (${bookingData.timeSlot}).`,
    });
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
