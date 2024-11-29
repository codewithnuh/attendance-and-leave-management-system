import { Header } from "@/components/header";

export default function UserLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Header userRole="user" />
      {children}
    </section>
  );
}
