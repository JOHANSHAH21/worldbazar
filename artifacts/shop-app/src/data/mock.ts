export type Product = {
  id: string;
  name: string;
  nameHindi: string;
  price: number;
  unit: string;
  category: "sabji" | "grocery";
  inStock: boolean;
  stock?: number;
};

export type Service = {
  id: string;
  name: string;
  nameHindi: string;
  price: number | string;
  duration?: string;
  description?: string;
  category: "barber" | "other";
  icon: string;
};

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  specialtyHindi: string;
  fee: number;
  rating: number;
  experience: string;
  status: "available" | "busy" | "offline";
  languages: string[];
};

export type Currency = {
  code: string;
  symbol: string;
  name: string;
  rateToINR: number;
};

export const sabjiProducts: Product[] = [
  { id: "s1", name: "Tamatar (Tomato)", nameHindi: "टमाटर", price: 30, unit: "kg", category: "sabji", inStock: true, stock: 45 },
  { id: "s2", name: "Aloo (Potato)", nameHindi: "आलू", price: 25, unit: "kg", category: "sabji", inStock: true, stock: 80 },
  { id: "s3", name: "Pyaz (Onion)", nameHindi: "प्याज़", price: 20, unit: "kg", category: "sabji", inStock: false },
  { id: "s4", name: "Palak (Spinach)", nameHindi: "पालक", price: 15, unit: "bunch", category: "sabji", inStock: true, stock: 20 },
  { id: "s5", name: "Gobi (Cauliflower)", nameHindi: "गोभी", price: 35, unit: "kg", category: "sabji", inStock: true, stock: 12 },
  { id: "s6", name: "Mirch (Chilli)", nameHindi: "मिर्च", price: 40, unit: "kg", category: "sabji", inStock: false },
  { id: "s7", name: "Seb (Apple)", nameHindi: "सेब", price: 80, unit: "kg", category: "sabji", inStock: true, stock: 30 },
  { id: "s8", name: "Kela (Banana)", nameHindi: "केला", price: 40, unit: "dozen", category: "sabji", inStock: true, stock: 50 },
  { id: "s9", name: "Aam (Mango)", nameHindi: "आम", price: 120, unit: "kg", category: "sabji", inStock: true, stock: 8 },
  { id: "s10", name: "Angur (Grapes)", nameHindi: "अंगूर", price: 90, unit: "kg", category: "sabji", inStock: false },
];

export const groceryProducts: Product[] = [
  { id: "g1", name: "Chawal Basmati", nameHindi: "चावल बासमती", price: 90, unit: "kg", category: "grocery", inStock: true, stock: 100 },
  { id: "g2", name: "Arhar Dal", nameHindi: "अरहर दाल", price: 120, unit: "kg", category: "grocery", inStock: true, stock: 60 },
  { id: "g3", name: "Gehun Aata", nameHindi: "गेहूँ आटा", price: 45, unit: "kg", category: "grocery", inStock: true, stock: 200 },
  { id: "g4", name: "Sarso Tel", nameHindi: "सरसों तेल", price: 150, unit: "L", category: "grocery", inStock: false },
  { id: "g5", name: "Chini (Sugar)", nameHindi: "चीनी", price: 42, unit: "kg", category: "grocery", inStock: true, stock: 150 },
  { id: "g6", name: "Namak (Salt)", nameHindi: "नमक", price: 20, unit: "kg", category: "grocery", inStock: true, stock: 80 },
  { id: "g7", name: "Atta Maida", nameHindi: "मैदा", price: 38, unit: "kg", category: "grocery", inStock: true, stock: 40 },
  { id: "g8", name: "Mustard Seeds", nameHindi: "सरसों", price: 85, unit: "250g", category: "grocery", inStock: false },
];

export const barberServices: Service[] = [
  { id: "b1", name: "Haircut", nameHindi: "बाल कटाई", price: 80, duration: "30 mins", description: "Professional cut with wash", category: "barber", icon: "scissors" },
  { id: "b2", name: "Shave", nameHindi: "दाढ़ी", price: 50, duration: "15 mins", description: "Clean shave with hot towel", category: "barber", icon: "zap" },
  { id: "b3", name: "Head Massage", nameHindi: "सिर मालिश", price: 100, duration: "20 mins", description: "Relaxing head massage", category: "barber", icon: "heart" },
  { id: "b4", name: "Hair Color", nameHindi: "बाल रंग", price: 300, duration: "45 mins", description: "Quality color treatment", category: "barber", icon: "droplet" },
  { id: "b5", name: "Facial", nameHindi: "फेशियल", price: 250, duration: "40 mins", description: "Deep cleansing facial", category: "barber", icon: "star" },
  { id: "b6", name: "Kids Cut", nameHindi: "बच्चों की कटाई", price: 60, duration: "25 mins", description: "Gentle cut for kids", category: "barber", icon: "smile" },
];

export const otherServices: Service[] = [
  { id: "o1", name: "Plumber", nameHindi: "प्लंबर", price: "200-500", description: "All plumbing repairs", category: "other", icon: "wrench" },
  { id: "o2", name: "Electrician", nameHindi: "इलेक्ट्रीशियन", price: "150-400", description: "Wiring & installation", category: "other", icon: "zap" },
  { id: "o3", name: "Tiffin Service", nameHindi: "टिफिन सेवा", price: "80/day", description: "Fresh home-cooked meals", category: "other", icon: "utensils" },
  { id: "o4", name: "Photography", nameHindi: "फोटोग्राफी", price: "5000/event", description: "Events & portraits", category: "other", icon: "camera" },
  { id: "o5", name: "Tutor", nameHindi: "ट्यूटर", price: "500/month", description: "All subjects", category: "other", icon: "book-open" },
  { id: "o6", name: "Laundry", nameHindi: "लॉन्ड्री", price: "40/kg", description: "Wash, dry & press", category: "other", icon: "wind" },
];

export const doctors: Doctor[] = [
  { id: "d1", name: "Dr. Priya Sharma", specialty: "General Physician", specialtyHindi: "सामान्य चिकित्सक", fee: 300, rating: 4.9, experience: "15 yrs", status: "available", languages: ["Hindi", "English"] },
  { id: "d2", name: "Dr. Rajan Mehta", specialty: "Cardiologist", specialtyHindi: "हृदय रोग", fee: 800, rating: 4.8, experience: "20 yrs", status: "busy", languages: ["Hindi", "English", "Gujarati"] },
  { id: "d3", name: "Dr. Sunita Patel", specialty: "Dermatologist", specialtyHindi: "त्वचा विशेषज्ञ", fee: 600, rating: 4.7, experience: "12 yrs", status: "available", languages: ["Hindi", "English"] },
  { id: "d4", name: "Dr. Amit Kumar", specialty: "Pediatrician", specialtyHindi: "बाल रोग विशेषज्ञ", fee: 400, rating: 4.9, experience: "10 yrs", status: "available", languages: ["Hindi", "English", "Bengali"] },
  { id: "d5", name: "Dr. Meena Joshi", specialty: "Gynecologist", specialtyHindi: "स्त्री रोग", fee: 700, rating: 4.8, experience: "18 yrs", status: "offline", languages: ["Hindi", "English", "Marathi"] },
  { id: "d6", name: "Dr. Sanjay Tiwari", specialty: "Psychiatrist", specialtyHindi: "मानसिक स्वास्थ्य", fee: 900, rating: 4.7, experience: "14 yrs", status: "available", languages: ["Hindi", "English"] },
];

export const CURRENCIES: Currency[] = [
  { code: "INR", symbol: "₹", name: "Indian Rupee", rateToINR: 1 },
  { code: "USD", symbol: "$", name: "US Dollar", rateToINR: 83.5 },
  { code: "EUR", symbol: "€", name: "Euro", rateToINR: 90.2 },
  { code: "GBP", symbol: "£", name: "British Pound", rateToINR: 106.0 },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham", rateToINR: 22.7 },
  { code: "SAR", symbol: "﷼", name: "Saudi Riyal", rateToINR: 22.3 },
  { code: "JPY", symbol: "¥", name: "Japanese Yen", rateToINR: 0.55 },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan", rateToINR: 11.5 },
  { code: "CAD", symbol: "CA$", name: "Canadian Dollar", rateToINR: 61.5 },
  { code: "AUD", symbol: "A$", name: "Australian Dollar", rateToINR: 54.0 },
  { code: "SGD", symbol: "S$", name: "Singapore Dollar", rateToINR: 62.0 },
  { code: "MYR", symbol: "RM", name: "Malaysian Ringgit", rateToINR: 17.8 },
  { code: "BRL", symbol: "R$", name: "Brazilian Real", rateToINR: 17.0 },
  { code: "NGN", symbol: "₦", name: "Nigerian Naira", rateToINR: 0.054 },
];

export const DELIVERY_STEPS = [
  { id: 1, label: "Order Placed", labelHindi: "Order मिली" },
  { id: 2, label: "Preparing", labelHindi: "तैयारी हो रही है" },
  { id: 3, label: "Picked Up", labelHindi: "Pickup हो गई" },
  { id: 4, label: "On the Way", labelHindi: "रास्ते में है" },
  { id: 5, label: "Delivered", labelHindi: "Delivered" },
];

export const allProducts = [...sabjiProducts, ...groceryProducts];
export const allServices = [...barberServices, ...otherServices];
