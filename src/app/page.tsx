import MainLayout from "@/components/layouts/main-layout";
import { TypingTest } from "@/components/typing-test";

export default function Home() {
  return (
    <MainLayout>
      <div className="flex-1 flex items-center justify-center py-8">
        <TypingTest />
      </div>
    </MainLayout>
  );
}
