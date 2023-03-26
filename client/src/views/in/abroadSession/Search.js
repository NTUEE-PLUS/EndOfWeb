import React from 'react'
import { Grid, Box, CircularProgress } from '@material-ui/core'
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
  title: {
    color: '#cdf7d1',
    marginBottom: '0.2em',
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

const formTemplate = {
  title: '',
  intro: '',
  YTlink: '',
  otherLinks: [],
  img: '',
}
const Search = ({ data, parPageNum, searchFor, isPending, rootRoute, maxPage, refresh }) => {
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
  const deleteArticle = (_id) => {
    axios
      .delete('/api/deleteAbroadSharing', { params: { _id } })
      .then(() => alert('已刪除'))
      .then(() => refresh())
      .catch((e) => alert(`錯誤: ${e.message}`))
  }

  return (
    <div className="d-flex flex-column justify-content-center m-auto w-75">
      <Box>
        <Box className={`display-1 ${classes.title}`}>
          <strong>Abroad Sharing Sessions</strong>
          {canEdit && <CButton onClick={handleAddData}>Add New Data</CButton>}
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
                <Articles data={data} canEdit={canEdit} deleteArticle={deleteArticle} />
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
}

export default Search
