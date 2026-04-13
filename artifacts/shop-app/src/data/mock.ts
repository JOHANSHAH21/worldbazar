export type Product = {
  id: string;
  name: string;
  nameHindi: string;
  price: number;
  unit: string;
  category: "sabji" | "grocery";
};

export type Service = {
  id: string;
  name: string;
  nameHindi: string;
  price: number | string;
  duration?: string;
  description?: string;
  category: "barber" | "other";
};

export const sabjiProducts: Product[] = [
  { id: "s1", name: "Tamatar (Tomato)", nameHindi: "टमाटर", price: 30, unit: "kg", category: "sabji" },
  { id: "s2", name: "Aloo (Potato)", nameHindi: "आलू", price: 25, unit: "kg", category: "sabji" },
  { id: "s3", name: "Pyaz (Onion)", nameHindi: "प्याज़", price: 20, unit: "kg", category: "sabji" },
  { id: "s4", name: "Palak (Spinach)", nameHindi: "पालक", price: 15, unit: "bunch", category: "sabji" },
  { id: "s5", name: "Gobi (Cauliflower)", nameHindi: "गोभी", price: 35, unit: "kg", category: "sabji" },
  { id: "s6", name: "Mirch (Chilli)", nameHindi: "मिर्च", price: 40, unit: "kg", category: "sabji" },
  { id: "s7", name: "Seb (Apple)", nameHindi: "सेब", price: 80, unit: "kg", category: "sabji" },
  { id: "s8", name: "Kela (Banana)", nameHindi: "केला", price: 40, unit: "dozen", category: "sabji" },
  { id: "s9", name: "Aam (Mango)", nameHindi: "आम", price: 120, unit: "kg", category: "sabji" },
  { id: "s10", name: "Angur (Grapes)", nameHindi: "अंगूर", price: 90, unit: "kg", category: "sabji" },
];

export const groceryProducts: Product[] = [
  { id: "g1", name: "Chawal Basmati", nameHindi: "चावल बासमती", price: 90, unit: "kg", category: "grocery" },
  { id: "g2", name: "Arhar Dal", nameHindi: "अरहर दाल", price: 120, unit: "kg", category: "grocery" },
  { id: "g3", name: "Gehun Aata", nameHindi: "गेहूँ आटा", price: 45, unit: "kg", category: "grocery" },
  { id: "g4", name: "Sarso Tel", nameHindi: "सरसों तेल", price: 150, unit: "L", category: "grocery" },
  { id: "g5", name: "Chini (Sugar)", nameHindi: "चीनी", price: 42, unit: "kg", category: "grocery" },
  { id: "g6", name: "Namak (Salt)", nameHindi: "नमक", price: 20, unit: "kg", category: "grocery" },
  { id: "g7", name: "Atta Maida", nameHindi: "मैदा", price: 38, unit: "kg", category: "grocery" },
  { id: "g8", name: "Mustard Seeds", nameHindi: "सरसों", price: 85, unit: "250g", category: "grocery" },
];

export const barberServices: Service[] = [
  { id: "b1", name: "Haircut", nameHindi: "बाल कटाई", price: 80, duration: "30 mins", category: "barber" },
  { id: "b2", name: "Shave", nameHindi: "दाढ़ी", price: 50, duration: "15 mins", category: "barber" },
  { id: "b3", name: "Head Massage", nameHindi: "सिर मालिश", price: 100, duration: "20 mins", category: "barber" },
  { id: "b4", name: "Hair Color", nameHindi: "बाल रंग", price: 300, duration: "45 mins", category: "barber" },
  { id: "b5", name: "Facial", nameHindi: "फेशियल", price: 250, duration: "40 mins", category: "barber" },
  { id: "b6", name: "Kids Cut", nameHindi: "बच्चों की कटाई", price: 60, duration: "25 mins", category: "barber" },
];

export const otherServices: Service[] = [
  { id: "o1", name: "Plumber", nameHindi: "प्लंबर", price: "200-500", category: "other" },
  { id: "o2", name: "Electrician", nameHindi: "इलेक्ट्रीशियन", price: "150-400", category: "other" },
  { id: "o3", name: "Tiffin Service", nameHindi: "टिफिन सेवा", price: "80/day", category: "other" },
  { id: "o4", name: "Photography", nameHindi: "फोटोग्राफी", price: "5000/event", category: "other" },
  { id: "o5", name: "Tutor", nameHindi: "ट्यूटर", price: "500/month", category: "other" },
  { id: "o6", name: "Laundry", nameHindi: "लॉन्ड्री", price: "40/kg", category: "other" },
];

export const allProducts = [...sabjiProducts, ...groceryProducts];
export const allServices = [...barberServices, ...otherServices];
