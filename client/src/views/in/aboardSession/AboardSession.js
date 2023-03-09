import React from 'react'
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Avatar,
  CardActions,
  Pagination,
  Spinner,
} from '@material-ui/core'
import { CForm, CFormControl, CInputGroup, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const useStyles = makeStyles((theme) => ({
  card: {},
  links: {
    display: 'block',
  },
}))
const getFavicon = (type) => {
  if (!typeof type === 'string') return
  type = type.toLowerCase()
  return type === 'medium' ? 'https://cdn-icons-png.flaticon.com/512/5968/5968933.png' : ''
}

const Articles = () => {
  const [data, setData] = useState([[]])
  const classes = useStyles()
  useEffect(() => {
    console.log('loadng...')
    fetch('./aboardData.json', { 'content-type': 'application/json' })
      .then((data) => data.json())
      .then((d) => {
        console.log(d)
        setData(d)
      })
      .catch((e) => console.log('error:', e.message))
  }, [])
  return data.map((art, index) => {
    return (
      <Grid className="my-4" item xs={12} md={12} key={index}>
        <Card className={classes.card}>
          <Link to={'/aboard_session/' + index.toString()}>
            <CardMedia
              className={classes.media}
              image={'https://mui.com/static/images/cards/contemplative-reptile.jpg'}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h3" component="h3">
                {art.title}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className={classes.intro}
              >
                {art.description}
              </Typography>
            </CardContent>
          </Link>
          <CardActions className={classes.links}>
            {art.links &&
              art.links.map(({ link, favicon, type, description }, i) => {
                return (
                  <Box display="flex" alignItems="center" key={i}>
                    <Avatar
                      src={
                        favicon ||
                        getFavicon(type) ||
                        'https://mui.com/static/images/cards/contemplative-reptile.jpg'
                      }
                    />
                    <a href={link}>
                      <Typography variant="subtitle2" component="p">
                        {description}
                      </Typography>
                    </a>
                  </Box>
                )
              })}
            <Box>
              <Typography variant="subtitle2" color="textSecondary" component="p">
                {/* {art.date} &emsp; */}
              </Typography>
            </Box>
          </CardActions>
        </Card>
      </Grid>
    )
  })
}
const AboardSession = () => {
  const searchData = () => {}
  const classes = useStyles()
  const [isPending, setIsPending] = useState(false)
  const [data, setData] = useState({ maxPage: null, data: [] })
  return (
    <div className="d-flex flex-column justify-content-center m-auto w-75">
      <Box>
        <Box className="display-1">Our Articles</Box>
        <form className="text-light p-2 m-2 w-75" onSubmit={searchData} method="GET">
          <CInputGroup>
            <CButton onClick={() => {}} color="light">
              <CIcon icon="cil-home" name="cil-home" />
            </CButton>
            <CFormControl
            // type="search"
            // placeholder={keywords === '' ? 'search for...' : keywords}
            // onChange={(e) => dispatch(setKeywords(e.target.value))}
            // value={keywords ? keywords : ''}
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
            // defaultPage={page}
            // page={page}
            color="secondary"
            onChange={(e, val) => {
              window.scrollTo(0, 0)
              // dispatch(setPage(val))
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
                {/* {articles(data)} */}
              </Grid>
            </div>
          )}
          <Box my={4} className={classes.paginationContainer}>
            <Pagination
              count={data.maxPage}
              // defaultPage={page}
              // page={page}
              color="secondary"
              onChange={(e, val) => {
                window.scrollTo(0, 0)
                // dispatch(setPage(val))
              }}
            />
          </Box>
        </>
      )}
    </div>
  )
}
export default AboardSession
