import LoginButton from "@/components/auth/LoginButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentSession } from "@/lib/auth";
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { redirect, RedirectType } from "next/navigation";

type Props = {
  searchParams: {
    callbackUrl?: string;
  };
};

export default async function Page(props: Props) {
  noStore();

  const session = await getCurrentSession();
  if (session !== null) redirect("/", RedirectType.replace);

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <LoginButton className="w-full" />
      </CardContent>
    </Card>
  );
}
