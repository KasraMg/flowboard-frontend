import DashboardScreen from "@/src/components/screens/dashboard/dashboard-screen";
import { getDashboardData } from "@/src/lib/server-fetches";
import Hydrated from "@/src/providers/hydrated";

const DashboardPage = () => {
  return (
    <Hydrated queryKey={[`dashboard`]} queryFn={getDashboardData}>
      <DashboardScreen />
    </Hydrated>
  );
};

export default DashboardPage;
