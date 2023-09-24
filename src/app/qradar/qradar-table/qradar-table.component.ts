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
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-qradar-table',
  templateUrl: './qradar-table.component.html',
  styleUrls: ['./qradar-table.component.css']
})

export class QradarTableComponent implements AfterViewInit, OnInit, OnDestroy {
  displayedColumns: string[] = QradarOffenseColumns.map((col) => col.key);
  columnsSchema: any = QradarOffenseColumns;
  dataSource = new MatTableDataSource<QradarOffense>();
  valid: any = {};

  subscription !: Subscription; // To implement refresh mat-table

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private qradarservice: QradarService, private _liveAnnouncer: LiveAnnouncer) {}

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }

  getOff() {
      this.qradarservice.getOffenses().subscribe((res: any) => {
          this.dataSource.data = res
      });
  }

  ngOnInit() {
      this.subscription = timer(0, 60000).pipe(
          switchMap(() => this.qradarservice.getOffenses())
          ).subscribe((res: any) => {
          this.dataSource.data = res
      });
  }

  // The below mentioned function is for the implementation of
  // a refresh button to update the Material Table.
  refresh() {
      this.qradarservice.getOffenses().subscribe((res: QradarOffense[])=> {
      this.dataSource.data = res;
      });
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }

  // Format the value of the column as date
  formatDate(value: number) {
    const date = new Date(value);
    return date.toLocaleDateString();
  }

// Format the value of the column as time
  formatTime(value: number) {
    const date = new Date(value);
    return date.toLocaleTimeString();
  }
}


