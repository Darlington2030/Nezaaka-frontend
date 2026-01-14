import { Link } from "react-router-dom";
import { Plus, Calendar, DollarSign, Home, MapPin, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Layout from "@/components/layout/Layout";
import StatCard from "@/components/dashboard/StatCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { hostProperties, hostBookingRequests } from "@/data/mockData";

const HostDashboard = () => {
  const totalEarnings = hostProperties.reduce((acc, p) => acc + p.earnings, 0);
  const totalBookings = hostProperties.reduce((acc, p) => acc + p.bookings, 0);

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Host Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your properties and booking requests
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard
            title="Total Properties"
            value={hostProperties.length}
            icon={Home}
          />
          <StatCard
            title="Total Bookings"
            value={totalBookings}
            icon={Calendar}
          />
          <StatCard
            title="Total Earnings"
            value={`$${totalEarnings.toLocaleString()}`}
            icon={DollarSign}
            iconColor="text-success"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Properties */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Properties</h2>
            <div className="space-y-4">
              {hostProperties.map((property) => (
                <div
                  key={property.id}
                  className="bg-card rounded-xl border border-border p-4 hover:shadow-card-hover transition-shadow"
                >
                  <div className="flex gap-4">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-24 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold truncate">{property.title}</h3>
                        <StatusBadge status={property.status} />
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{property.location}</span>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <span className="text-muted-foreground">
                          {property.bookings} bookings
                        </span>
                        <span className="font-medium text-success">
                          ${property.earnings.toLocaleString()} earned
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Requests */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Booking Requests</h2>
            <div className="space-y-4">
              {hostBookingRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-card rounded-xl border border-border p-4 hover:shadow-card-hover transition-shadow"
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <p className="font-medium truncate">{request.propertyTitle}</p>
                    <StatusBadge status={request.status} />
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={request.guestAvatar} alt={request.guestName} />
                      <AvatarFallback>{request.guestName[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{request.guestName}</p>
                      <p className="text-xs text-muted-foreground">
                        {request.guests} guests
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(request.checkIn).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      -{" "}
                      {new Date(request.checkOut).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="font-semibold">${request.totalPrice}</p>
                    {request.status === "pending" && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <X className="h-4 w-4" />
                        </Button>
                        <Button size="sm">
                          <Check className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HostDashboard;
