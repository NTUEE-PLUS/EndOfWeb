import React from 'react'

const Column = React.lazy(() => import('./views/components/column/Column'))
const ColumnSummary = React.lazy(() => import('./views/components/columnSummary/columnSummary'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/column', name: 'Column', component: Column },
  { path: '/columnSummary', name: 'ColumnSummary', component: ColumnSummary },
]

export default routes
