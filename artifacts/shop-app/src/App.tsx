import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import { BookingProvider } from "@/context/BookingContext";
import { AppProvider, useApp } from "@/context/AppContext";
import BottomNav from "@/components/BottomNav";
import CartDrawer from "@/components/CartDrawer";
import LiveClock from "@/components/LiveClock";
import LiveUsersCounter from "@/components/LiveUsersCounter";
import ActivityTicker from "@/components/ActivityTicker";
import Splash from "@/pages/Splash";
import Home from "@/pages/Home";
import Barber from "@/pages/Barber";
import SabjiiFal from "@/pages/SabjiiFal";
import Grocery from "@/pages/Grocery";
import Booking from "@/pages/Booking";
import Other from "@/pages/Other";
import WorldwideSellers from "@/pages/WorldwideSellers";
import SellerDashboard from "@/pages/SellerDashboard";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function AppContent() {
  const { splashDone, role } = useApp();

  if (!splashDone) {
    return <Splash />;
  }

  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto relative flex flex-col">
      {/* Live header bar */}
      <div className="bg-gradient-to-r from-primary to-orange-400 px-4 py-2 flex items-center justify-between flex-shrink-0">
        <LiveClock />
        <LiveUsersCounter />
      </div>

      {/* Activity Ticker */}
      <ActivityTicker />

      {/* Top bar with cart (customer only) */}
      {role === "customer" && (
        <div className="fixed top-0 left-0 right-0 z-40 flex justify-end items-center px-4 pt-[62px] max-w-lg mx-auto pointer-events-none">
          <div className="pointer-events-auto">
            <CartDrawer />
          </div>
        </div>
      )}

      {/* Page Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/barber" component={Barber} />
          <Route path="/sabji" component={SabjiiFal} />
          <Route path="/grocery" component={Grocery} />
          <Route path="/booking" component={Booking} />
          <Route path="/other" component={Other} />
          <Route path="/worldwide" component={WorldwideSellers} />
          <Route path="/seller" component={SellerDashboard} />
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
      <AppProvider>
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
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
