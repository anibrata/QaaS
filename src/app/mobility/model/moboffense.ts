export interface MobOffense {
  offense_id: string;
  offense_desc: string;
  categories: string;
  offense_source: string;
  severity: string;
  source_ip: string;
  offense_time: string;
}

export const MobOffenseColumns = [
  {
    key: 'offense_id',
    type: 'text',
    label: 'Offense Id',
  },
  {
    key: 'offense_desc',
    type: 'text',
    label: 'Offense Description',
  },
  {
    key: 'categories',
    type: 'text',
    label: 'Categories',
  },
  {
    key: 'offense_source',
    type: 'text',
    label: 'Offense Source',
  },
  {
    key: 'severity',
    type: 'text',
    label: 'Severity (1-10)',
  },
  {
    key: 'source_ip',
    type: 'text',
    label: 'Source IP',
  },
  {
    key: 'offense_time',
    type: 'date',
    label: 'Offense Time',
  },
];
