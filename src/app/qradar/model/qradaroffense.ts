/* import { QradarTableComponent } from './../qradar-table/qradar-table.component';
import { formatDate, formatTime } from "QradarTableComponent";
 */
export interface QradarOffense {
  [key: string]: any; // Add an index signature
  id: string;
  offense_source: string;
  start_time: string;
  magnitude: string;
  data_source: string;
  description: string
}

export const QradarOffenseColumns = [
  {
    key: 'id',
    type: 'string',
    label: 'Incident ID',
    filterable: false,
  },
  {
    key: 'offense_source',
    type: 'string',
    label: 'Offense Source',
    filterable: false,
  },
  {
    key: 'start_time',
    type: 'string',
    label: 'Incident Date & Time',
    /* formatFunction: formatDate, */
    filterable: true,
  },
  {
    key: 'magnitude',
    type: 'string',
    label: 'Severity (1-10)',
    filterable: true,
  },
  {
    key: 'description',
    type: 'string',
    label: 'Attack Type',
    filterable: true,
  },
  {
    key: 'data_source',
    type: 'string',
    label: 'Data Source',
    filterable: true,
  }
];

