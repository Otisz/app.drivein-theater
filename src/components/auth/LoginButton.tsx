"use client";

import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

type Props = {
  className?: string;
};

export default function LoginButton(props: Props) {
  const query = useSearchParams();

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    await signIn("theater", {
      callbackUrl: query.get("callbackUrl") ?? "/",
    });
    setLoading(false);
  };

  return (
    <Button onClick={handleLogin} disabled={loading} size="lg" className={props.className}>
      {loading ? <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> : null}
      <span>Login With Email</span>
    </Button>
  );
}
