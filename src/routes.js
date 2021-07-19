import React from 'react'

const Column = React.lazy(() => import('./views/components/column/Column'))
const ShowColumns = React.lazy(() => import('./views/components/columnSummary/showColumns'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Career = React.lazy(() => import('./views/components/career/career'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/column', name: 'Column', component: Column },
  { path: '/columnSummary', name: 'ColumnSummary', component: ShowColumns },
  { path: '/career', name: 'Career', component: Career },
]

export default routes
