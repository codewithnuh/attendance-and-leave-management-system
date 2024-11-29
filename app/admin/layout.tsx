import { Header } from "@/components/header";

export default function AdminLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Header userRole="admin" />
      {children}
    </section>
  );
}
