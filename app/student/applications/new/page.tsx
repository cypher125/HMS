"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, Building2, Home, Loader2, 
  AlertCircle, CheckCircle, CreditCard, MapPin 
} from "lucide-react";
import { hostelService, Room } from "@/lib/services/hostelService";
import { applicationService } from "@/lib/services/applicationService";
import { useAuth } from "@/lib/context/AuthContext";

export default function NewApplicationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomId = searchParams.get("room");
  
  const [room, setRoom] = useState<Room | null>(null);
  const [specialRequests, setSpecialRequests] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [successId, setSuccessId] = useState<number | null>(null);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      if (!roomId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await hostelService.getRoomById(Number(roomId));
        setRoom(data);
      } catch (err: any) {
        setError(err.message || "Failed to load room details");
        console.error("Room loading error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomDetails();
  }, [roomId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!room) {
      setError("No room selected. Please select a room first.");
      return;
    }
    
    try {
      setSubmitting(true);
      setError(null);
      
      const applicationData = {
        room: room.id,
        special_requests: specialRequests,
      };
      
      const response = await applicationService.createApplication(applicationData);
      setSuccess(true);
      setSuccessId(response.id);
      
      // Scroll to top
      window.scrollTo(0, 0);
    } catch (err: any) {
      setError(err.message || "Failed to submit application. Please try again.");
      console.error("Application submission error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#006400]" />
          <p className="mt-2 text-lg">Loading room details...</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="container mx-auto mt-8 px-4 pb-12">
        <Card className="mx-auto max-w-2xl overflow-hidden">
          <div className="bg-green-500 h-2 w-full" />
          <CardContent className="flex flex-col items-center justify-center pt-10 pb-6">
            <div className="mb-4 rounded-full bg-green-100 p-3">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="mb-2 text-2xl font-bold">Application Submitted Successfully!</h2>
            <p className="mb-6 text-center text-gray-600">
              Your application has been received and is now under review.
              You will be notified when there are updates.
            </p>
            <div className="w-full space-y-4">
              {successId ? (
                <Button 
                  onClick={() => router.push(`/student/applications/${successId}`)} 
                  className="w-full bg-[#006400] hover:bg-[#006400]/90"
                >
                  View Application Details
                </Button>
              ) : (
                <Button 
                  onClick={() => router.push("/student/dashboard")} 
                  className="w-full bg-[#006400] hover:bg-[#006400]/90"
                >
                  Go to Dashboard
                </Button>
              )}
              <Button 
                variant="outline" 
                onClick={() => router.push("/student/dashboard")} 
                className="w-full"
              >
                Return to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!roomId || !room) {
    return (
      <div className="container mx-auto mt-8 px-4 pb-12">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </div>
        <Card className="mx-auto max-w-2xl">
          <CardContent className="flex flex-col items-center justify-center py-10">
            <AlertCircle className="mb-4 h-16 w-16 text-yellow-500" />
            <h2 className="mb-2 text-2xl font-bold">No Room Selected</h2>
            <p className="mb-6 text-center text-gray-600">
              Please select a room before creating an application.
            </p>
            <Button onClick={() => router.push("/hostels")} className="bg-[#006400] hover:bg-[#006400]/90">
              Browse Hostels
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8 px-4 pb-12">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <h1 className="text-2xl font-bold md:text-3xl">New Accommodation Application</h1>
        <p className="text-muted-foreground">Complete the form below to apply for your selected room</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Main Form */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Application Form</CardTitle>
              <CardDescription>
                Please review your room selection and provide any special requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-800">
                  <div className="flex items-center">
                    <AlertCircle className="mr-2 h-5 w-5 text-red-600" />
                    <p className="font-medium">{error}</p>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Selected Room</h3>
                  
                  <div className="rounded-lg border p-4">
                    <div className="grid items-start gap-4 sm:grid-cols-2">
                      <div className="relative h-36 w-full rounded-md overflow-hidden">
                        {room.image ? (
                          <Image src={room.image} alt={`Room ${room.room_number}`} fill className="object-cover" />
                        ) : room.images && room.images.length > 0 ? (
                          <Image 
                            src={room.images.find(img => img.is_primary)?.image || room.images[0].image} 
                            alt={`Room ${room.room_number}`} 
                            fill 
                            className="object-cover" 
                          />
                        ) : (
                          <Image src="/placeholder.svg" alt={`Room ${room.room_number}`} fill className="object-cover" />
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Home className="mr-2 h-5 w-5 text-[#006400]" />
                          <h4 className="font-semibold">Room {room.room_number}</h4>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600">
                          <Building2 className="mr-2 h-4 w-4" />
                          <span>
                            {room.hostel?.name || `Hostel ID: ${room.hostel}`}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="mr-2 h-4 w-4" />
                          <span>
                            {room.hostel?.location || "Floor: " + room.floor}
                          </span>
                        </div>
                        
                        <div className="mt-2 flex items-center font-medium">
                          <CreditCard className="mr-2 h-5 w-5 text-[#006400]" />
                          <span>₦{parseFloat(room.price).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <label htmlFor="special-requests" className="text-base font-medium">
                      Special Requests (Optional)
                    </label>
                    <Textarea
                      id="special-requests"
                      placeholder="If you have any special requirements, disabilities, or preferences, please let us know here."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="min-h-[120px]"
                    />
                    <p className="text-sm text-gray-500">
                      While we will try to accommodate your requests, we cannot guarantee that all special requests will be fulfilled.
                    </p>
                  </div>
                </div>
                
                <div className="rounded-lg bg-yellow-50 p-4 text-sm">
                  <p className="font-medium text-yellow-800">Important Notice</p>
                  <ul className="mt-2 list-inside list-disc space-y-1 text-yellow-700">
                    <li>Your application will be reviewed by the hostel administration.</li>
                    <li>You will receive notification when your application status changes.</li>
                    <li>Once approved, you must make payment within 7 days to secure your spot.</li>
                  </ul>
                </div>
                
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-[#006400] hover:bg-[#006400]/90"
                    disabled={submitting}
                  >
                    {submitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        
        {/* Sidebar */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Application Process</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-6">
                <li className="relative border-l border-gray-300 pl-6 pb-2">
                  <div className="absolute -left-[7px] flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#006400] text-white">
                    <span className="text-xs">1</span>
                  </div>
                  <h3 className="font-medium">Submit Application</h3>
                  <p className="text-sm text-gray-600">
                    Complete and submit the application form with your room choice
                  </p>
                </li>
                
                <li className="relative border-l border-gray-300 pl-6 pb-2">
                  <div className="absolute -left-[7px] flex h-3.5 w-3.5 items-center justify-center rounded-full bg-gray-300 text-gray-700">
                    <span className="text-xs">2</span>
                  </div>
                  <h3 className="font-medium text-gray-700">Application Review</h3>
                  <p className="text-sm text-gray-600">
                    Hostel administration reviews your application
                  </p>
                </li>
                
                <li className="relative border-l border-gray-300 pl-6 pb-2">
                  <div className="absolute -left-[7px] flex h-3.5 w-3.5 items-center justify-center rounded-full bg-gray-300 text-gray-700">
                    <span className="text-xs">3</span>
                  </div>
                  <h3 className="font-medium text-gray-700">Approval & Payment</h3>
                  <p className="text-sm text-gray-600">
                    Once approved, make payment to secure your room
                  </p>
                </li>
                
                <li className="relative pl-6">
                  <div className="absolute -left-[7px] flex h-3.5 w-3.5 items-center justify-center rounded-full bg-gray-300 text-gray-700">
                    <span className="text-xs">4</span>
                  </div>
                  <h3 className="font-medium text-gray-700">Move In</h3>
                  <p className="text-sm text-gray-600">
                    Receive allocation letter and check-in details
                  </p>
                </li>
              </ol>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/faq">
                  View Hostel FAQs
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
} 