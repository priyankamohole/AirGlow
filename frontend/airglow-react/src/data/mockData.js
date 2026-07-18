export const dagsData = [
  { id: 24, name: 'Daily users pipeline', type: 'ETL', schedule: '0 2 * * *', status: 'active', lastRun: 'May 18, 10:30 AM' },
  { id: 23, name: 'Orders ETL', type: 'ETL', schedule: '0 * * * *', status: 'active', lastRun: 'May 18, 09:15 AM' },
  { id: 22, name: 'Products pipeline', type: 'ELT', schedule: '15 3 * * *', status: 'active', lastRun: 'May 18, 08:20 AM' },
  { id: 21, name: 'Inventory sync', type: 'BATCH', schedule: '*/15 * * * *', status: 'active', lastRun: 'May 17, 11:45 PM' },
  { id: 20, name: 'Analytics data load', type: 'ELT', schedule: '0 1 * * 0', status: 'paused', lastRun: 'May 17, 11:30 PM' }
]

export const runsData = [
  { id: 909, dag: 'Daily users pipeline', status: 'success', start: 'May 18, 10:30 AM', end: 'May 18, 10:30 AM', duration: '12.34s', records: '1,245' },
  { id: 908, dag: 'Orders ETL', status: 'success', start: 'May 18, 09:15 AM', end: 'May 18, 09:15 AM', duration: '18.67s', records: '2,341' },
  { id: 907, dag: 'Products pipeline', status: 'failed', start: 'May 18, 08:20 AM', end: 'May 18, 08:20 AM', duration: '—', records: '0' },
  { id: 906, dag: 'Inventory sync', status: 'success', start: 'May 17, 11:45 PM', end: 'May 17, 11:45 PM', duration: '9.21s', records: '632' },
  { id: 905, dag: 'Analytics data load', status: 'running', start: 'May 17, 11:30 PM', end: '—', duration: '5.33s', records: '1,023' }
]

export const webhooksData = [
  { id: 1, dag: 'Daily users pipeline', url: 'https://client.com/webhook/users', status: 'active' },
  { id: 2, dag: 'Orders ETL', url: 'https://client.com/webhook/orders', status: 'active' },
  { id: 3, dag: 'Products pipeline', url: 'https://client.com/webhook/products', status: 'active' }
]

export const runLogs = {
  909: [
    { ts: '10:30:00', text: 'DAG run started' },
    { ts: '10:30:01', text: 'Extracting data from REST API' },
    { ts: '10:30:03', text: 'Extracted 1,250 records' },
    { ts: '10:30:04', text: 'Transforming data' },
    { ts: '10:30:07', text: 'Transformed 1,250 records' },
    { ts: '10:30:09', text: 'Loading data to destination' },
    { ts: '10:30:11', text: 'Loaded 1,245 records' },
    { ts: '10:30:12', text: 'DAG run completed successfully', ok: true }
  ]
}
