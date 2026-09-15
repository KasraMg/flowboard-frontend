import DashboardScreen from "@/src/components/screens/dashboard/dashboard-screen";
import { getDashboardData } from "@/src/lib/server-fetches";
import Hydrated from "@/src/providers/hydrated";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FlowBoard — Dashboard",
  icons: "/fav-icon.png",
  description:
    "FlowBoard is a modern project and task management app with boards, lists, calendars, and more.",
};

const DashboardPage = () => {
  return (
    <Hydrated queryKey={[`dashboard`]} queryFn={getDashboardData}>
      <DashboardScreen />
    </Hydrated>
  );
};

export default DashboardPage;
