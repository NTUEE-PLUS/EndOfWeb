import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectGlobal, openSidebar, hideSidebar } from '../slices/globalSlice'
import { selectLogin } from '../slices/loginSlice'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CImage,
  CButton,
  CFormControl,
  CInputGroup,
  CCollapse,
  CTooltip,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Chip from '@material-ui/core/Chip'
import DoneIcon from '@material-ui/icons/Done'
import AddIcon from '@material-ui/icons/Add'

import { AppHeaderDropdown } from './header/index'

import logo_row from '../assets/images/logo_row.png'

const AppHeader = () => {
  const dispatch = useDispatch()
  const { sidebarShow } = useSelector(selectGlobal)
  const { isLogin } = useSelector(selectLogin)

  // web element control
  const [isOpenFilter, setIsOpenFilter] = useState(false)

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ms-md-3 d-lg-none"
          onClick={() => (sidebarShow ? dispatch(hideSidebar()) : dispatch(openSidebar()))}
        >
          <CIcon name="cil-menu" size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="d-flex justify-content-center mx-auto d-md-none" to="/">
          <CImage src={logo_row} fluid width="50%" />
        </CHeaderBrand>

        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CInputGroup>
              <CFormControl type="search" placeholder="Search"></CFormControl>
              <CButton>
                <CIcon name="cil-search" />
              </CButton>
              <CTooltip content="Filters" placement="bottom">
                <CButton
                  onClick={(e) => {
                    e.preventDefault()
                    setIsOpenFilter(!isOpenFilter)
                  }}
                >
                  <CIcon name="cil-filter" />
                </CButton>
              </CTooltip>
            </CInputGroup>
          </CNavItem>
        </CHeaderNav>
        {isLogin ? (
          <CHeaderNav className="ms-3">
            <AppHeaderDropdown />
          </CHeaderNav>
        ) : (
          <CHeaderNav>
            <CNavLink to="/login" component={NavLink}>
              <CButton>Login</CButton>
            </CNavLink>
          </CHeaderNav>
        )}
      </CContainer>
      <CCollapse visible={isOpenFilter}>
        <Chip
          variant="outlined"
          avatar={<AddIcon></AddIcon>}
          label="Clickable"
          onClick={handleClick}
        />
      </CCollapse>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
