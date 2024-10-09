import Agenda from "@/features/Agenda";

export default function Home() {
  return (
    <div className="container pt-8">
      <h1 className="pb-4 text-6xl">
        Agenda <small className="text-muted-foreground text-base">(current month)</small>
      </h1>
      <Agenda />
    </div>
  );
}
