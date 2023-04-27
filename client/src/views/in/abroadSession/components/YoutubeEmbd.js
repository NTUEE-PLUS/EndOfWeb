import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  videoResponsive: {
    overflow: 'hidden',
    paddingBottom: '56.25%',
    position: 'relative',
    height: 0,
    '& > iframe': { left: 0, top: 0, height: '100%', width: '100%', position: 'absolute' },
    aspectRatio: '16/9',
  },
}))

const YoutubeEmbed = ({ embedId }) => {
  const classes = useStyles()
  return (
    <div className={classes.videoResponsive}>
      <iframe
        width="853"
        height="480"
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  )
}

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
}

export default YoutubeEmbed
