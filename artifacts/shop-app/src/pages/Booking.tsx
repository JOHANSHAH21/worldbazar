import { CalendarCheck, Clock, User, Phone, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearch } from "wouter";
import { useBooking } from "@/context/BookingContext";
import { useToast } from "@/hooks/use-toast";
import { barberServices, otherServices } from "@/data/mock";

const allServiceNames = [
  ...barberServices.map((s) => s.name),
  ...otherServices.map((s) => s.name),
];

const timeSlots = [
  "Morning 9-11 AM",
  "Afternoon 12-2 PM",
  "Evening 4-6 PM",
  "Night 7-9 PM",
];

export default function Booking() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const preService = params.get("service") || "";

  const { bookings, addBooking } = useBooking();
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: preService,
    date: "",
    timeSlot: "",
  });

  useEffect(() => {
    if (preService) {
      setForm((f) => ({ ...f, service: preService }));
    }
  }, [preService]);

  const handleChange = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.service || !form.date || !form.timeSlot) {
      toast({ title: "Error", description: "सभी fields भरना जरूरी है!", variant: "destructive" });
      return;
    }
    if (form.phone.length < 10) {
      toast({ title: "Error", description: "सही phone number डालें (10 digits)", variant: "destructive" });
      return;
    }
    addBooking(form);
    setForm({ name: "", phone: "", service: "", date: "", timeSlot: "" });
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="pb-2">
      <div className="bg-gradient-to-br from-purple-500 to-violet-400 text-white px-5 pt-12 pb-8 rounded-b-[2.5rem]">
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 bg-white/20 rounded-xl">
            <CalendarCheck size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Booking</h1>
            <p className="text-sm opacity-80">Service बुक करें</p>
          </div>
        </div>
      </div>

      <div className="px-4 mt-6 space-y-5">
        {/* Booking Form */}
        <div className="bg-card rounded-3xl border border-card-border shadow-sm p-5">
          <h2 className="text-base font-bold mb-4">नई Booking</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block flex items-center gap-1">
                <User size={12} />
                आपका नाम *
              </label>
              <input
                data-testid="booking-name"
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block flex items-center gap-1">
                <Phone size={12} />
                Phone Number *
              </label>
              <input
                data-testid="booking-phone"
                type="tel"
                placeholder="10-digit mobile number"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
            </div>

            {/* Service */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Service *</label>
              <div className="relative">
                <select
                  data-testid="booking-service"
                  value={form.service}
                  onChange={(e) => handleChange("service", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none transition-all"
                >
                  <option value="">Select Service</option>
                  {allServiceNames.map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block flex items-center gap-1">
                <CalendarCheck size={12} />
                Date *
              </label>
              <input
                data-testid="booking-date"
                type="date"
                min={today}
                value={form.date}
                onChange={(e) => handleChange("date", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
            </div>

            {/* Time Slot */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block flex items-center gap-1">
                <Clock size={12} />
                Time Slot *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    data-testid={`timeslot-${slot.replace(/\s/g, "-")}`}
                    onClick={() => handleChange("timeSlot", slot)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      form.timeSlot === slot
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-input hover:border-primary/50"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              data-testid="booking-submit"
              className="w-full h-12 bg-primary text-primary-foreground rounded-2xl font-bold text-base hover:bg-primary/90 transition-all active:scale-98"
            >
              Booking Confirm करें
            </button>
          </form>
        </div>

        {/* Booking History */}
        {bookings.length > 0 && (
          <div>
            <h2 className="text-base font-bold mb-3">पिछली Bookings ({bookings.length})</h2>
            <div className="space-y-3">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  data-testid={`booking-item-${booking.id}`}
                  className="bg-card rounded-2xl border border-card-border shadow-xs p-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-bold text-sm">{booking.name}</p>
                      <p className="text-xs text-muted-foreground">{booking.phone}</p>
                    </div>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-lg font-semibold">
                      Confirmed
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs">
                    <span className="bg-muted px-2 py-1 rounded-lg font-medium">{booking.service}</span>
                    <span className="bg-muted px-2 py-1 rounded-lg">{booking.date}</span>
                    <span className="bg-muted px-2 py-1 rounded-lg">{booking.timeSlot}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
