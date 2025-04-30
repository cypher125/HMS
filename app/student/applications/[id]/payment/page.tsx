"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Loader2, 
  AlertCircle, 
  CheckCircle, 
  CreditCard,
  Building2,
  Calendar
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { applicationService, Application } from "@/lib/services/applicationService";

export default function ApplicationPaymentPage() {
  const params = useParams();
  const router = useRouter();
  const applicationId = params?.id as string;
  
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [paymentMethod, setPaymentMethod] = useState<string>("Card");
  const [amount, setAmount] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setLoading(true);
        
        // Validate applicationId
        if (!applicationId) {
          throw new Error("Application ID is missing");
        }
        
        // Ensure ID is a valid number
        const numericId = parseInt(applicationId);
        if (isNaN(numericId)) {
          throw new Error(`Application #${applicationId} is not a valid ID. Please check the application ID and try again.`);
        }
        
        // Fetch application details
        const data = await applicationService.getApplicationById(numericId);
        setApplication(data);
        
        // If the room price is available, set it as the default amount
        if (data.room && data.room.price) {
          setAmount(data.room.price.toString());
        }
      } catch (err: any) {
        setError(err.message || "Failed to load application details");
        console.error("Application loading error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [applicationId]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!applicationId || isNaN(parseInt(applicationId))) {
      setError("Invalid application ID");
      return;
    }
    
    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }
    
    try {
      setProcessing(true);
      setError(null);
      
      // Create payment data
      const paymentData = {
        amount,
        payment_method: paymentMethod as 'Card' | 'Bank Transfer' | 'Cash'
      };
      
      // Call the payment service
      await applicationService.createPayment(Number(applicationId), paymentData);
      
      // Update application status to simulate payment
      await applicationService.makePayment(Number(applicationId));
      
      setSuccess(true);
      
      // Scroll to top
      window.scrollTo(0, 0);
    } catch (err: any) {
      setError(err.message || "Payment failed. Please try again.");
      console.error("Payment error:", err);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#006400]" />
          <p className="mt-2 text-lg">Loading application details...</p>
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
            <h2 className="mb-2 text-2xl font-bold">Payment Successful!</h2>
            <p className="mb-6 text-center text-gray-600">
              Your payment has been processed successfully.
              Your accommodation is now secured.
            </p>
            <div className="w-full space-y-4">
              {applicationId && !isNaN(parseInt(applicationId)) ? (
                <Button 
                  onClick={() => router.push(`/student/applications/${applicationId}`)} 
                  className="w-full bg-[#006400] hover:bg-[#006400]/90"
                >
                  View Application Details
                </Button>
              ) : null}
              <Button 
                variant={applicationId && !isNaN(parseInt(applicationId)) ? "outline" : "default"}
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

  if (error || !application) {
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
            <h2 className="mb-2 text-2xl font-bold">Application Not Found</h2>
            <p className="mb-6 text-center text-gray-600">
              {error || `We couldn't find the application you're looking for (ID: ${applicationId || 'undefined'}).`}
            </p>
            <Button onClick={() => router.push("/student/dashboard")} className="bg-[#006400] hover:bg-[#006400]/90">
              Return to Dashboard
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
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Application
        </Button>
        <h1 className="text-2xl font-bold md:text-3xl">Make Payment</h1>
        <p className="text-muted-foreground">Complete your hostel payment to secure your accommodation</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Payment Form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>
                Enter your payment information below
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
              
              <form onSubmit={handlePayment} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="amount">Amount (₦)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      disabled={processing}
                      className="mt-1"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      The full price for this room is ₦{application.room.price ? parseFloat(application.room.price).toLocaleString() : 'N/A'}
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="payment-method">Payment Method</Label>
                    <Select 
                      value={paymentMethod} 
                      onValueChange={setPaymentMethod}
                      disabled={processing}
                    >
                      <SelectTrigger id="payment-method" className="mt-1">
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Card">Credit/Debit Card</SelectItem>
                        <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                        <SelectItem value="Cash">Cash (Pay at Bursary)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {paymentMethod === 'Card' && (
                    <div className="space-y-4 rounded-lg border p-4">
                      <div>
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input
                          id="card-number"
                          placeholder="**** **** **** ****"
                          disabled={processing}
                          className="mt-1"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            disabled={processing}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvc">CVC</Label>
                          <Input
                            id="cvc"
                            placeholder="***"
                            disabled={processing}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-[#006400] hover:bg-[#006400]/90"
                    disabled={processing}
                  >
                    {processing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Complete Payment
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        
        {/* Application Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Application Summary</CardTitle>
              <CardDescription>
                Review your hostel application details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="mb-2 font-semibold">Room Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Room Number:</span>
                    <span className="font-medium">{application.room.room_number}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Room Type:</span>
                    <span className="font-medium">{application.room.room_type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hostel:</span>
                    <span className="font-medium">
                      {application.room.hostel?.name || `Hostel ID: ${application.room.hostel}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Floor:</span>
                    <span className="font-medium">{application.room.floor}</span>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="mb-2 font-semibold">Application Status</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`font-medium ${
                      application.status === 'Approved' ? 'text-green-600' :
                      application.status === 'Rejected' ? 'text-red-600' :
                      application.status === 'Pending' ? 'text-yellow-600' :
                      ''
                    }`}>
                      {application.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Applied On:</span>
                    <span className="font-medium">
                      {new Date(application.application_date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Status:</span>
                    <span className={`font-medium ${
                      application.payment_status === 'Paid' ? 'text-green-600' :
                      application.payment_status === 'Partially Paid' ? 'text-blue-600' :
                      application.payment_status === 'Unpaid' ? 'text-red-600' :
                      ''
                    }`}>
                      {application.payment_status}
                    </span>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="rounded-lg bg-blue-50 p-4">
                <div className="flex items-start">
                  <Calendar className="mr-3 mt-1 h-5 w-5 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-blue-700">Payment Deadline</h3>
                    <p className="text-sm text-blue-600">
                      You must complete payment within 7 days of approval to secure your spot.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 space-y-2 rounded-lg bg-gray-100 p-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total Amount:</span>
                  <span>₦{application.room.price ? parseFloat(application.room.price).toLocaleString() : 'N/A'}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 