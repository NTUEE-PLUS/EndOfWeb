/* eslint-disable prettier/prettier */
import React from 'react'
import CIcon from '@coreui/icons-react'
import { NavLink } from 'react-router-dom'

const _navOut = [
  {
    _component: 'CNavTitle',
    anchor: 'Information',
  },
  {
    _component: 'CNavItem',

    anchor: 'HEADER',
    to: 'header',
    icon: <CIcon name="cil-speedometer" customClassName="nav-icon" />,
  },
  {
    _component: 'CNavItem',
    anchor: 'FEATURES',
    to: 'features',
    icon: <CIcon name="cil-speedometer" customClassName="nav-icon" />,
  },
  {
    _component: 'CNavItem',

    anchor: 'ABOUT',
    to: '/about',
    icon: <CIcon name="cil-notes" customClassName="nav-icon" />,
  },
  {
    _component: 'CNavItem',

    anchor: 'SERVICES',
    to: 'services',
    icon: <CIcon name="cil-notes" customClassName="nav-icon" />,
  },
  {
    _component: 'CNavItem',

    anchor: 'INTERVIEWS',
    to: 'interviews',
    icon: <CIcon name="cil-notes" customClassName="nav-icon" />,
  },
  {
    _component: 'CNavItem',

    anchor: 'HISTORY',
    to: '/history',
    icon: <CIcon name="cil-notes" customClassName="nav-icon" />,
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'TEAM',
    to: '/team',
    icon: <CIcon name="cil-notes" customClassName="nav-icon" />,
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'CONTACT',
    to: '/contact',
    icon: <CIcon name="cil-speedometer" customClassName="nav-icon" />,
  },
]

export default _navOut
