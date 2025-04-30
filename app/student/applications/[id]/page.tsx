"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  Building2, 
  Calendar, 
  CheckCircle, 
  Clock, 
  CreditCard, 
  Download, 
  FileText, 
  Loader2, 
  User 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/context/AuthContext";
import { applicationService } from "@/lib/services/applicationService";
import { Application, Payment } from "@/lib/services/applicationService";
import { formatDate } from "@/lib/utils";

export default function ApplicationDetailPage() {
  const router = useRouter();
  const params = useParams();
  const applicationId = params?.id as string;
  const { user } = useAuth();
  const [application, setApplication] = useState<Application | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
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
        const appData = await applicationService.getApplicationById(numericId);
        setApplication(appData);
        
        // Fetch payments related to this application
        try {
          const paymentData = await applicationService.getPaymentsByApplicationId(numericId);
          setPayments(Array.isArray(paymentData) ? paymentData : []);
        } catch (err) {
          console.log("No payments found for this application");
          setPayments([]);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load application details");
        console.error("Application loading error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [applicationId]);

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

  if (error || !application) {
    return (
      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-8">
        <Card className="mx-auto max-w-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-bold text-red-600">Error Loading Application</CardTitle>
            <CardDescription>
              {error || `Application #${applicationId || 'undefined'} was not found. Please check the application ID and try again.`}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button asChild variant="outline">
              <Link href="/student/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Calculate progress based on application status
  const getProgress = () => {
    if (application.status === 'Approved' && application.payment_status === 'Paid') {
      return 100;
    } else if (application.status === 'Approved' && application.payment_status === 'Partially Paid') {
      return 75;
    } else if (application.status === 'Approved' && application.payment_status === 'Unpaid') {
      return 60;
    } else if (application.status === 'Pending') {
      return 30;
    }
    return 0;
  };

  // Get status badge variant
  const getStatusBadgeVariant = () => {
    switch (application.status) {
      case 'Approved': return 'default';
      case 'Rejected': return 'destructive';
      case 'Cancelled': return 'outline';
      default: return 'secondary';
    }
  };

  // Get payment badge variant
  const getPaymentBadgeVariant = () => {
    switch (application.payment_status) {
      case 'Paid': return 'default';
      case 'Partially Paid': return 'secondary';
      case 'Refunded': return 'outline';
      default: return 'destructive';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button asChild variant="outline" size="sm" className="mb-4">
          <Link href="/student/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-2xl font-bold md:text-3xl">Application APP-{application.id}</h1>
        <p className="text-muted-foreground">Submitted on {formatDate(application.application_date)}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Application Details */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Application Details</CardTitle>
                <Badge variant={getStatusBadgeVariant()}>{application.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 font-medium">Status</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span>Application Progress</span>
                        <span>{getProgress()}%</span>
                      </div>
                      <Progress value={getProgress()} className="h-2" />
                    </div>
                    
                    <div className="rounded-lg bg-muted/50 p-4">
                      <div className="flex">
                        <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                          {application.status === 'Approved' ? (
                            <CheckCircle className="h-4 w-4 text-primary" />
                          ) : (
                            <Clock className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">
                            {application.status === 'Approved' 
                              ? 'Application Approved' 
                              : application.status === 'Rejected'
                                ? 'Application Rejected'
                                : application.status === 'Cancelled'
                                  ? 'Application Cancelled'
                                  : 'Application Under Review'}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {application.status === 'Approved' 
                              ? 'Your application has been approved. Please proceed with payment to secure your accommodation.'
                              : application.status === 'Rejected'
                                ? 'Unfortunately, your application was not approved. Please check the review notes or contact support.'
                                : application.status === 'Cancelled'
                                  ? 'You cancelled this application.'
                                  : 'Your application is currently being reviewed by the hostel administration team.'}
                          </p>
                          {application.review_date && (
                            <p className="mt-2 text-xs text-muted-foreground">
                              Reviewed on {formatDate(application.review_date)}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      {application.review_notes && (
                        <div className="mt-4 rounded border p-3 text-sm">
                          <p className="font-medium">Review Notes:</p>
                          <p className="mt-1 text-muted-foreground">{application.review_notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="mb-4 font-medium">Room Information</h3>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-start gap-4">
                      <Building2 className="mt-1 h-8 w-8 text-primary" />
                      <div className="flex-1">
                        <p className="font-medium">
                          {typeof application.room === 'object' 
                            ? application.room.hostel_name || application.room.hostel
                            : 'Hostel'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {typeof application.room === 'object' 
                            ? `Room ${application.room.room_number}, ${application.room.room_type} (${application.room.capacity} bed)`
                            : `Room ID: ${application.room}`}
                        </p>
                        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Floor</p>
                            <p className="font-medium">
                              {typeof application.room === 'object' && application.room.floor 
                                ? application.room.floor 
                                : 'N/A'}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Price</p>
                            <p className="font-medium">
                              {typeof application.room === 'object' && application.room.price 
                                ? `₦${application.room.price}` 
                                : application.payment_amount 
                                  ? `₦${application.payment_amount}` 
                                  : 'N/A'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {application.special_requests && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="mb-2 font-medium">Special Requests</h3>
                      <div className="rounded-lg border p-4">
                        <p className="text-sm text-muted-foreground">{application.special_requests}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Payment Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Payment</CardTitle>
                <Badge variant={getPaymentBadgeVariant()}>{application.payment_status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg bg-muted/50 p-4">
                  <div className="mb-4 flex items-center space-x-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <span className="font-medium">Payment Summary</span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Room Fee:</span>
                      <span>
                        {typeof application.room === 'object' && application.room.price 
                          ? `₦${application.room.price}` 
                          : application.payment_amount 
                            ? `₦${application.payment_amount}` 
                            : 'N/A'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amount Paid:</span>
                      <span>
                        {payments.length > 0 
                          ? `₦${payments.reduce((sum, p) => sum + parseFloat(p.amount), 0).toFixed(2)}` 
                          : '₦0.00'}
                      </span>
                    </div>
                    
                    <Separator className="my-2" />
                    
                    <div className="flex justify-between font-medium">
                      <span>Remaining:</span>
                      <span className={application.payment_status === 'Paid' ? 'text-green-600' : 'text-red-600'}>
                        {application.remaining_amount !== undefined 
                          ? `₦${application.remaining_amount}` 
                          : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
                
                {payments.length > 0 ? (
                  <div>
                    <h3 className="mb-2 text-sm font-medium">Payment History</h3>
                    <div className="space-y-3">
                      {payments.map((payment) => (
                        <div key={payment.id} className="rounded-lg border p-3 text-sm">
                          <div className="flex justify-between">
                            <span className="font-medium">₦{payment.amount}</span>
                            <Badge variant="outline">{payment.status}</Badge>
                          </div>
                          <div className="mt-1 text-xs text-muted-foreground">
                            <p>Ref: {payment.reference}</p>
                            <p>Method: {payment.payment_method}</p>
                            <p>Date: {formatDate(payment.created_at)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed p-4 text-center">
                    <p className="text-sm text-muted-foreground">No payment records found</p>
                  </div>
                )}
                
                {application.status === 'Approved' && application.payment_status !== 'Paid' && (
                  <Button className="w-full bg-[#006400] hover:bg-[#006400]/90">
                    <Link href={`/student/applications/${application.id}/payment`} className="flex w-full items-center justify-center">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Make Payment
                    </Link>
                  </Button>
                )}
                
                {application.status === 'Approved' && application.payment_status === 'Paid' && (
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download Receipt
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Application Form
                </Button>
                
                {application.status === 'Approved' && (
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    Allocation Letter
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 