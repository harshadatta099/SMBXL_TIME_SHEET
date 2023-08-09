import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { saveAs } from "file-saver";
import ExcelJS from "exceljs";

const Excel = ({ records, rateCard }) => {
  const [loading, setLoading] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${day}-${month}-${year}`;
  };

  const downloadExcel = async () => {
    try {
      setLoading(true);

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("TimeSheet");

      const headerStyle = {
        font: { bold: true },
        alignment: { horizontal: "center" },
        fill: { type: "pattern", pattern: "solid", fgColor: { argb: "FFFF00" } },
      };

      const dataCellStyle = { alignment: { horizontal: "center" } };

      const totalRowStyle = {
        font: { bold: true },
        alignment: { horizontal: "center" },
        fill: { type: "pattern", pattern: "solid", fgColor: { argb: "00FF00" } },
      };

      worksheet.columns = [
        { width: 15 },
        { width: 20 },
        { width: 25 },
        { width: 25 },
        { width: 10 },
        { width: 20 },
      ];

      worksheet.addRow([
        "User ID",
        "Project Name",
        "Activity Name",
        "Task",
        "Hours",
        "Date",
        "RateCard",
        "Invoice",
      ]);
      const headerRow = worksheet.getRow(1);
      headerRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        cell.style = headerStyle;
      });

      let totalHours = 0;
      let totalRateCard = 0;
      let totalInvoice = 0;
      records.forEach((item) => {
        const dataRow = worksheet.addRow([
          item.userId,
          item.projectName,
          item.activityName,
          item.task,
          item.hours,
          formatDate(item.createdDate),
          rateCard,
          item.hours * rateCard,
        ]);
        dataRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
          cell.style = dataCellStyle;
        });
        totalHours += item.hours;
        const invoiceValue = item.hours * rateCard;
        totalRateCard += rateCard;
        totalInvoice += invoiceValue;
      });

      const totalRow = worksheet.addRow([
        "Total Hours",
        "",
        "",
        "",
        totalHours,
        "",
        "",
        "",
      ]);
      const totalRateCardRow = worksheet.addRow([
        "Total RateCard",
        "",
        "",
        "",
        "",
        "",
        totalRateCard,
        "",
      ]);
      const totalInvoiceRow = worksheet.addRow([
        "Total Invoice",
        "",
        "",
        "",
        "",
        "",
        "",
        totalInvoice,
      ]);

      totalRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        cell.style = totalRowStyle;
        if (colNumber === 5) cell.alignment = { horizontal: "center" };
      });
      totalRateCardRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        cell.style = totalRowStyle;
        if (colNumber === 7) cell.alignment = { horizontal: "center" };
      });
      totalInvoiceRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        cell.style = totalRowStyle;
        if (colNumber === 8) cell.alignment = { horizontal: "center" };
        cell.border = {
          top: { style: "thin" },
          bottom: { style: "thin" },
          left: { style: "thin" },
          right: { style: "thin" },
        };
      });

      const excelBlob = await workbook.xlsx.writeBuffer();
      saveAs(new Blob([excelBlob]), "timesheet.xlsx");
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={downloadExcel} disabled={loading}>
        {loading ? "Downloading..." : "Download Excel"}
      </Button>
    </div>
  );
};

export default Excel;
