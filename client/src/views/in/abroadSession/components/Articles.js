import React, { useState } from 'react'
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Avatar,
  Tooltip,
  CardActions,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import LinkIcon from '@material-ui/icons/Link'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import ConfirmModal from './ConfirmModal'
import { CButton } from '@coreui/react'
import getFavicon from '../utilities/getFavicon'

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    height: 'min-content',
  },
  intro: {
    whiteSpace: 'normal',
  },
  image: {
    alignSelf: 'stretch',
    width: '40%',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
  },
  leftContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1,
    marginTop: '0.5em',
    marginBottom: '0.5em',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    '& > .hovertext': {
      display: 'None',
    },
    '&:hover > .hovertext': {
      display: 'flex',
    },
  },
  linkIcon: {
    color: '#9b23a8',
    marginLeft: '0.2em',
  },
}))
const Article = ({ index, article, canEdit, startDelete }) => {
  const classes = useStyles()
  return (
    <Grid className="my-4" item xs={12} md={12} key={index}>
      <Card className={classes.card}>
        <div
          className={classes.image}
          style={{ backgroundImage: `url(${article?.img || 'https://i.imgur.com/LdKoYeE.png'})` }} // not efficient?
        ></div>
        <Box className={classes.leftContainer}>
          <Link to={'/abroad_session/' + article._id.toString()}>
            <CardContent>
              <Typography gutterBottom variant="h3" component="h3">
                {article.title}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className={classes.intro}
              >
                {article.intro}
              </Typography>
            </CardContent>
          </Link>
          {canEdit && (
            <CButton
              color="danger"
              onClick={() => {
                console.log('delete')
                startDelete()
              }}
              style={{ width: 'min-content' }}
            >
              delete
            </CButton>
          )}
          <CardActions className={classes.links}>
            {article.otherLinks &&
              article.otherLinks.map((link, i) => {
                return (
                  <Tooltip placement="top" key={i} title={'Link to more info!'}>
                    <Box className={classes.link} key={i}>
                      <a
                        href={link.match('//') ? link : '//' + link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {getFavicon(link) ? (
                          <Avatar src={getFavicon(link)} />
                        ) : (
                          <LinkIcon className={classes.linkIcon} />
                        )}
                      </a>
                    </Box>
                  </Tooltip>
                )
              })}
            <Box>
              <Typography variant="subtitle2" color="textSecondary" component="p">
                {/* {article.date} &emsp; */}
              </Typography>
            </Box>
          </CardActions>
        </Box>
      </Card>
    </Grid>
  )
}
Article.propTypes = {
  index: PropTypes.number,
  article: PropTypes.object,
  canEdit: PropTypes.bool,
  startDelete: PropTypes.func,
}
const Articles = ({ data, canEdit, deleteArticle }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [idForDel, setIdForDel] = useState('')
  const startDelete = (_id) => {
    setIdForDel(_id)
    setModalOpen(true)
  }

  return (
    <>
      {data.map((art, index) => (
        <Article
          article={art}
          index={index}
          key={index}
          canEdit={canEdit}
          startDelete={() => startDelete(art._id)}
        />
      ))}
      <ConfirmModal
        visible={modalOpen}
        setVisible={setModalOpen}
        deleteArticle={() => deleteArticle(idForDel)}
      />
    </>
  )
}
Articles.propTypes = {
  data: PropTypes.array,
  canEdit: PropTypes.bool,
  deleteArticle: PropTypes.func,
}
export default Articles
