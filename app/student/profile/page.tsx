"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2, Save } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { authService } from '@/lib/services/authService';
import { getSession } from '@/lib/auth';

// Form validation schema
const formSchema = z.object({
  matric_number: z.string().min(5, 'Matric number is required'),
  faculty: z.string().min(1, 'Faculty is required'),
  department: z.string().min(1, 'Department is required'),
  level: z.string().min(1, 'Level is required'),
  gender: z.string().min(1, 'Gender is required'),
  date_of_birth: z.string().min(1, 'Date of birth is required'),
  address: z.string().min(1, 'Address is required'),
  guardian_name: z.string().min(1, 'Guardian name is required'),
  guardian_phone: z.string().min(10, 'Valid guardian phone is required'),
  guardian_email: z.string().email('Please enter a valid email').optional().or(z.literal('')),
  guardian_address: z.string().min(1, 'Guardian address is required'),
  relationship: z.string().min(1, 'Relationship is required'),
});

type FormValues = z.infer<typeof formSchema>;

export default function StudentProfilePage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [studentProfile, setStudentProfile] = useState<any>(null);

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      matric_number: '',
      faculty: '',
      department: '',
      level: '',
      gender: '',
      date_of_birth: '',
      address: '',
      guardian_name: '',
      guardian_phone: '',
      guardian_email: '',
      guardian_address: '',
      relationship: '',
    },
  });

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      const session = await getSession();
      if (!session || !session.isAuthenticated) {
        router.push('/login');
        return;
      }

      try {
        // Load user and student profile data
        const userData = await authService.getCurrentUser();
        setCurrentUser(userData);
        
        try {
          const studentData = await authService.getStudentProfile();
          setStudentProfile(studentData);
          
          // Populate form with existing student data
          if (studentData) {
            form.reset({
              matric_number: studentData.matric_number || '',
              faculty: studentData.faculty || '',
              department: studentData.department || '',
              level: studentData.level || '',
              gender: studentData.gender || '',
              date_of_birth: studentData.date_of_birth ? new Date(studentData.date_of_birth).toISOString().split('T')[0] : '',
              address: studentData.address || '',
              guardian_name: studentData.guardian_name || '',
              guardian_phone: studentData.guardian_phone || '',
              guardian_email: studentData.guardian_email || '',
              guardian_address: studentData.guardian_address || '',
              relationship: studentData.relationship || '',
            });
          }
        } catch (err) {
          // It's okay if profile doesn't exist yet
          console.log('No student profile yet, creating a new one.');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load user data');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, form]);

  async function onSubmit(values: FormValues) {
    try {
      setIsSubmitting(true);
      setError(null);
      setSuccess(null);
      
      // We'll need to call an API endpoint to update the student profile
      // This endpoint needs to be implemented on the backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/accounts/students/update_profile/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await getSession())?.token}`,
        },
        body: JSON.stringify(values),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to update profile');
      }
      
      const updatedProfile = await response.json();
      setStudentProfile(updatedProfile);
      setSuccess('Profile updated successfully!');
      
      // Scroll to top to show success message
      window.scrollTo(0, 0);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="container flex h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#006400]" />
          <p className="mt-2 text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <Card className="mx-auto w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Student Profile</CardTitle>
          <CardDescription>
            {currentUser?.email && (
              <span>Account: {currentUser.username} ({currentUser.email})</span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {success && (
            <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Personal Information</h3>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="matric_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Matric Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your matric number"
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Level</FormLabel>
                        <Select
                          disabled={isSubmitting}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="100">100 Level</SelectItem>
                            <SelectItem value="200">200 Level</SelectItem>
                            <SelectItem value="300">300 Level</SelectItem>
                            <SelectItem value="400">400 Level</SelectItem>
                            <SelectItem value="500">500 Level</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="faculty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Faculty</FormLabel>
                        <Select
                          disabled={isSubmitting}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your faculty" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Engineering">Engineering</SelectItem>
                            <SelectItem value="Science">Science</SelectItem>
                            <SelectItem value="Education">Education</SelectItem>
                            <SelectItem value="Business">Business Administration</SelectItem>
                            <SelectItem value="Art">Art and Design</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your department"
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select
                          disabled={isSubmitting}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="date_of_birth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Home Address</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your home address"
                          className="min-h-[80px]"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Guardian Information</h3>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="guardian_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Guardian Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter guardian's name"
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="relationship"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Relationship</FormLabel>
                        <Select
                          disabled={isSubmitting}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select relationship" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Parent">Parent</SelectItem>
                            <SelectItem value="Guardian">Guardian</SelectItem>
                            <SelectItem value="Sibling">Sibling</SelectItem>
                            <SelectItem value="Relative">Other Relative</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="guardian_phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Guardian Phone</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter guardian's phone"
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="guardian_email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Guardian Email (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter guardian's email"
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="guardian_address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Guardian Address</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter guardian's address"
                          className="min-h-[80px]"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-[#006400] hover:bg-[#006400]/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Profile
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
} 