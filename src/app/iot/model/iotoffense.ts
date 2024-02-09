export interface IotOffense {
    id: string;
    start_time: string;
    description: string;
    magnitude: string;
    offense_source: string;
    data_source: string;
}

export const IotOffenseColumns = [
    {
        key: 'id',
        type: 'text',
        label: 'Incident ID',
    },
    {
        key: 'offense_source',
        type: 'text',
        label: 'Offense Source',
    },
    {
        key: 'start_time',
        type: 'text',
        label: 'Incident Date & Time',
    },
    {
        key: 'magnitude',
        type: 'text',
        label: 'Severity (1-10)',
    },
    {
        key: 'attacktype',
        type: 'text',
        label: 'Attack Type',
    },
    {
        key: 'data_source',
        type: 'text',
        label: 'Data Source',
    }
  ];
