import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <main>
      <h1 className="text-4xl font-semibold">Tasklify</h1>
      <Input placeholder="Enter your task" />
    </main>
  );
}
