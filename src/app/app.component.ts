import { Component, OnInit } from '@angular/core';
import { CsvService } from './services/csv.service';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private csvService: CsvService,
    private dataService: DataService
  ) {}
  title = 'selfplanning';

  dayTime = ['07:00', '19:30Uhr'];

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.csvService.exportCSV(file, 'csv');
    }
  }

  exportData() {
    let data;
    if (this.isclicked) {
      data = { MAname: 'name1', shift: '08:00Uhr' };
    } else {
      data = { MAname: 'name1', shift: 'no shift' };
    }
    this.csvService.exportCSV(data, 'test');
    this.dataService.saveData(data).subscribe((testData: any) => {
      console.log('testData');
    });
  }

  isclicked = false;

  bookShift() {
    this.isclicked = !this.isclicked;
    console.log(this.isclicked);
    
    this.dataService.getData().subscribe((data: any) => {
      console.log('data', data);
    });
  }

  ngOnInit(): void {}
}
