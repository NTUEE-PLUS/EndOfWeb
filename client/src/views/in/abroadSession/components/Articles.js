import React, { useState } from 'react'
import {
  Grid,
  Card,
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
    backgroundImage: (props) => `url(${props.article?.img || 'https://i.imgur.com/LdKoYeE.png'})`,
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
    marginRight: '4%',
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
  bottomInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editingButton: {
    width: 'min-content',
    margin: '0 0.1em 0 0.1em',
  },
}))
function getDateExp(dateStr) {
  let date
  try {
    date = new Date(dateStr)
  } catch (e) {
    return ''
  }
  return `last updated: ${date.getFullYear()}/${
    date.getMonth() + 1
  }/${date.getDate()} ${date.getHours()}:${
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  }`
}
const Article = ({ index, article, canEdit, startDelete, startUpdate }) => {
  const classes = useStyles({ article })
  return (
    <Grid className="my-4" item xs={12} md={12} key={index}>
      <Card className={classes.card}>
        <div className={classes.image}></div>
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
            <div style={{ display: 'flex' }}>
              <CButton
                color="info"
                onClick={() => {
                  console.log('update')
                  startUpdate()
                }}
                style={{ width: 'min-content' }}
                className={classes.editingButton}
              >
                update
              </CButton>
              <CButton
                color="danger"
                onClick={() => {
                  console.log('delete')
                  startDelete()
                }}
                className={classes.editingButton}
              >
                delete
              </CButton>
            </div>
          )}
          <CardActions className={classes.bottomInfo}>
            <Box className={classes.links}>
              {article.otherLinks &&
                article.otherLinks.map(({ link, desc }, i) => {
                  return (
                    <Tooltip placement="top" key={i} title={desc || 'Link to more info!'}>
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
            </Box>
            <Box>
              <Typography variant="subtitle2" color="textSecondary" component="p">
                {getDateExp(article.updatedAt)}
                {/* &emsp*/}
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
  startUpdate: PropTypes.func,
}
const Articles = ({ data, canEdit, deleteArticle, updateArticle }) => {
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
          startUpdate={() => updateArticle(art)}
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
  updateArticle: PropTypes.func,
}
export default Articles
