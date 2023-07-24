export interface IotOffense {
    attackid: bigint;
    attackdate: string;
    attacktime: string;
    severity: string;
    categories: string;
    attacktype: string;
}

export const IotOffenseColumns = [
    {
      key: 'attackid',
      type: 'bigint',
      label: 'Incident ID',
    },
    {
      key: 'attackdate',
      type: 'text',
      label: 'Incident Date',
    },
    {
      key: 'attacktime',
      type: 'text',
      label: 'Incident Time',
    },
    {
      key: 'severity',
      type: 'text',
      label: 'Severity (1-10)',
    },
    {
      key: 'categories',
      type: 'text',
      label: 'Categories',
    },
    {
      key: 'attacktype',
      type: 'text',
      label: 'Attack Type',
    },
  ];
