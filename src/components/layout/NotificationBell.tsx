"use client"

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function NotificationBell({ count = 3 }: { count?: number }) {
  return (
    <div className="relative">
      <Button variant="ghost" size="icon" className="rounded-full">
        <Bell className="h-5 w-5" />
        <span className="sr-only">알림 확인</span>
      </Button>
      {count > 0 && (
        <Badge 
          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-destructive text-destructive-foreground border-2 border-background"
          variant="destructive"
        >
          {count > 9 ? "9+" : count}
        </Badge>
      )}
    </div>
  );
}