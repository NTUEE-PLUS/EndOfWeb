import React from 'react'

const Column = React.lazy(() => import('./views/components/column/Column'))
const About = React.lazy(() => import('./views/components/about/About'))
const History = React.lazy(() => import('./views/components/history/History'))
const ShowColumns = React.lazy(() => import('./views/components/columnSummary/showColumns'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Career = React.lazy(() => import('./views/components/career/career'))
const Recommendation = React.lazy(() =>
  import('./views/components/career/recommendation/Recommendation'),
)
const Recruitment = React.lazy(() => import('./views/components/career/recruitment/Recruitment'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/column', name: 'Column', component: Column },
  { path: '/about', name: 'About', component: About },
  { path: '/history', name: 'History', component: History },
  { path: '/columnSummary', name: 'ColumnSummary', component: ShowColumns },
  { path: '/career', name: 'Career', component: Career },
  { path: '/recommendation', name: 'Recommendation', component: Recommendation },
  { path: '/recruitment', name: 'Recruitment', component: Recruitment },
]

export default routes
