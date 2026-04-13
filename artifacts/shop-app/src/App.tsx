import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import { BookingProvider } from "@/context/BookingContext";
import BottomNav from "@/components/BottomNav";
import CartDrawer from "@/components/CartDrawer";
import Home from "@/pages/Home";
import Barber from "@/pages/Barber";
import SabjiiFal from "@/pages/SabjiiFal";
import Grocery from "@/pages/Grocery";
import Booking from "@/pages/Booking";
import Other from "@/pages/Other";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function AppContent() {
  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto relative">
      {/* Top bar with cart */}
      <div className="fixed top-0 left-0 right-0 z-40 flex justify-end items-center px-4 pt-3 max-w-lg mx-auto pointer-events-none">
        <div className="pointer-events-auto">
          <CartDrawer />
        </div>
      </div>

      {/* Page Content */}
      <div className="pb-20 overflow-y-auto">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/barber" component={Barber} />
          <Route path="/sabji" component={SabjiiFal} />
          <Route path="/grocery" component={Grocery} />
          <Route path="/booking" component={Booking} />
          <Route path="/other" component={Other} />
          <Route component={NotFound} />
        </Switch>
      </div>

      <BottomNav />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <BookingProvider>
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <AppContent />
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </BookingProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
