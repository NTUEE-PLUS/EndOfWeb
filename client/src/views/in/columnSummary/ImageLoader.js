import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Skeleton from '@material-ui/lab/Skeleton'

//? or use a spinner?
const PendingComponent = ({ className, ...props }) => {
  return (
    <Skeleton variant="rect" animation="pulse" {...props} className={className + ' bg-secondary'} />
  )
}
PendingComponent.propTypes = {
  className: PropTypes.string,
}

// imgFetcher: an async, callback fucntion with one argruemnt 'imgId' that returns image source
const ImageLoader = ({ imgFetcher, imgId, defaultimg, createImgComponent, ...props }) => {
  const [pending, setPending] = useState(false)
  const [imgSrc, setImgSrc] = useState('')

  useEffect(() => {
    setPending(true)
    imgFetcher(imgId)
      .then((src) => setImgSrc(src))
      .then(() => setPending(false))
  }, [imgFetcher, imgId])

  return (
    <>
      {pending ? (
        <PendingComponent {...props} />
      ) : typeof createImgComponent == 'function' ? (
        createImgComponent({ src: imgSrc || defaultimg, ...props })
      ) : (
        <img src={imgSrc || defaultimg} alt={props.alt || 'image'} {...props} />
      )}
    </>
  )
}

ImageLoader.propTypes = {
  defaultimg: PropTypes.string.isRequired,
  alt: PropTypes.string,
  createImgComponent: PropTypes.func,
  imgFetcher: PropTypes.func.isRequired,
  imgId: PropTypes.string,
}

export default ImageLoader
