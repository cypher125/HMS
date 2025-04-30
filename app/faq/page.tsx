"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ChevronRight, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// FAQ data organized by categories
const faqData = {
  application: [
    {
      question: "Who is eligible to apply for hostel accommodation?",
      answer:
        "All full-time students of Yaba College of Technology with a valid matriculation number are eligible to apply for hostel accommodation. Priority is given to freshers, final year students, and students with special needs.",
    },
    {
      question: "When does the application for hostel accommodation open?",
      answer:
        "Hostel applications typically open at the beginning of each academic session, usually 2-3 weeks before resumption. The exact dates are announced on the college website and notice boards.",
    },
    {
      question: "What documents do I need to apply for hostel accommodation?",
      answer:
        "You need your student ID card, admission letter (for freshers), school fees receipt for the current session, and a passport photograph. All documents must be uploaded during the online application process.",
    },
    {
      question: "Can I choose my preferred hostel and room type?",
      answer:
        "Yes, during the application process, you can select your preferred hostel and room type. However, allocation is subject to availability and is done on a first-come, first-served basis.",
    },
    {
      question: "How long does the application process take?",
      answer:
        "The online application process takes about 15-20 minutes to complete. Processing of applications and room allocations typically takes 3-5 working days.",
    },
  ],
  payment: [
    {
      question: "How much are the hostel fees?",
      answer:
        "Hostel fees vary depending on the room type. Standard rooms (4 students) cost ₦50,000, Premium rooms (2 students) cost ₦80,000, and Deluxe rooms (single occupancy) cost ₦120,000 per academic session.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "Payments can be made through the college portal using debit cards, bank transfers, or at designated banks using the generated payment reference number.",
    },
    {
      question: "Is there a deadline for hostel fee payment?",
      answer:
        "Yes, hostel fees must be paid within 48 hours after your application is approved. Failure to pay within this timeframe will result in the cancellation of your allocation.",
    },
    {
      question: "Are there any additional fees apart from the hostel fee?",
      answer:
        "Yes, there is a caution deposit of ₦5,000 which is refundable at the end of your stay if no damages are incurred. Some hostels may also have optional service fees for amenities like laundry.",
    },
    {
      question: "Can I get a refund if I decide not to stay in the hostel?",
      answer:
        "Refunds are only processed in exceptional circumstances and must be applied for within two weeks of payment. A processing fee of 10% is deducted from all approved refunds.",
    },
  ],
  allocation: [
    {
      question: "How are rooms allocated?",
      answer:
        "Rooms are allocated on a first-come, first-served basis after successful payment of hostel fees. Freshers are usually given priority, followed by final year students.",
    },
    {
      question: "Can I choose my roommates?",
      answer:
        "The system does not currently support roommate selection. However, students from the same department and level are often placed together when possible.",
    },
    {
      question: "When will I know my room allocation?",
      answer:
        "Room allocations are typically completed within 3-5 working days after payment confirmation. You will receive a notification via email and on your dashboard.",
    },
    {
      question: "Can I change my room after allocation?",
      answer:
        "Room changes are only permitted in exceptional circumstances and must be approved by the Hall Administrator. A formal application for room change must be submitted.",
    },
    {
      question: "What happens if I'm not satisfied with my room allocation?",
      answer:
        "If you have specific concerns about your allocation, you can contact the Hostel Management Office. However, changes are subject to availability and administrative approval.",
    },
  ],
  facilities: [
    {
      question: "What amenities are provided in the hostels?",
      answer:
        "All hostels are equipped with beds, mattresses, study tables, chairs, and wardrobes/lockers. Common facilities include reading rooms, common rooms, kitchens, laundry areas, and Wi-Fi.",
    },
    {
      question: "Is there Wi-Fi in the hostels?",
      answer:
        "Yes, all hostels have Wi-Fi coverage. The service is included in your hostel fees, but bandwidth limitations may apply during peak usage hours.",
    },
    {
      question: "Are cooking facilities available?",
      answer:
        "Each hostel has a designated kitchen area where cooking is permitted. For safety reasons, cooking is strictly prohibited in the rooms.",
    },
    {
      question: "How often are the hostels cleaned?",
      answer:
        "Common areas like corridors, bathrooms, and kitchens are cleaned daily. Students are responsible for keeping their rooms clean. General cleaning of all areas is done weekly.",
    },
    {
      question: "Is there security in the hostels?",
      answer:
        "Yes, all hostels have 24/7 security personnel. There are also CCTV cameras in common areas, and access to the hostels is restricted to residents only.",
    },
  ],
  rules: [
    {
      question: "What are the hostel curfew hours?",
      answer:
        "Hostel gates close at 10:00 PM and open at 5:30 AM. Students who need to return later must make prior arrangements with the Hall Administrator.",
    },
    {
      question: "Are visitors allowed in the hostels?",
      answer:
        "Visitors are allowed from 8:00 AM to 8:00 PM daily. All visitors must sign in at the security desk and be accompanied by a resident at all times. Overnight visitors are strictly prohibited.",
    },
    {
      question: "Can I bring electrical appliances to the hostel?",
      answer:
        "Small appliances like laptops, phone chargers, and electric kettles are permitted. High-power consuming appliances like electric cookers, irons, and refrigerators are prohibited due to power limitations.",
    },
    {
      question: "What happens if I violate hostel rules?",
      answer:
        "Depending on the severity of the violation, penalties range from verbal warnings to fines, community service, or expulsion from the hostel. Repeated violations may result in disciplinary action by the college.",
    },
    {
      question: "Are there quiet hours in the hostel?",
      answer:
        "Yes, quiet hours are observed from 10:00 PM to 6:00 AM. During this time, noise levels should be kept to a minimum to allow students to rest and study.",
    },
  ],
  checkout: [
    {
      question: "When do I need to vacate the hostel?",
      answer:
        "Students must vacate the hostel within one week after their final examination or by the official closing date for the academic session, whichever comes first.",
    },
    {
      question: "What is the check-out procedure?",
      answer:
        "To check out, you must clear your room of all personal belongings, clean the room, return your room key, and have your room inspected by the Hall Administrator. A clearance form must be signed to complete the process.",
    },
    {
      question: "Can I leave my belongings in the hostel during holidays?",
      answer:
        "No, all personal belongings must be removed during holidays. The college is not responsible for any items left behind after the check-out deadline.",
    },
    {
      question: "How do I get my caution deposit back?",
      answer:
        "After successful check-out and room inspection, your caution deposit will be processed for refund. The amount will be credited to your account within 4-6 weeks after the end of the academic session.",
    },
    {
      question: "What happens if I don't check out properly?",
      answer:
        "Failure to follow the proper check-out procedure may result in forfeiture of your caution deposit and possible sanctions for the next academic session.",
    },
  ],
}

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<{ category: string; items: typeof faqData.application }[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setSearchResults([])
      setHasSearched(false)
      return
    }

    const results: { category: string; items: typeof faqData.application }[] = []

    Object.entries(faqData).forEach(([category, items]) => {
      const filteredItems = items.filter(
        (item) =>
          item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchTerm.toLowerCase()),
      )

      if (filteredItems.length > 0) {
        results.push({
          category: category.charAt(0).toUpperCase() + category.slice(1),
          items: filteredItems,
        })
      }
    })

    setSearchResults(results)
    setHasSearched(true)
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-16">
      {/* Hero Section */}
      <section className="relative bg-[#001F3F] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 font-heading text-3xl font-bold md:text-4xl">Frequently Asked Questions</h1>
            <p className="mb-8 text-lg text-white/90">
              Find answers to common questions about our hostel accommodation system
            </p>

            <div className="relative mx-auto max-w-2xl">
              <Input
                type="text"
                placeholder="Search for questions or keywords..."
                className="h-12 bg-white pl-4 pr-12 text-[#001F3F]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch()
                  }
                }}
              />
              <Button className="absolute right-1 top-1 h-10 bg-[#006400] hover:bg-[#006400]/90" onClick={handleSearch}>
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Search Results */}
        {hasSearched && (
          <div className="mb-12">
            <h2 className="mb-6 font-heading text-2xl font-bold text-[#001F3F]">
              Search Results{" "}
              {searchResults.length > 0 ? `(${searchResults.reduce((acc, curr) => acc + curr.items.length, 0)})` : ""}
            </h2>

            {searchResults.length > 0 ? (
              <div className="space-y-8">
                {searchResults.map((result, index) => (
                  <div key={index}>
                    <h3 className="mb-4 font-heading text-xl font-semibold text-[#001F3F]">{result.category}</h3>
                    <Accordion type="single" collapsible className="w-full">
                      {result.items.map((item, itemIndex) => (
                        <AccordionItem key={itemIndex} value={`search-${index}-${itemIndex}`}>
                          <AccordionTrigger className="text-left font-medium text-[#001F3F]">
                            {item.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-[#424242]">{item.answer}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <HelpCircle className="mb-4 h-12 w-12 text-[#E0E0E0]" />
                  <h4 className="mb-2 font-heading text-lg font-medium text-[#001F3F]">No Results Found</h4>
                  <p className="mb-6 text-[#757575]">
                    We couldn't find any questions matching "{searchTerm}". Please try a different search term or browse
                    the categories below.
                  </p>
                </CardContent>
              </Card>
            )}

            {searchResults.length > 0 && (
              <div className="mt-6 text-center">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setSearchResults([])
                    setHasSearched(false)
                  }}
                >
                  Clear Search Results
                </Button>
              </div>
            )}
          </div>
        )}

        {/* FAQ Categories */}
        {!hasSearched && (
          <Tabs defaultValue="application" className="w-full">
            <TabsList className="mb-8 grid w-full grid-cols-3 md:grid-cols-6">
              <TabsTrigger value="application">Application</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
              <TabsTrigger value="allocation">Allocation</TabsTrigger>
              <TabsTrigger value="facilities">Facilities</TabsTrigger>
              <TabsTrigger value="rules">Rules</TabsTrigger>
              <TabsTrigger value="checkout">Check-out</TabsTrigger>
            </TabsList>

            {/* Application Process */}
            <TabsContent value="application">
              <div className="mb-6">
                <h2 className="mb-4 font-heading text-2xl font-bold text-[#001F3F]">Application Process</h2>
                <p className="text-[#424242]">
                  Find answers to common questions about applying for hostel accommodation at YabaTech.
                </p>
              </div>

              <Accordion type="single" collapsible className="w-full">
                {faqData.application.map((item, index) => (
                  <AccordionItem key={index} value={`application-${index}`}>
                    <AccordionTrigger className="text-left font-medium text-[#001F3F]">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#424242]">{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>

            {/* Payment */}
            <TabsContent value="payment">
              <div className="mb-6">
                <h2 className="mb-4 font-heading text-2xl font-bold text-[#001F3F]">Payment Information</h2>
                <p className="text-[#424242]">
                  Learn about hostel fees, payment methods, deadlines, and refund policies.
                </p>
              </div>

              <Accordion type="single" collapsible className="w-full">
                {faqData.payment.map((item, index) => (
                  <AccordionItem key={index} value={`payment-${index}`}>
                    <AccordionTrigger className="text-left font-medium text-[#001F3F]">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#424242]">{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>

            {/* Room Allocation */}
            <TabsContent value="allocation">
              <div className="mb-6">
                <h2 className="mb-4 font-heading text-2xl font-bold text-[#001F3F]">Room Allocation</h2>
                <p className="text-[#424242]">
                  Understand how rooms are allocated, when you'll receive your allocation, and related policies.
                </p>
              </div>

              <Accordion type="single" collapsible className="w-full">
                {faqData.allocation.map((item, index) => (
                  <AccordionItem key={index} value={`allocation-${index}`}>
                    <AccordionTrigger className="text-left font-medium text-[#001F3F]">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#424242]">{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>

            {/* Facilities */}
            <TabsContent value="facilities">
              <div className="mb-6">
                <h2 className="mb-4 font-heading text-2xl font-bold text-[#001F3F]">Hostel Facilities</h2>
                <p className="text-[#424242]">
                  Discover what amenities and facilities are available in YabaTech hostels.
                </p>
              </div>

              <Accordion type="single" collapsible className="w-full">
                {faqData.facilities.map((item, index) => (
                  <AccordionItem key={index} value={`facilities-${index}`}>
                    <AccordionTrigger className="text-left font-medium text-[#001F3F]">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#424242]">{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>

            {/* Rules and Regulations */}
            <TabsContent value="rules">
              <div className="mb-6">
                <h2 className="mb-4 font-heading text-2xl font-bold text-[#001F3F]">Rules and Regulations</h2>
                <p className="text-[#424242]">
                  Learn about the rules and policies that govern hostel life at YabaTech.
                </p>
              </div>

              <Accordion type="single" collapsible className="w-full">
                {faqData.rules.map((item, index) => (
                  <AccordionItem key={index} value={`rules-${index}`}>
                    <AccordionTrigger className="text-left font-medium text-[#001F3F]">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#424242]">{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>

            {/* Check-out Process */}
            <TabsContent value="checkout">
              <div className="mb-6">
                <h2 className="mb-4 font-heading text-2xl font-bold text-[#001F3F]">Check-out Process</h2>
                <p className="text-[#424242]">
                  Find information about vacating the hostel, check-out procedures, and deposit refunds.
                </p>
              </div>

              <Accordion type="single" collapsible className="w-full">
                {faqData.checkout.map((item, index) => (
                  <AccordionItem key={index} value={`checkout-${index}`}>
                    <AccordionTrigger className="text-left font-medium text-[#001F3F]">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#424242]">{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          </Tabs>
        )}

        {/* Still Have Questions */}
        <div className="mt-16">
          <Card className="bg-[#F0FFF0] border-[#006400]">
            <CardHeader>
              <CardTitle className="text-center text-[#001F3F]">Still Have Questions?</CardTitle>
              <CardDescription className="text-center">
                If you couldn't find the answer to your question, please contact us.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-6 text-[#424242]">
                Our hostel management team is available to assist you with any inquiries or concerns you may have.
              </p>
              <Button className="bg-[#006400] hover:bg-[#006400]/90" asChild>
                <Link href="/contact">
                  Contact Us <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
