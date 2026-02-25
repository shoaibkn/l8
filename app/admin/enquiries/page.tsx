"use client";

import { useQuery, useMutation } from "convex/react";
import { useState } from "react";
import { Trash2, Mail, Check, X, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Enquiry {
  _id: string;
  _creationTime: number;
  name: string;
  email: string;
  message?: string;
  status?: "new" | "contacted" | "closed";
  createdAt: number;
  updatedAt: number;
}

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useState(() => {
    fetch("/api/enquiries")
      .then((res) => res.json())
      .then((data) => {
        setEnquiries(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  });

  const handleStatusChange = async (id: string, status: "new" | "contacted" | "closed") => {
    await fetch("/api/enquiries/update-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setEnquiries((prev) =>
      prev.map((e) => (e._id === id ? { ...e, status, updatedAt: Date.now() } : e))
    );
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this enquiry?")) {
      await fetch("/api/enquiries/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setEnquiries((prev) => prev.filter((e) => e._id !== id));
    }
  };

  const statusColors: Record<string, string> = {
    new: "bg-yellow-500",
    contacted: "bg-blue-500",
    closed: "bg-green-500",
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Enquiries</h1>
          <div className="text-sm text-muted-foreground">
            Total: {enquiries.length} enquiries
          </div>
        </div>

        <div className="grid gap-4">
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Loading...</div>
          ) : enquiries.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No enquiries yet
            </div>
          ) : (
            enquiries.map((enquiry) => (
              <div
                key={enquiry._id}
                className="border rounded-lg p-6 bg-card hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{enquiry.name}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs text-white ${statusColors[enquiry.status || "new"]}`}>
                        {enquiry.status || "new"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Mail className="w-4 h-4" />
                      <a href={`mailto:${enquiry.email}`} className="hover:underline">
                        {enquiry.email}
                      </a>
                    </div>
                    {enquiry.message && (
                      <p className="text-sm mt-3 p-3 bg-muted rounded-md">
                        {enquiry.message}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-3">
                      Received: {new Date(enquiry.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleStatusChange(enquiry._id, "new")}
                        title="Mark as new"
                      >
                        <Clock className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleStatusChange(enquiry._id, "contacted")}
                        title="Mark as contacted"
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleStatusChange(enquiry._id, "closed")}
                        title="Mark as closed"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(enquiry._id)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
