import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CsvService {
  constructor() {}

  convertToCSV(data: any) {
    debugger;
    const header = Object.keys(data).join(',');
    const rows = data.map((item: any) => Object.values(item).join(','));
    return `${header}\n${rows.join('\n')}`;
  }

  importCSV(file: File, callback: (result: any[]) => void) {
    const reader = new FileReader();
    reader.onload = () => {
      const result = this.parseCSV(reader.result as string);
      callback(result);
    };
    reader.readAsText(file);
  }

  parseCSV(csv: any) {
    const rows = csv.split('\n');
    const header = rows[0].split(',');
    return rows.slice(1).map((row: any) => {
      const values = row.split(',');
      return header.reduce((obj: any, key: any, index: any) => {
        obj[key.trim()] = values[index].trim();
        return obj;
      }, {});
    });
  }

  exportCSV(data: Record<string, any>, fileName: string) {
    if (typeof data !== 'object' || data === null) {
      console.error('Error: data is not an object');
      return;
    }

    let csv_data = Object.entries(data)
      .map(([key, value]) => `${key},${value}`)
      .join('\n');

    var fileURL = window.URL.createObjectURL(
      new Blob([csv_data], { type: 'text/csv;charset=utf-8;' })
    );
    var fileLink = document.createElement('a');
    fileLink.href = fileURL;
    fileLink.setAttribute('download', fileName);
    document.body.appendChild(fileLink);
    fileLink.click();
    document.body.removeChild(fileLink);
  }
}

// let csv_data = data;
// csv_data = `${csv_data.MAname},${csv_data.shift}`;
// var fileURL = window.URL.createObjectURL(
//   new Blob([csv_data], { type: 'text/csv;charset=utf-8;' })
// );
// var fileLink = document.createElement('a');
// fileLink.href = fileURL;
// fileLink.setAttribute('download', 'test.csv');
// document.body.appendChild(fileLink);
// fileLink.click();
// document.body.removeChild(fileLink);

// const csv = data;
// const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
// const link = document.createElement('a');
// if (link.download != undefined) {
//   const url = URL.createObjectURL(blob);
//   link.setAttribute('href', url);
//   link.setAttribute('download', fileName);
//   link.style.visibility = 'hidden';
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// }
