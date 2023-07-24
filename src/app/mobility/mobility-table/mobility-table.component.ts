/*

The Mobility Table reads from the server using an API and shows the
data on the dashboard.

*/

import { Component, OnInit, OnDestroy } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
//import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
//import { User, UserColumns } from '../model/user';
import { MobOffense, MobOffenseColumns } from '../model/moboffense';
//import { UserService } from '../services/user.service';
import { MobilityService } from '../services/mobility.service';
import { MatSort, Sort } from '@angular/material/sort';
//import { MatTableModule } from '@angular/material/table';
//import { OffenseList } from '../../offense-list';
import {LiveAnnouncer} from '@angular/cdk/a11y';

import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-mobility-table',
  templateUrl: './mobility-table.component.html',
  styleUrls: ['./mobility-table.component.css']
})
export class MobilityTableComponent implements AfterViewInit, OnInit, OnDestroy {
  displayedColumns: string[] = MobOffenseColumns.map((col) => col.key);
  columnsSchema: any = MobOffenseColumns;
  dataSource = new MatTableDataSource<MobOffense>();
  valid: any = {};

  subscription !: Subscription; // To implement refresh mat-table

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private mobilityService: MobilityService, private _liveAnnouncer: LiveAnnouncer) {}

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }

  getOff() {
    this.mobilityService.getOffenses().subscribe((res: any) => {
      this.dataSource.data = res
    });
  }

  ngOnInit() {
    //this.getOff();
    this.subscription = timer(0, 5000).pipe(
      switchMap(() => this.mobilityService.getOffenses())
      ).subscribe((res: any) => {
      this.dataSource.data = res
    });
  }

  // The below mentioned function is for the implementation of
  // a refresh button to update the Material Table.
  refresh() {
    this.mobilityService.getOffenses().subscribe((res: MobOffense[])=> {
      this.dataSource.data = res;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /** Announce the change in sort state for assistive technology. */
  /*announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }*/
}
