import React from 'react'
import { Box, Typography, Avatar, CircularProgress, makeStyles } from '@material-ui/core'
import YoutubeEmbed from './components/YoutubeEmbd'
import PropTypes from 'prop-types'
import getFavicon from './utilities/getFavicon'
import LinkIcon from '@material-ui/icons/Link'
const getVideoId = (YTlink) => {
  if (typeof YTlink !== 'string') return

  const regex =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)(?<videoId>[a-zA-Z0-9_-]{11})/

  return YTlink.match(regex)?.groups?.videoId
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    justifySelf: 'center',
    justifyContent: 'center',
    marginTop: '0.3em',
    marginBottom: '0.3em',
    color: '#cdf7d1',
  },
  videoContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '50em',
    maxHeight: '50%',
  },
  intro: {
    marginTop: '0.5em',
    marginBottom: '0.3em',
    color: '#cdf7d1',
    width: '80%',
  },
  introContent: {
    color: 'white',
  },
  linksContainer: {
    marginTop: '0.6em',
    marginBottom: '0.3em',
    color: '#cdf7d1',
    width: '80%',
  },
  link: {
    display: 'flex',
    margin: '0.2em',
    alignItems: 'center',
  },
  linkAvatar: {
    marginRight: '0.5em',
  },
  linkIcon: {
    marginRight: '0.5em',
    color: '#9b23a8',
  },
  linkText: {
    color: 'white',
    '&:hover': { color: '#2eff42' },
  },
  progress: {
    width: '20%',
    height: '20%',
    display: 'flex',
    alignSelf: 'center',
    flexDirection: 'column',
    marginTop: '15%',
  },
}))

const AbroadSessionPage = ({ data, isPending }) => {
  const classes = useStyles()
  const { YTlink } = data
  const videoId = getVideoId(YTlink)

  return (
    <div className={classes.container}>
      {Object.entries(data).length && !isPending ? (
        <>
          <Box className={`display-1 ${classes.title}`}>
            <Typography variant="h1" component="h1" sx={{ mb: 4 }}>
              {data.title}
            </Typography>
          </Box>
          <Box className={classes.videoContainer}>
            {videoId && <YoutubeEmbed embedId={videoId} />}
          </Box>
          <Box className={classes.intro}>
            <Typography variant="h5" component="h5" sx={{ mb: 4 }}>
              <strong>Introduction:</strong>
            </Typography>
            <Typography variant="h6" component="h6" className={classes.introContent} sx={{ mb: 4 }}>
              {data.intro}
            </Typography>
          </Box>
          <Box className={classes.linksContainer}>
            <Typography variant="h5" component="h5" sx={{ mb: 4 }}>
              <strong>Other Links:</strong>
            </Typography>
            <ul style={{ padding: 0 }}>
              {data.otherLinks.map((link, i) => (
                <li key={i} className={classes.link}>
                  {getFavicon(link) ? (
                    <Avatar src={getFavicon(link)} className={classes.linkAvatar} />
                  ) : (
                    <LinkIcon className={classes.linkIcon} />
                  )}
                  <a
                    href={link.match('//') ? link : '//' + link}
                    target="_blank"
                    rel="noreferrer"
                    className={classes.linkText}
                  >
                    <Typography variant="h6" component="h6" sx={{ mb: 4 }}>
                      {link}
                    </Typography>
                  </a>
                </li>
              ))}
            </ul>
          </Box>
        </>
      ) : (
        <CircularProgress className={classes.progress} color="secondary" />
      )}
    </div>
  )
}

AbroadSessionPage.propTypes = {
  data: PropTypes.object,
  isPending: PropTypes.bool,
}

export default AbroadSessionPage
