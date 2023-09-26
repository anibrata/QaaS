/*

The QRadar Table reads from the server using an API and shows the
data on the dashboard.

*/

import { Component, OnInit, OnDestroy } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
//import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
//import { User, UserColumns } from '../model/user';
import { QradarOffense, QradarOffenseColumns} from '../model/qradaroffense';
//import { UserService } from '../services/user.service';
import { QradarService } from './../service/qradar.service';
import { MatSort, Sort } from '@angular/material/sort';
//import { MatTableModule } from '@angular/material/table';
//import { OffenseList } from '../../offense-list';
import {LiveAnnouncer} from '@angular/cdk/a11y';

import { Subscription, timer } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-qradar-table',
  templateUrl: './qradar-table.component.html',
  styleUrls: ['./qradar-table.component.css']
})

export class QradarTableComponent implements AfterViewInit, OnInit, OnDestroy {
  displayedColumns: string[] = QradarOffenseColumns.map((col) => col.key);
  /* columnsSchema: any = QradarOffenseColumns; */
  columnsSchema = QradarOffenseColumns;
  dataSource = new MatTableDataSource<QradarOffense>();
  valid: any = {};
  originalData: QradarOffense[] = [];
  /* filterSubscription: Subscription | undefined; */

  filterForm: FormGroup; // Add a FormGroup for the filter controls

  subscription !: Subscription; // To implement refresh mat-table

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  /* constructor(public dialog: MatDialog, private qradarservice: QradarService, private _liveAnnouncer: LiveAnnouncer) {} */

  constructor(public dialog: MatDialog, private qradarservice: QradarService, private _liveAnnouncer: LiveAnnouncer) {
    // Initialize the filterForm and create a FormControl for each column
    this.filterForm = new FormGroup({});
    this.columnsSchema.forEach((col: { key: string }) => {
      this.filterForm.addControl(col.key, new FormControl(''));
    });
  }

  // Check if the column is filterable
  /* isFilterable(col: any): boolean {
    return col.filterable != false;
  } */

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Disable sorting for the filter column
    /* const filterColumn = this.QradarOffenseColumns.find(column => column.key === 'filter');
      if (filterColumn) {
        filterColumn.sort = () => {}; // Empty sort function to prevent sorting
      } */
  }

  getOff() {
      this.qradarservice.getOffenses().subscribe((res: any) => {
          this.dataSource.data = res
      });
  }

  ngOnInit() {
    // Subscribe to the filter value changes
    this.filterForm.valueChanges.pipe(
      debounceTime(300), // Add a debounce time to avoid frequent updates
      distinctUntilChanged() // Only update when the filter values change
    ).subscribe(filters => {
      // Apply the filters and update the data source
      this.applyFilters(filters);
    });

    /* this.subscription = timer(0, 3000).pipe(
      switchMap(() => this.qradarservice.getOffenses())
      ).subscribe((res: any) => {
        this.dataSource.data = res
    }); */

    /* The below mentioned subscription is to refresh the mat-table  */
    this.subscription = this.qradarservice.getOffenses().subscribe(
      (res: any) => {
      this.dataSource.data = res;
    });

    // Get the original data
    this.originalData = this.dataSource.data;

    /* this.filterSubscription = this.filterForm.valueChanges.subscribe(() => {
      const filtersEmpty = Object.values(this.filterForm.value).every(value => !value);
      if (filtersEmpty) {
        this.loadAllData();
      }
    }); */
  }

  applyFilters(filters: any): QradarOffense[] {
    // Filter the data based on the filter values
    const filteredData = this.dataSource.data.filter(data => {
      return Object.keys(filters).every(key => {
        const filterValue = filters[key].toLowerCase();
        return String(data[key]).toLowerCase().includes(filterValue);
      });
    });

    // Check if any filters are applied
    const areFiltersApplied = Object.values(filters).some(
      filterValue => filterValue !== '');

    // Update the data source with the filtered data
    this.dataSource.data = filteredData;

    // Update the data source with the filtered data if filters are applied,
    // otherwise, refresh the table with the original data
    this.dataSource.data = areFiltersApplied ? filteredData : this.originalData;

    // Reload the table if no text is present in the filter after a delay of 1ms
    /* if (!areFiltersApplied) {
      setTimeout(() => {
      // Update the data source with the filtered data
      const isFilterTextEmpty = Object.values(filters).every(filterValue => filterValue === '');
      if (isFilterTextEmpty) {
        this.dataSource.data = this.originalData;
      }
    ''}, 1);
    } */
    return this.dataSource.data
  }

  /* applyFilters(filters: any): QradarOffense[] {
    // Filter the data based on the filter values
    const filteredData = this.originalData.filter(data => {
      return Object.keys(filters).every(key => {
        const filterValue = filters[key].toLowerCase();
        const dataValue = String(data[key]).toLowerCase();

        if (filterValue === '') {
          return true; // Skip filtering if the filter value is empty
        }

        return dataValue.includes(filterValue);
      });
    });

    return filteredData;
  } */

  /* applyFilters(filters: any): QradarOffense[] {
    let filteredData = [...this.dataSource.data];

    Object.keys(filters).forEach(key => {
      const filterValue = filters[key].toLowerCase();
      if (filterValue) {
        filteredData = filteredData.filter(data => {
          const dataValue = String(data[key]).toLowerCase();
          return dataValue.includes(filterValue);
        });
      }
    });

    return filteredData;
  } */

  /* applyFilters(filters: any): QradarOffense[] {
    const filterKeys = Object.keys(filters);
    if (filterKeys.length === 0) {
      return this.dataSource.data; // Return original data if no filters are applied
    }

    return this.dataSource.data.filter(data => {
      return filterKeys.every(key => {
        const filterValue = filters[key].toLowerCase();
        const dataValue = String(data[key]).toLowerCase();
        return dataValue.includes(filterValue);
      });
    });
  } */

  getFilterControl(columnKey: string): FormControl {
    return this.filterForm.get(columnKey) as FormControl;
  }

  // The below mentioned function is for the implementation of
  // a refresh button to update the Material Table.
  refresh() {
    /* this.clearFilter(); */
    this.qradarservice.getOffenses().subscribe((res: QradarOffense[])=> {
      this.dataSource.data = res;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    /* if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    } */
  }

  /* Clears filter - used inside refresh table */
  clearFilter() {
    Object.keys(this.filterForm.controls).forEach(key => {
      this.filterForm.controls[key].setValue('');
    });
  }

  /* Clears filter - Calls refresh table at the end */
  /* clearFilterInput() {
    Object.keys(this.filterForm.controls).forEach(key => {
      this.filterForm.controls[key].setValue('');
    }); */
    /* this.refresh();
    // Add the line below to load the original data into the table
    // Get the original data
    // this.dataSource.data = this.originalData;
    this.qradarservice.getOffenses().subscribe((res: QradarOffense[])=> {
      this.dataSource.data = res;
      }); */
  //}

  clearFilterInput() {
    for (const controlName in this.filterForm.controls) {
      if (this.filterForm.controls.hasOwnProperty(controlName)) {
        this.filterForm.controls[controlName].setValue('');
      }
    }
  }

  loadAllData() {
    // Fetch all data and update the table
    this.qradarservice.getOffenses().subscribe((res: any) => {
      this.dataSource.data = res;
    });
  }

  // Format the value of the column as date
  /* formatDate(value: number) {
    const date = new Date(value);
    return date.toLocaleDateString();
  } */

// Format the value of the column as time
  /* formatTime(value: number) {
    const date = new Date(value);
    return date.toLocaleTimeString();
  } */
}


