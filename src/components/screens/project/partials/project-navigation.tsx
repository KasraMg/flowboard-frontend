"use client";

import {
  Activity,
  Calendar,
  LayoutDashboard,
  List,
  Settings,
} from "lucide-react";

import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/tabs";

type Props = {
  activeTab: string;
  onTabChange: (value: string) => void;
};

export function ProjectNavigation({ activeTab, onTabChange }: Props) {
  return (
    <div className="shrink-0 border-b px-4 py-3 md:px-6">
      <Tabs value={activeTab} onValueChange={onTabChange}>
        <TabsList>
          <TabsTrigger value="board" className="gap-1.5">
            <LayoutDashboard className="h-3.5 w-3.5" />
            Board
          </TabsTrigger>

          <TabsTrigger value="list" className="gap-1.5">
            <List className="h-3.5 w-3.5" />
            List
          </TabsTrigger>

          <TabsTrigger value="calendar" className="gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            Calendar
          </TabsTrigger>

          <TabsTrigger value="activity" className="gap-1.5">
            <Activity className="h-3.5 w-3.5" />
            Activity
          </TabsTrigger>

          <TabsTrigger value="settings" className="gap-1.5">
            <Settings className="h-3.5 w-3.5" />
            Settings
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
