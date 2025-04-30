"use client"

import { use } from "react"
import ApplicationDetails from "@/components/admin/application-details"

export default function ApplicationDetailsPage({ params }: { params: { id: string } }) {
  const id = use(params).id;
  return <ApplicationDetails id={id} />
}
