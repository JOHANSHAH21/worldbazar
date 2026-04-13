import { Wrench } from "lucide-react";
import { otherServices } from "@/data/mock";
import ServiceCard from "@/components/ServiceCard";

export default function Other() {
  return (
    <div className="pb-2">
      <div className="bg-gradient-to-br from-teal-500 to-cyan-400 text-white px-5 pt-12 pb-8 rounded-b-[2.5rem]">
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 bg-white/20 rounded-xl">
            <Wrench size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">अन्य सेवाएं</h1>
            <p className="text-sm opacity-80">Other Local Services</p>
          </div>
        </div>
        <p className="text-sm opacity-80 mt-2">घर की सभी ज़रूरतें</p>
      </div>

      <div className="px-4 mt-6 space-y-3">
        {otherServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}
