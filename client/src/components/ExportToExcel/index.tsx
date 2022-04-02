import React from "react";
import Button from "react-bootstrap/Button";
import * as XLSX from "xlsx";

const ExportToExcel: React.FC<{ csvData: any[]; fileName: string }> = ({
  csvData,
  fileName,
}) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const handleExport = () => {
    var wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(csvData);
    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
    XLSX.writeFile(wb, "AccountListFile.xlsx");
  };

  return (
    <Button
      className="me-2"
      size="sm"
      variant="warning"
      onClick={handleExport}
      disabled={csvData.length <= 0}
    >
      Export
    </Button>
  );
};

export default ExportToExcel;
