import { redirect } from "next/navigation";
import { getUser } from "../lib/server-fetches";

export async function AuthGuard({ children }: { children: React.ReactNode }) {
  await getUser().then((data) => {
    if (!data?.data?.user) {
      // redirect("/");
    }
  });

  return children;
}
