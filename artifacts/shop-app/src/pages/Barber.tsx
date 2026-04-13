import { Scissors } from "lucide-react";
import { barberServices } from "@/data/mock";
import ServiceCard from "@/components/ServiceCard";

export default function Barber() {
  return (
    <div className="pb-2">
      <div className="bg-gradient-to-br from-orange-500 to-amber-400 text-white px-5 pt-12 pb-8 rounded-b-[2.5rem]">
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 bg-white/20 rounded-xl">
            <Scissors size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">नाई की दुकान</h1>
            <p className="text-sm opacity-80">Barber Services</p>
          </div>
        </div>
        <p className="text-sm opacity-80 mt-2">सभी services में expert barbers</p>
      </div>

      <div className="px-4 mt-6 space-y-3">
        {barberServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}
