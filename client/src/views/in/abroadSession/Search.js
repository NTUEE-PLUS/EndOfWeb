import React from 'react'
import {
  Grid,
  Box,
  CircularProgress,
  Switch,
  FormGroup,
  FormControlLabel,
  Typography,
} from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import { makeStyles } from '@material-ui/core'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { CButton } from '@coreui/react'
import { Articles, SearchBar, FormModal } from './components'
import { useSelector } from 'react-redux'
import { selectLogin } from '../../../slices/loginSlice'
import PropTypes from 'prop-types'
import axios from 'axios'
const useStyles = makeStyles((theme) => ({
  progress: {
    width: '20%',
    height: '20%',
    display: 'flex',
    alignSelf: 'center',
    flexDirection: 'column',
    marginTop: '15%',
  },
  titleSearchContainer: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/airplane.jpg')`, //https://unsplash.com/photos/rf6ywHVkrlY
    backgroundSize: 'cover',
    backgroundPosition: '0% 50%',
    margin: '0.2em',
    padding: '1em',
    borderRadius: '1em',
  },
  title: {
    color: '#a4c0de',
    marginBottom: '0.2em',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textShadow:
      '-0.01em -0.01em 0 #3847cf, 0.01em -0.01em 0 #3847cf, -0.01em 0.01em 0 #3847cf, 0.01em 0.01em 0 #3847cf',
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlLabelText: { color: 'silver', textShadow: 'none' },
}))

const formTemplate = {
  title: '',
  intro: '',
  YTlink: '',
  otherLinks: [],
  img: '',
}
const Search = ({
  data,
  parPageNum,
  searchFor,
  isPending,
  rootRoute,
  maxPage,
  refresh,
  setAscTime,
  ascTime,
}) => {
  const classes = useStyles()
  const history = useHistory()
  const [modalOpen, setModalOpen] = useState(false)
  const [forEdit, setForEdit] = useState(formTemplate)

  const { isAuth, isLogin } = useSelector(selectLogin)
  const canEdit = isAuth && isLogin
  // const [data, setData] = useState({ maxPage: null, data: [] })

  const [keywords, setKeywords] = useState(searchFor ? decodeURIComponent(searchFor) : '')
  const page = parPageNum || 1

  const handleAddData = () => {
    setForEdit(formTemplate)
    setModalOpen(true)
  }
  const handleUpdateData = (data) => {
    setForEdit(data)
    setModalOpen(true)
  }
  const deleteArticle = (_id) => {
    axios
      .delete('/api/deleteAbroadSharing', { params: { _id } })
      .then(() => alert('已刪除'))
      .then(() => refresh())
      .catch((e) => alert(`錯誤: ${e.message}`))
  }

  return (
    <div className="d-flex flex-column justify-content-center m-auto w-75">
      <Box className={classes.titleSearchContainer}>
        <Box className={`display-1 ${classes.title}`}>
          <strong>Abroad Sharing Sessions</strong>
          <Typography variant="subtitle1" className={classes.controlLabelText}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={ascTime}
                    onChange={(e) => setAscTime(e.target.checked)}
                    inputProps={{ 'aria-label': 'Switch Sorting Order' }}
                  />
                }
                label="Ascending"
              ></FormControlLabel>
            </FormGroup>
          </Typography>
          {canEdit && (
            <CButton onClick={handleAddData} style={{ height: 'min-content' }}>
              Add New Data
            </CButton>
          )}
        </Box>
        <SearchBar rootRoute={rootRoute} keywords={keywords} setKeywords={setKeywords} />
      </Box>
      {maxPage === 0 && !isPending ? (
        <div className="display-4 d-flex justify-content-center mt-3 text-white">
          No corresponding datas
        </div>
      ) : maxPage ? (
        <Box my={4} className={classes.paginationContainer}>
          <Pagination
            count={maxPage}
            defaultPage={1}
            page={page}
            color="secondary"
            onChange={(e, val) => {
              window.scrollTo(0, 0)
              history.push(`${rootRoute}/${val}/${searchFor || ''}`)
            }}
          />
        </Box>
      ) : (
        []
      )}
      {isPending === true ? (
        <CircularProgress className={classes.progress} color="secondary" />
      ) : (
        <>
          {data && (
            <div className={classes.blogsContainer}>
              <Grid container spacing={1}>
                <Articles
                  data={data}
                  canEdit={canEdit}
                  deleteArticle={deleteArticle}
                  updateArticle={handleUpdateData}
                />
              </Grid>
            </div>
          )}
          <Box my={4} className={classes.paginationContainer}>
            <Pagination
              count={maxPage}
              defaultPage={1}
              page={page}
              color="secondary"
              onChange={(e, val) => {
                window.scrollTo(0, 0)
                history.push(`${rootRoute}/${val}/${searchFor || ''}`)
              }}
            />
          </Box>
        </>
      )}
      <FormModal
        visible={modalOpen}
        setVisible={setModalOpen}
        data={forEdit}
        setData={setForEdit}
        refresh={refresh}
      />
    </div>
  )
}
Search.propTypes = {
  data: PropTypes.array,
  parPageNum: PropTypes.number,
  searchFor: PropTypes.string,
  isPending: PropTypes.bool,
  rootRoute: PropTypes.string,
  maxPage: PropTypes.number,
  refresh: PropTypes.func,
  setAscTime: PropTypes.func,
  ascTime: PropTypes.bool,
}

export default Search
