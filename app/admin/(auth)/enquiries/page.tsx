"use client";

import { useState, useEffect } from "react";
import {
  Trash2,
  Mail,
  Check,
  X,
  Search,
  ChevronLeft,
  ChevronRight,
  Plus,
  User,
  DollarSign,
  Calendar,
  ArrowRight,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "proposal"
  | "won"
  | "lost";

interface Enquiry {
  _id: string;
  _creationTime: number;
  name: string;
  email: string;
  message?: string;
  notes?: string;
  status?: LeadStatus;
  source?: string;
  value?: number;
  followUpDate?: number;
  createdAt: number;
  updatedAt: number;
}

interface EnquiryResponse {
  enquiries: Enquiry[];
  continueCursor: string | null;
  hasMore: boolean;
}

const STATUS_CONFIG: {
  status: LeadStatus;
  label: string;
  color: string;
  bgColor: string;
}[] = [
  {
    status: "new",
    label: "New",
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
  {
    status: "contacted",
    label: "Contacted",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    status: "qualified",
    label: "Qualified",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    status: "proposal",
    label: "Proposal",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    status: "won",
    label: "Won",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    status: "lost",
    label: "Lost",
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
];

const SOURCE_OPTIONS = [
  "Website",
  "Referral",
  "Social Media",
  "Email",
  "Phone",
  "Other",
];

export default function LeadsPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [notesValues, setNotesValues] = useState<Record<string, string>>({});
  const [editingDetails, setEditingDetails] = useState<string | null>(null);
  const [leadDetails, setLeadDetails] = useState<
    Record<string, { source: string; value: string; followUpDate: string }>
  >({});
  const [search, setSearch] = useState("");
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [filterStatus, setFilterStatus] = useState<LeadStatus | "all">("all");

  const fetchEnquiries = (
    searchQuery: string,
    cursorParam: string | null = null,
  ) => {
    setLoading(true);
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (cursorParam) params.set("cursor", cursorParam);
    params.set("limit", "20");

    fetch(`/api/enquiries?${params.toString()}`)
      .then((res) => res.json())
      .then((data: EnquiryResponse) => {
        setEnquiries(data.enquiries || []);
        setCursor(data.continueCursor);
        setHasMore(data.hasMore);
        const notesMap: Record<string, string> = {};
        const detailsMap: Record<
          string,
          { source: string; value: string; followUpDate: string }
        > = {};
        (data.enquiries || []).forEach((e: Enquiry) => {
          notesMap[e._id] = e.notes || "";
          detailsMap[e._id] = {
            source: e.source || "",
            value: e.value?.toString() || "",
            followUpDate: e.followUpDate
              ? new Date(e.followUpDate).toISOString().split("T")[0]
              : "",
          };
        });
        setNotesValues(notesMap);
        setLeadDetails(detailsMap);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchEnquiries(search);
  }, []);

  const handleSearch = (value: string) => {
    setSearch(value);
    if (searchTimeout) clearTimeout(searchTimeout);
    const timeout = setTimeout(() => {
      fetchEnquiries(value);
    }, 300);
    setSearchTimeout(timeout);
  };

  const handleNextPage = () => {
    if (cursor && hasMore) {
      fetchEnquiries(search, cursor);
    }
  };

  const handlePrevPage = () => {
    fetchEnquiries(search, null);
  };

  const handleStatusChange = async (id: string, status: LeadStatus) => {
    await fetch("/api/enquiries/update-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setEnquiries((prev) =>
      prev.map((e) =>
        e._id === id ? { ...e, status, updatedAt: Date.now() } : e,
      ),
    );
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this lead?")) {
      await fetch("/api/enquiries/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setEnquiries((prev) => prev.filter((e) => e._id !== id));
    }
  };

  const handleSaveNotes = async (id: string) => {
    const notes = notesValues[id] || "";
    await fetch("/api/enquiries/update-notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, notes }),
    });
    setEnquiries((prev) =>
      prev.map((e) =>
        e._id === id ? { ...e, notes, updatedAt: Date.now() } : e,
      ),
    );
    setEditingNotes(null);
  };

  const handleSaveDetails = async (id: string) => {
    const details = leadDetails[id];
    await fetch("/api/enquiries/update-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        source: details.source || undefined,
        value: details.value ? parseFloat(details.value) : undefined,
        followUpDate: details.followUpDate
          ? new Date(details.followUpDate).getTime()
          : undefined,
      }),
    });
    setEnquiries((prev) =>
      prev.map((e) =>
        e._id === id
          ? {
              ...e,
              source: details.source || undefined,
              value: details.value ? parseFloat(details.value) : undefined,
              followUpDate: details.followUpDate
                ? new Date(details.followUpDate).getTime()
                : undefined,
              updatedAt: Date.now(),
            }
          : e,
      ),
    );
    setEditingDetails(null);
  };

  const getStatusConfig = (status: LeadStatus) => {
    return STATUS_CONFIG.find((s) => s.status === status) || STATUS_CONFIG[0];
  };

  const filteredEnquiries =
    filterStatus === "all"
      ? enquiries
      : enquiries.filter((e) => e.status === filterStatus);

  const statusCounts = STATUS_CONFIG.reduce(
    (acc, s) => {
      acc[s.status] = enquiries.filter(
        (e) => (e.status || "new") === s.status,
      ).length;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold font-display tracking-tighter uppercase">
            Lead Pipeline
          </h1>
          <div className="text-sm text-muted-foreground">
            {filteredEnquiries.length}{" "}
            {filteredEnquiries.length === 1 ? "lead" : "leads"}
          </div>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 font-mono  tracking-tighter">
          <Button
            className="rounded-none uppercase"
            variant={filterStatus === "all" ? "default" : "outline"}
            size="xs"
            onClick={() => setFilterStatus("all")}
          >
            All
          </Button>
          {STATUS_CONFIG.map((s) => (
            <Button
              key={s.status}
              variant={filterStatus === s.status ? "default" : "outline"}
              size="xs"
              onClick={() => setFilterStatus(s.status)}
              className={`${s.bgColor} ${s.color} hover:${s.bgColor} rounded-none uppercase`}
            >
              {s.label}
              <span className="ml-1 opacity-70">
                ({statusCounts[s.status] || 0})
              </span>
            </Button>
          ))}
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 rounded-none transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search leads by name, email, message, or notes..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 rounded-none"
            />
          </div>
        </div>

        <div className="grid gap-4">
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">
              Loading...
            </div>
          ) : filteredEnquiries.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No leads found
            </div>
          ) : (
            filteredEnquiries.map((enquiry) => {
              const statusConfig = getStatusConfig(enquiry.status || "new");
              return (
                <div
                  key={enquiry._id}
                  className="border rounded-none p-4 bg-card hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="text-lg font-semibold">
                          {enquiry.name}
                        </h3>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs text-white ${statusConfig.bgColor} ${statusConfig.color.replace("text-", "bg-")}`}
                        >
                          {statusConfig.label}
                        </span>
                        {enquiry.value && (
                          <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />
                            {enquiry.value.toLocaleString()}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-muted-foreground mb-2 flex-wrap">
                        <Mail className="w-4 h-4" />
                        <a
                          href={`mailto:${enquiry.email}`}
                          className="hover:underline"
                        >
                          {enquiry.email}
                        </a>
                        {enquiry.source && (
                          <>
                            <span className="mx-1">•</span>
                            <span className="text-sm">{enquiry.source}</span>
                          </>
                        )}
                      </div>

                      {enquiry.message && (
                        <p className="text-sm mt-3 p-3 bg-muted rounded-md">
                          {enquiry.message}
                        </p>
                      )}

                      <div className="flex gap-2 mt-3 flex-wrap">
                        {enquiry.followUpDate && (
                          <span className="text-xs flex items-center gap-1 text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            Follow-up:{" "}
                            {new Date(
                              enquiry.followUpDate,
                            ).toLocaleDateString()}
                          </span>
                        )}
                      </div>

                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs font-medium text-muted-foreground">
                            Notes
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              if (editingNotes === enquiry._id) {
                                handleSaveNotes(enquiry._id);
                              } else {
                                setEditingNotes(enquiry._id);
                              }
                            }}
                          >
                            {editingNotes === enquiry._id ? "Save" : "Add"}
                          </Button>
                        </div>
                        {editingNotes === enquiry._id ? (
                          <textarea
                            value={notesValues[enquiry._id] || ""}
                            onChange={(e) =>
                              setNotesValues((prev) => ({
                                ...prev,
                                [enquiry._id]: e.target.value,
                              }))
                            }
                            placeholder="Add your notes here..."
                            className="w-full p-2 text-sm border rounded-md bg-background min-h-[80px]"
                            autoFocus
                          />
                        ) : (
                          <p
                            className="text-sm p-2 border rounded-md bg-muted/50 min-h-[40px] cursor-pointer hover:bg-muted"
                            onClick={() => setEditingNotes(enquiry._id)}
                          >
                            {enquiry.notes || (
                              <span className="text-muted-foreground italic">
                                Click to add notes...
                              </span>
                            )}
                          </p>
                        )}
                      </div>

                      <p className="text-xs text-muted-foreground mt-3">
                        Received: {new Date(enquiry.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 ml-4">
                      <p className="text-xs font-medium text-muted-foreground mb-1">
                        Stage
                      </p>
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {STATUS_CONFIG.map((s, idx) => (
                          <Button
                            key={s.status}
                            variant={
                              enquiry.status === s.status ? "default" : "ghost"
                            }
                            size="sm"
                            className={`text-xs px-2 py-0.5 ${s.status === enquiry.status ? s.bgColor : ""}`}
                            onClick={() =>
                              handleStatusChange(enquiry._id, s.status)
                            }
                            title={s.label}
                          >
                            {s.status === "won" ? (
                              <Star className="w-3 h-3" />
                            ) : s.status === "lost" ? (
                              <X className="w-3 h-3" />
                            ) : (
                              idx + 1
                            )}
                          </Button>
                        ))}
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2"
                        onClick={() => {
                          if (editingDetails === enquiry._id) {
                            handleSaveDetails(enquiry._id);
                          } else {
                            setEditingDetails(enquiry._id);
                          }
                        }}
                      >
                        {editingDetails === enquiry._id
                          ? "Save Details"
                          : "Edit Details"}
                      </Button>

                      {editingDetails === enquiry._id && (
                        <div className="p-2 border rounded-md bg-background space-y-2">
                          <div>
                            <Label className="text-xs">Source</Label>
                            <select
                              value={leadDetails[enquiry._id]?.source || ""}
                              onChange={(e) =>
                                setLeadDetails((prev) => ({
                                  ...prev,
                                  [enquiry._id]: {
                                    ...prev[enquiry._id],
                                    source: e.target.value,
                                  },
                                }))
                              }
                              className="w-full text-sm p-1 border rounded"
                            >
                              <option value="">Select source</option>
                              {SOURCE_OPTIONS.map((src) => (
                                <option key={src} value={src}>
                                  {src}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <Label className="text-xs">Value ($)</Label>
                            <Input
                              type="number"
                              value={leadDetails[enquiry._id]?.value || ""}
                              onChange={(e) =>
                                setLeadDetails((prev) => ({
                                  ...prev,
                                  [enquiry._id]: {
                                    ...prev[enquiry._id],
                                    value: e.target.value,
                                  },
                                }))
                              }
                              placeholder="0"
                              className="h-8"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Follow-up</Label>
                            <Input
                              type="date"
                              value={
                                leadDetails[enquiry._id]?.followUpDate || ""
                              }
                              onChange={(e) =>
                                setLeadDetails((prev) => ({
                                  ...prev,
                                  [enquiry._id]: {
                                    ...prev[enquiry._id],
                                    followUpDate: e.target.value,
                                  },
                                }))
                              }
                              className="h-8"
                            />
                          </div>
                        </div>
                      )}

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(enquiry._id)}
                        className="text-red-500 hover:text-red-700 mt-2"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="flex items-center justify-between mt-6">
          <Button variant="outline" onClick={handlePrevPage} disabled={!cursor}>
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={handleNextPage}
            disabled={!hasMore}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
