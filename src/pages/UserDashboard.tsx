import { Link } from "react-router-dom";
import { Calendar, MapPin, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { userBookings } from "@/data/mockData";

const UserDashboard = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Bookings</h1>
          <p className="text-muted-foreground">
            View and manage your upcoming and past reservations
          </p>
        </div>

        {/* Bookings List */}
        {userBookings.length > 0 ? (
          <div className="space-y-4">
            {userBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-card rounded-xl border border-border p-4 sm:p-6 hover:shadow-card-hover transition-shadow"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Image */}
                  <Link to={`/properties/${booking.propertyId}`} className="shrink-0">
                    <img
                      src={booking.propertyImage}
                      alt={booking.propertyTitle}
                      className="w-full sm:w-40 h-28 rounded-lg object-cover"
                    />
                  </Link>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Link
                        to={`/properties/${booking.propertyId}`}
                        className="font-semibold text-lg hover:text-primary transition-colors truncate"
                      >
                        {booking.propertyTitle}
                      </Link>
                      <StatusBadge status={booking.status} />
                    </div>

                    <div className="flex items-center gap-1 text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4 shrink-0" />
                      <span className="truncate">{booking.location}</span>
                    </div>

                    <div className="flex items-center gap-1 text-muted-foreground mb-4">
                      <Calendar className="h-4 w-4 shrink-0" />
                      <span>
                        {new Date(booking.checkIn).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}{" "}
                        -{" "}
                        {new Date(booking.checkOut).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="text-muted-foreground">
                        · {booking.guests} guests
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="font-semibold">
                        ${booking.totalPrice}
                        <span className="font-normal text-muted-foreground"> total</span>
                      </p>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/properties/${booking.propertyId}`}>
                          View Details
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-card rounded-xl border border-border">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
              <Calendar className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No bookings yet
            </h3>
            <p className="text-muted-foreground mb-6">
              Start exploring and book your first stay
            </p>
            <Button asChild>
              <Link to="/properties">Browse Properties</Link>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserDashboard;
