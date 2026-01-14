import { useParams, Link } from "react-router-dom";
import { MapPin, Users, Star, Share2, Heart, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Layout from "@/components/layout/Layout";
import { properties, reviews } from "@/data/mockData";

const PropertyDetails = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const property = properties.find((p) => p.id === id);
  const propertyReviews = reviews.filter((r) => r.propertyId === id);

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

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            to="/properties"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to properties
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                {property.title}
              </h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span className="font-medium text-foreground">{property.rating}</span>
                  <span>({property.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{property.location}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart
                  className={`h-4 w-4 mr-2 ${
                    isLiked ? "fill-primary text-primary" : ""
                  }`}
                />
                Save
              </Button>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="relative mb-8 rounded-2xl overflow-hidden">
          <div className="aspect-[16/9] md:aspect-[21/9]">
            <img
              src={property.images[currentImageIndex]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </div>
          {property.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {property.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      idx === currentImageIndex ? "bg-primary-foreground" : "bg-primary-foreground/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Info */}
            <div className="flex items-center justify-between pb-6 border-b border-border">
              <div>
                <h2 className="text-xl font-semibold mb-1">
                  Hosted by {property.host.name}
                </h2>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>Up to {property.maxGuests} guests</span>
                </div>
              </div>
              <Avatar className="h-14 w-14">
                <AvatarImage src={property.host.avatar} alt={property.host.name} />
                <AvatarFallback>{property.host.name[0]}</AvatarFallback>
              </Avatar>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-3">About this place</h3>
              <p className="text-muted-foreground leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="text-lg font-semibold mb-4">What this place offers</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-2 text-muted-foreground"
                  >
                    <Check className="h-4 w-4 text-success" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Host Info */}
            <div className="p-6 bg-secondary/50 rounded-xl">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={property.host.avatar} alt={property.host.name} />
                  <AvatarFallback>{property.host.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{property.host.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Hosting since {property.host.joinedYear}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {property.host.responseRate}% response rate
                  </p>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Star className="h-5 w-5 fill-warning text-warning" />
                <span className="text-xl font-semibold">{property.rating}</span>
                <span className="text-muted-foreground">
                  · {property.reviewCount} reviews
                </span>
              </div>
              <div className="space-y-6">
                {propertyReviews.map((review) => (
                  <div key={review.id} className="pb-6 border-b border-border last:border-0">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar>
                        <AvatarImage src={review.userAvatar} alt={review.userName} />
                        <AvatarFallback>{review.userName[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{review.userName}</p>
                        <p className="text-sm text-muted-foreground">{review.date}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card rounded-xl border border-border shadow-card p-6">
              <div className="flex items-baseline justify-between mb-6">
                <div>
                  <span className="text-2xl font-bold">${property.price}</span>
                  <span className="text-muted-foreground"> / night</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span className="font-medium">{property.rating}</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 border border-border rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">CHECK-IN</p>
                    <p className="font-medium">Select date</p>
                  </div>
                  <div className="p-3 border border-border rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">CHECK-OUT</p>
                    <p className="font-medium">Select date</p>
                  </div>
                </div>
                <div className="p-3 border border-border rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">GUESTS</p>
                  <p className="font-medium">1 guest</p>
                </div>
              </div>

              <Button className="w-full mb-4" size="lg" asChild>
                <Link to={`/booking/${property.id}`}>Book Now</Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                You won't be charged yet
              </p>

              <div className="mt-6 pt-6 border-t border-border space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    ${property.price} × 5 nights
                  </span>
                  <span>${property.price * 5}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Service fee</span>
                  <span>${Math.round(property.price * 5 * 0.12)}</span>
                </div>
                <div className="flex justify-between font-semibold pt-3 border-t border-border">
                  <span>Total</span>
                  <span>${Math.round(property.price * 5 * 1.12)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PropertyDetails;
