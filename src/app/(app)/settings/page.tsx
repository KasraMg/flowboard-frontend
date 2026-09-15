import SettingsScreen from "@/src/components/screens/setting/setting-screen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FlowBoard — Setting",
  icons: "/fav-icon.png",
  description:
    "FlowBoard is a modern project and task management app with boards, lists, calendars, and more.",
};

const SettingsPage = () => {
  return <SettingsScreen />;
};

export default SettingsPage;
