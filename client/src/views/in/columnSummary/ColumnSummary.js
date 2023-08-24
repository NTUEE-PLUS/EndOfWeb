/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { CButton, CFormControl, CInputGroup } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import Pagination from '@material-ui/lab/Pagination'
import { Spinner, default_male, Column_Background } from './index'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { selectLogin } from '../../../slices/loginSlice'
import {
  selectColumnSummary,
  setPage,
  setKeywords,
  setIsSearch,
} from '../../../slices/columnSummarySlice'
import ImageLoader from './ImageLoader'

const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80')`,
    height: '500px',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    flexDirection: 'column',
  },
  blogsContainer: {
    paddingTop: theme.spacing(3),
  },
  card: {
    maxWidth: '100%',
  },
  media: {
    height: '25rem',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    position: 'relative',
  },
  cardActions: {
    display: 'flex',
    margin: '0 10px',
    justifyContent: 'space-between',
  },
  author: {
    display: 'flex',
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  exp: {
    fontSize: '1.875rem',
    fontWeight: '10',
  },
  intro: {
    fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
    fontSize: '1.15rem',
    margin: '0.2rem',
  },
}))

const ColumnSummary = () => {
  const postsPerPage = 3
  const classes = useStyles()
  const dispatch = useDispatch()
  const [data, setData] = useState({ maxPage: undefined, data: [] })
  const { page, keywords, isSearch } = useSelector(selectColumnSummary)
  const [isPending, setIsPending] = useState(true)
  const { isAuth, isLogin } = useSelector(selectLogin)

  const imgFetcher = useCallback(
    (imgId) =>
      axios
        .get('/api/column/outline', {
          params: { id: imgId, selection: 'columnImg' },
        })
        .then((res) => res.data.data[0].imgSrc)
        .catch((err) => {
          err.response.data.description && alert('錯誤\n' + err.response.data.description)
        }),
    [],
  )

  const getData = () => {
    setIsPending(true)
    axios
      .get('/api/column/outline', {
        params: {
          perpage: postsPerPage.toString(),
          page: page.toString(),
          selection: '-columnImg',
        },
      })
      .then((res) => {
        setData(res.data)
        setIsPending(false)
      })
      .catch((err) => {
        err.response.data.description && alert('錯誤\n' + err.response.data.description)
      })
  }
  const searchData = (e = null) => {
    if (e) {
      e.preventDefault()
    }
    if (keywords) {
      dispatch(setIsSearch(true))
      setIsPending(true)
      axios
        .get('/api/column/search', {
          params: { keyword: keywords, page: page, selection: '-columnImg' },
        })
        .then((res) => {
          setData(res.data)
          setIsPending(false)
        })
        .catch((err) => {
          err.response.data.description && alert('錯誤\n' + err.response.data.description)
        })
    } else {
      getData()
    }
  }
  const deleteColumn = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete?')
    if (confirmDelete) {
      axios
        .delete('/api/column/delete', { data: { id: id } })
        .then(() => {
          alert('delete ')
        })
        .then(() => refresh())
        .catch((err) => {
          err.response.data.description && alert('錯誤\n' + err.response.data.description)
        })
      window.location.reload(false)
    }
  }
  useEffect(() => {
    if (!isSearch) {
      getData()
    } else {
      searchData()
    }
  }, [page])
  const articles = (data) => {
    return data.data.map((art, index) => {
      return (
        <Grid className="my-4" item xs={12} md={12} key={index}>
          <Card className={classes.card}>
            <Link to={'/column_summary/' + art.id}>
              <ImageLoader
                className={classes.media}
                defaultimg={Column_Background}
                title="Contemplative Reptile"
                imgFetcher={imgFetcher}
                imgId={art.id}
                createImgComponent={({ src, ...props }) => (
                  <CardMedia
                    style={{
                      backgroundSize: '100% 100%',
                    }}
                    image={src}
                    {...props}
                  />
                )}
              />
              <CardContent>
                <Typography gutterBottom variant="h3" component="h3">
                  {art.title}
                </Typography>
                {art.exp.map((e, i) => (
                  <Typography gutterBottom className={classes.exp} key={i}>
                    {e}
                  </Typography>
                ))}
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className={classes.intro}
                >
                  {art.intro}
                </Typography>
              </CardContent>
            </Link>
            <CardActions className={classes.cardActions}>
              {art.anno.map((person, i) => {
                return (
                  <Box className={classes.author} key={i}>
                    <Avatar src={default_male} />
                    <Box ml={2} display="flex" alignItems="center">
                      <Typography variant="subtitle2" component="p">
                        {person}
                      </Typography>
                    </Box>
                  </Box>
                )
              })}
              <Box>
                {isAuth && isLogin && (
                  <div>
                    <CButton
                      color="danger"
                      className="text-white"
                      onClick={() => deleteColumn(art.id)}
                    >
                      Delete
                    </CButton>
                    <Link to={`/auth/edit_column/${art.id}`}>
                      <CIcon
                        icon="cil-pencil"
                        name="cil-pencil"
                        style={{ scale: '1.7', marginLeft: '1rem' }}
                      ></CIcon>
                    </Link>
                  </div>
                )}
                <Typography variant="subtitle2" color="textSecondary" component="p">
                  {art.date} &emsp;
                  <BookmarkBorderIcon />
                </Typography>
              </Box>
            </CardActions>
          </Card>
        </Grid>
      )
    })
  }
  return (
    <div className="d-flex flex-column justify-content-center m-auto w-75">
      <Box className={classes.hero}>
        <Box className="display-1">Our Articles</Box>
        <form className="text-light p-2 m-2 w-75" onSubmit={searchData} method="GET">
          <CInputGroup>
            <CButton
              onClick={() => {
                dispatch(setIsSearch(false))
                dispatch(setKeywords(''))
                if (page === 1) {
                  getData()
                } else {
                  dispatch(setPage(1))
                }
              }}
              color="light"
            >
              <CIcon icon="cil-home" name="cil-home" />
            </CButton>
            <CFormControl
              type="search"
              placeholder={keywords === '' ? 'search for...' : keywords}
              onChange={(e) => dispatch(setKeywords(e.target.value))}
              value={keywords ? keywords : ''}
            ></CFormControl>
            <CButton color="light" type="submit">
              <CIcon icon="cil-search" name="cil-search" />
            </CButton>
          </CInputGroup>
        </form>
      </Box>
      {data.maxPage === 0 && !isPending ? (
        <div className="display-2 d-flex justify-content-center mt-3 text-white">
          No corresponding columns
        </div>
      ) : data.maxPage ? (
        <Box my={4} className={classes.paginationContainer}>
          <Pagination
            count={data.maxPage}
            defaultPage={page}
            page={page}
            color="secondary"
            onChange={(e, val) => {
              window.scrollTo(0, 0)
              dispatch(setPage(val))
            }}
          />
        </Box>
      ) : (
        []
      )}
      {isPending === true ? (
        <Spinner />
      ) : (
        <>
          {data && (
            <div className={classes.blogsContainer}>
              <Grid container spacing={1}>
                {articles(data)}
              </Grid>
            </div>
          )}
          <Box my={4} className={classes.paginationContainer}>
            <Pagination
              count={data.maxPage}
              defaultPage={page}
              page={page}
              color="secondary"
              onChange={(e, val) => {
                window.scrollTo(0, 0)
                dispatch(setPage(val))
              }}
            />
          </Box>
        </>
      )}
    </div>
  )
}

export default ColumnSummary
