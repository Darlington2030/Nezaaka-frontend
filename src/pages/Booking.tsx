import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { ChevronLeft, Calendar, Users, CreditCard, Lock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Layout from "@/components/layout/Layout";
import { properties } from "@/data/mockData";

const Booking = () => {
  const { propertyId } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const property = properties.find((p) => p.id === propertyId);

  if (!property) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Property not found</h1>
          <Button asChild>
            <Link to="/properties">Browse Properties</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const nights = 5;
  const subtotal = property.price * nights;
  const serviceFee = Math.round(subtotal * 0.12);
  const total = subtotal + serviceFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center max-w-lg">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-success/10 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-success" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Booking Confirmed!
          </h1>
          <p className="text-muted-foreground mb-8">
            Your reservation at {property.title} has been confirmed. We've sent a confirmation email with all the details.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/dashboard">View My Bookings</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/properties">Browse More</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to={`/properties/${property.id}`}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to property
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">
          Complete your booking
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left - Form */}
          <div className="space-y-8">
            {/* Trip Details */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-lg font-semibold mb-6">Your trip</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-secondary">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Dates</p>
                    <p className="text-muted-foreground">Feb 15 - Feb 20, 2025</p>
                  </div>
                  <button className="text-sm text-primary hover:underline">Edit</button>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-secondary">
                    <Users className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Guests</p>
                    <p className="text-muted-foreground">2 guests</p>
                  </div>
                  <button className="text-sm text-primary hover:underline">Edit</button>
                </div>
              </div>
            </div>

            {/* Payment */}
            <form onSubmit={handleSubmit} className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center gap-2 mb-6">
                <CreditCard className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Payment details</h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardName">Name on card</Label>
                  <Input id="cardName" placeholder="John Doe" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card number</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry date</Label>
                    <Input id="expiry" placeholder="MM/YY" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" required />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-6 p-3 bg-secondary/50 rounded-lg text-sm text-muted-foreground">
                <Lock className="h-4 w-4" />
                <span>Your payment info is encrypted and secure</span>
              </div>

              <Button 
                type="submit" 
                className="w-full mt-6" 
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : `Confirm & Pay $${total}`}
              </Button>
            </form>
          </div>

          {/* Right - Summary */}
          <div className="lg:order-first">
            <div className="sticky top-24 bg-card rounded-xl border border-border p-6">
              {/* Property Preview */}
              <div className="flex gap-4 pb-6 border-b border-border">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-28 h-24 rounded-lg object-cover"
                />
                <div>
                  <p className="text-sm text-muted-foreground">{property.location}</p>
                  <h3 className="font-semibold">{property.title}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-sm">⭐ {property.rating}</span>
                    <span className="text-sm text-muted-foreground">
                      ({property.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="py-6 border-b border-border">
                <h3 className="font-semibold mb-4">Price details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      ${property.price} × {nights} nights
                    </span>
                    <span>${subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Service fee</span>
                    <span>${serviceFee}</span>
                  </div>
                </div>
              </div>

              {/* Total */}
              <div className="pt-6">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total (USD)</span>
                  <span>${total}</span>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Cancellation Policy */}
              <div className="text-sm">
                <p className="font-medium mb-2">Cancellation policy</p>
                <p className="text-muted-foreground">
                  Free cancellation before Feb 10, 2025. Cancel before Feb 14 for a partial refund.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Booking;
