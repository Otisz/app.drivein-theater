import { ReactNode } from "react";

export default async function Layout(props: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 items-center">
          <div className="container space-y-4">{props.children}</div>
        </div>
      </div>
    </div>
  );
}
