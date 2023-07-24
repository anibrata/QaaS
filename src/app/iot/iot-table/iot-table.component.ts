/*

The IOT Table reads from the server using an API and shows the
data on the dashboard.

*/

import { Component, OnInit, OnDestroy } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
//import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
//import { User, UserColumns } from '../model/user';
import { IotOffense, IotOffenseColumns } from '../model/iotoffense';
//import { UserService } from '../services/user.service';
import { IotService } from './../service/iot.service';
import { MatSort, Sort } from '@angular/material/sort';
//import { MatTableModule } from '@angular/material/table';
//import { OffenseList } from '../../offense-list';
import {LiveAnnouncer} from '@angular/cdk/a11y';

import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-iot-table',
  templateUrl: './iot-table.component.html',
  styleUrls: ['./iot-table.component.css']
})
export class IotTableComponent implements AfterViewInit, OnInit, OnDestroy {
    displayedColumns: string[] = IotOffenseColumns.map((col) => col.key);
    columnsSchema: any = IotOffenseColumns;
    dataSource = new MatTableDataSource<IotOffense>();
    valid: any = {};

    subscription !: Subscription; // To implement refresh mat-table

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(public dialog: MatDialog, private iotservice: IotService, private _liveAnnouncer: LiveAnnouncer) {}

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    getOff() {
        this.iotservice.getOffenses().subscribe((res: any) => {
            this.dataSource.data = res
        });
    }

    ngOnInit() {
        this.subscription = timer(0, 5000).pipe(
            switchMap(() => this.iotservice.getOffenses())
            ).subscribe((res: any) => {
            this.dataSource.data = res
        });
    }

    // The below mentioned function is for the implementation of
    // a refresh button to update the Material Table.
    refresh() {
        this.iotservice.getOffenses().subscribe((res: IotOffense[])=> {
        this.dataSource.data = res;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }


}
