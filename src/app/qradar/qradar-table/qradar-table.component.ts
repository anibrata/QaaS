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

    /* this.subscription = timer(0, 60000).pipe(
      switchMap(() => this.qradarservice.getOffenses())
      ).subscribe((res: any) => {
        this.dataSource.data = res
    }); */

    /* Load the data into the table when the page loads */
    this.qradarservice.getOffenses().subscribe((res: any) => {
      this.dataSource.data = res;
    });

    // Get the original data
    this.originalData = this.dataSource.data;
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

    // Reload the table if no text is present in the filter after a delay of 0 ms
    if (!areFiltersApplied) {
      setTimeout(() => {
        // Update the data source with the filtered data
        const isFilterTextEmpty = Object.values(filters).every(filterValue => filterValue === '');
        if (isFilterTextEmpty) {
          this.dataSource.data = this.originalData;
          }
      ''}, 0);
      /* // Clear filter input values
      this.clearFilterInput();
      }, 0); */
    }
    return this.dataSource.data
  }

  clearFilterInput() {
    Object.keys(this.filterForm.controls).forEach(key => {
      this.filterForm.controls[key].reset();
    });
    this.refreshTable();
  }

  getFilterControl(columnKey: string): FormControl {
    return this.filterForm.get(columnKey) as FormControl;
  }

  refreshTable() {
    this.qradarservice.getOffenses().subscribe((res: any) => {
      this.dataSource.data = res;
    });
  }

  // The below mentioned function is for the implementation of
  // a refresh button to update the Material Table.
  refresh() {
    // Clear filter input values
    this.clearFilterInput();
    this.qradarservice.getOffenses().subscribe((res: QradarOffense[])=> {
      this.dataSource.data = res;
      });

    // Fetch offenses data
    /* this.qradarservice.getOffenses().subscribe((res: QradarOffense[]) => {
      this.originalData = res; // Store the original data
      this.dataSource.data = res; // Set the data source with the fetched offenses
    }); */
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
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


