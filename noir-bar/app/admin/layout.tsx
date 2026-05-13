import { AdminNav } from "./AdminNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#111] text-[#F5F5F5]">
      <AdminNav />
      <main className="pb-20">{children}</main>
    </div>
  );
}