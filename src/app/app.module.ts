import { IotTableComponent } from './iot/iot-table/iot-table.component';
import { MobilityModule } from './mobility/mobility.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
//import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MobilityTableComponent } from './mobility/mobility-table/mobility-table.component';
import { MatSortModule } from '@angular/material/sort';
import { DropdownComponent } from './dropdown/dropdown.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatCheckboxModule,
    MatDialogModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTabsModule,
    MatSortModule,
    MobilityModule
  ],
  declarations: [AppComponent, MobilityTableComponent, IotTableComponent, DropdownComponent],//, ConfirmDialogComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
