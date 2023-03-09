import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectSearch, setKeywords, clearKeywords } from '../../../slices/searchSlice'
import Styles from '../../in/profile/search/Styles'
import axios from 'axios'
import { CButton, CContainer, CFormControl, CInputGroup } from '@coreui/react'
import CIcon from '@coreui/icons-react'
// import JoditEditor from 'jodit-react'
// import parser from 'html-react-parser'
import default_male from '../../../assets/images/default_male.png'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'

function ManageAuth() {
  const classes = Styles()
  const dispatch = useDispatch()
  const { keywords, setResultProfiles } = useSelector(selectSearch)

  // const [isAdmin, setIsAdmin] = useState(false)
  // const [authMember, setAuthMember] = useState([])
  const [selectedProfile, setselectedProfile] = useState()

  const handleSearch = async (e) => {
    e.preventDefault()
    // `try`: immediately pass to the `catch` block, if an error occurs
    try {
      const res = await axios.post('/api/manageAuth', { session_account: keywords })
      setselectedProfile(res.data)
      console.log(res.data.account, res.data.isAuth)
    } catch (err) {
      console.log(err)
      alert('請輸入正確學號')
    }
  }
  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearch(e)
    }
  }

  // change authority(`setAuth`, `authMember`)
  const changeAuth = async (isAuth) => {
    try {
      await axios.post('/api/manageAuth', { session_account: keywords, setAuth: isAuth })
      console.log(keywords, isAuth)
      // handleAuthMember()
      isAuth ? alert(`帳號${keywords}\n已新增為管理員`) : alert(`帳號${keywords}\n已被移除管理員`)
    } catch (err) {
      console.log(err)
      alert('未變更管理員權限，請重新設定')
    }
  }

  // const handleAuthMember = () => {
  //   if (isAdmin) {
  //     setAuthMember([...authMember, keywords])
  //   } else {
  //     const index = authMember.indexOf(keywords)
  //     if (index !== -1) authMember.splice(index, 1)
  //   }
  // }

  return (
    <CContainer>
      <CInputGroup>
        <CFormControl
          type="search"
          placeholder="Enter the accurate account for editing authority members"
          onChange={(e) => {
            dispatch(setKeywords(e.target.value))
          }}
          onKeyPress={handleEnter}
        />
        <CButton onClick={handleSearch}>
          <CIcon icon="cil-search" name="cil-search" />
        </CButton>
      </CInputGroup>
      <br />
      {!selectedProfile ? (
        <></>
      ) : (
        <CContainer className="align-items-center col-md-10 col-xl-8">
          <List className={classes.root}>
            <ListItem alignItems="flex-start" className={classes.fontColor}>
              <ListItemAvatar className="px-3">
                <Avatar
                  src={selectedProfile.userImage === '' ? default_male : selectedProfile.userImage}
                  className={classes.large}
                />
              </ListItemAvatar>
              <ListItemText
                primary={selectedProfile.userName}
                classes={{
                  primary: classes.primary,
                }}
              />
              <CButton
                onClick={() => {
                  // setIsAdmin(true)
                  changeAuth(true)
                }}
                color="success"
                style={{ marginRight: '0.15em', marginLeft: '0.15em' }}
              >
                Add
              </CButton>
              <CButton
                onClick={() => {
                  // setIsAdmin(false)
                  changeAuth(false)
                }}
                color="danger"
                style={{ marginRight: '0.15em', marginLeft: '0.15em' }}
              >
                Delete
              </CButton>
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        </CContainer>
      )}
    </CContainer>
  )
}

export default ManageAuth
