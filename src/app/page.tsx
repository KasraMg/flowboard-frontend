import { redirect } from "next/navigation";
import LandingScreen from "../components/screens/landing/landing-screen";
import { getUser } from "../lib/server-fetches";

export default async function Home() {
  const user = await getUser();
  if (user) {
    redirect("/dashboard");
  }
  return <LandingScreen />;
}
