
"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Terminal, Search, Calendar, History, Database } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Event Data
const MOCK_EVENTS = [
  { type: "signup_complete", user: "USER_8821", time: "2026-05-21 14:05:22", payload: "company_name, region, segment" },
  { type: "escrow_deposit_confirmed", user: "ADMIN_ROOT", time: "2026-05-21 13:45:10", payload: "tx_id, amount, status" },
  { type: "contract_created", user: "USER_4401", time: "2026-05-21 12:30:45", payload: "contract_id, buyer, partner" },
  { type: "inspection_approved", user: "USER_2291", time: "2026-05-21 11:15:30", payload: "inspection_id, memo" },
  { type: "dispute_created", user: "USER_1120", time: "2026-05-21 10:00:15", payload: "contract_id, reason" },
  { type: "as_ticket_created", user: "USER_0091", time: "2026-05-21 09:45:00", payload: "ticket_id, priority" },
];

const CHART_DATA = [
  { name: "05-15", signup: 4, escrow: 2, as: 1 },
  { name: "05-16", signup: 3, escrow: 5, as: 2 },
  { name: "05-17", signup: 7, escrow: 3, as: 4 },
  { name: "05-18", signup: 2, escrow: 8, as: 6 },
  { name: "05-19", signup: 5, escrow: 4, as: 3 },
  { name: "05-20", signup: 8, escrow: 6, as: 2 },
  { name: "05-21", signup: 12, escrow: 10, as: 5 },
];

export default function AdminEventsPage() {
  const [filter, setFilter] = useState("all");

  return (
    <div className="space-y-12 pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.3em]">
            <Database className="h-3 w-3" />
            System_Event_Sequence_Log
          </div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic">
            Telemetry <span className="text-primary text-glow">Audit</span>
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-3 glass-panel border-white/10 rounded-none h-[400px]">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-black uppercase tracking-tighter italic">Weekly_Event_Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHART_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="rgba(255,255,255,0.4)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.4)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#02040a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0" }}
                  itemStyle={{ fontSize: "10px", fontWeight: "bold", textTransform: "uppercase" }}
                  labelStyle={{ color: "var(--primary)", fontWeight: "black" }}
                />
                <Bar dataKey="signup" fill="var(--primary)" stackId="a" radius={[0, 0, 0, 0]} />
                <Bar dataKey="escrow" fill="var(--secondary)" stackId="a" />
                <Bar dataKey="as" fill="rgba(255,255,255,0.2)" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-panel border-white/10 rounded-none">
          <CardHeader>
            <CardTitle className="text-xl font-black uppercase tracking-tighter italic">Filter_Nodes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <p className="text-[10px] font-black text-primary uppercase tracking-widest">Event Type</p>
              <Select onValueChange={setFilter} defaultValue="all">
                <SelectTrigger className="bg-background/50 border-white/10 rounded-none h-10 text-[10px] font-black uppercase">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border-white/10 rounded-none">
                  <SelectItem value="all" className="text-[10px]">ALL_EVENTS</SelectItem>
                  <SelectItem value="signup" className="text-[10px]">SIGNUP_COMPLETE</SelectItem>
                  <SelectItem value="escrow" className="text-[10px]">ESCROW_TX</SelectItem>
                  <SelectItem value="as" className="text-[10px]">AS_TICKETS</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-black text-primary uppercase tracking-widest">User ID</p>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 text-white/20" />
                <Input className="pl-9 bg-background/50 border-white/10 rounded-none h-10 text-[10px]" placeholder="Search ID..." />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-black text-primary uppercase tracking-widest">Date Range</p>
              <Button variant="outline" className="w-full h-10 border-white/10 rounded-none text-[10px] font-bold uppercase tracking-widest justify-start">
                <Calendar className="mr-2 h-3 w-3" /> Select Period
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="glass-panel overflow-hidden border-white/10 rounded-none">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-[10px] font-black uppercase text-white/40">Event_Type</TableHead>
              <TableHead className="text-[10px] font-black uppercase text-white/40">Actor</TableHead>
              <TableHead className="text-[10px] font-black uppercase text-white/40">Timestamp</TableHead>
              <TableHead className="text-[10px] font-black uppercase text-white/40">Payload_Manifest</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_EVENTS.map((event, i) => (
              <TableRow key={i} className="border-white/5 hover:bg-white/5 transition-colors">
                <TableCell>
                  <Badge variant="outline" className="rounded-none border-primary/30 text-primary text-[8px] font-black uppercase">
                    {event.type}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono text-[10px] text-white/60">{event.user}</TableCell>
                <TableCell className="font-mono text-[10px] text-white/40">{event.time}</TableCell>
                <TableCell className="text-[10px] text-white/60 font-light italic">
                  {`{ ${event.payload} }`}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
