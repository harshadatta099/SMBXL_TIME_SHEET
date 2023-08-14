import React, { useState } from 'react';

import { Button } from 'react-bootstrap';
import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';

const  UserExcel = ({filteredUserRecords})=> {
    console.log(filteredUserRecords);
  const [loading, setLoading] = useState(false);

  const formatDate = dateString => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = String(date.getFullYear()).slice(-2);

    return `${day}-${month}-${year}`;
  };

  const downloadExcel = async () => {
    try {
        setLoading(true);
     

      // Create a new workbook and worksheet
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('TimeSheet');

      // Define cell styles
      const headerStyle = {
        font: { bold: true },
        alignment: { horizontal: 'center' },
        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' } },
      };

      const dataCellStyle = {
        alignment: { horizontal: 'center' },
      };

      const totalRowStyle = {
        font: { bold: true },
        alignment: { horizontal: 'center' },
        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: '00FF00' } },
      };

      // Set column widths
      worksheet.columns = [
        { width: 15 },
        { width: 20 },
        { width: 25 },
        { width: 25 },
        { width: 10 },
        { width: 20 },
      ];

      // Add header row with styles
      worksheet.addRow([
        'User ID',
        'Project Name',
        'Activity Name',
        'Task',
        'Hours',
        'Date',
        
      ]);
      const headerRow = worksheet.getRow(1);
      headerRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        cell.style = headerStyle;
      });

      // Add data rows and calculate total hours
      let totalHours = 0;
      filteredUserRecords.forEach(item => {
        const dataRow = worksheet.addRow([
          item.userId,
          item.projectName,
          item.activityName,
          item.task,
          item.hours,
          formatDate(item.createdDate),
        ]);
        dataRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
          cell.style = dataCellStyle;
        });
        totalHours += item.hours;
      });
      const totalRow = worksheet.addRow([
        'Total Hours', '', '', '',totalHours,'', 
      ]);
      totalRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        cell.style = totalRowStyle;
        if(colNumber === 5) cell.alignment = { horizontal: 'center' };
      });
      // Generate Excel binary data
      const excelBlob = await workbook.xlsx.writeBuffer();

      // Download Excel file
      saveAs(new Blob([excelBlob]), 'timesheet.xlsx');
      setLoading(false);
    } catch (error){
        console.error(error);
        setLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={downloadExcel} disabled={loading}>
        {loading ? 'Downloading...' : 'Download Excel'}
      </Button>
    </div>
  );
}

export default UserExcel;
