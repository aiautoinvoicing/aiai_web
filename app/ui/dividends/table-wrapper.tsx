// app/ui/reports/table-wrapper.tsx
import { AddReportRow } from "./add-report-row";
import DivTable from "./table";

export default function ReportsPage(props: any) {
  return (
    <div className="space-y-4">
      <DivTable {...props} />
      <AddReportRow />
    </div>
  );
}
