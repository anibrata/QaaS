/* import { QradarTableComponent } from './../qradar-table/qradar-table.component';
import { formatDate, formatTime } from "QradarTableComponent";
 */
export interface QradarOffense {
    id: number;
    offense_source: string;
    start_time: number;
    magnitude: number;
    attacktype: string;
}

export const QradarOffenseColumns = [
  {
    key: 'id',
    type: 'number',
    label: 'Incident ID',
  },
  {
    key: 'offense_source',
    type: 'string',
    label: 'Offense Source',
  },
  {
    key: 'start_time',
    type: 'number',
    label: 'Incident Date',
    /* formatFunction: formatDate, */
  },
  {
    key: 'start_date', // Dummy key for referencing in the mat tab data table
    type: 'number',
    label: 'Incident Time',
    /* formatter: (element: QradarOffense) => formatTime(element.start_time), */
  },
  {
    key: 'magnitude',
    type: 'number',
    label: 'Severity (1-10)',
  },
  {
    key: 'description',
    type: 'string',
    label: 'Attack Type',
  }
];

