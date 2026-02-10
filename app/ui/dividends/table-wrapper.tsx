// app/ui/reports/table-wrapper.tsx
import { AddReportRow } from "./add-report-row";
import ReportsTable from "./table";

export default function ReportsPage(props: any) {
  return (
    <div className="space-y-4">
      <ReportsTable {...props} />
      <AddReportRow />
    </div>
  );
}
