import GenerateReportCard from "@/components/admin/GenerateReportCard";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Reports() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Generate Reports</CardTitle>
            <CardDescription>
              Create attendance and leave reports
            </CardDescription>
          </CardHeader>
          <GenerateReportCard />
        </Card>
      </main>
    </div>
  );
}
