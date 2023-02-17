import React, { useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'

const HistImg = ({ alt, queryId, getImg }) => {
  const [pending, setPending] = useState(false)
  const [src, setSrc] = useState('')
  const imgStyle = {
    boxShadow: '3px 3px 12px gray',
    padding: '2px',
    borderRadius: '50%',
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  }
  const pendingComponent = (
    <img style={imgStyle} src="https://i.imgur.com/0HIqjg0.gif" alt="pending" />
  )
  const updateImg = useCallback(async () => {
    setPending(true)
    if (!queryId) return

    const data = await getImg(queryId)
    setSrc(data)
    if (data) setPending(false)
  }, [queryId, getImg])

  useEffect(() => {
    updateImg()
  }, [updateImg])

  return (
    <div style={{ aspectRatio: '1', maxHeight: '10rem' }} className="img-fluid">
      {pending ? pendingComponent : <img style={imgStyle} src={src} alt={alt || 'avatar'} />}
    </div>
  )
}

export default HistImg
HistImg.propTypes = {
  alt: PropTypes.string,
  queryId: PropTypes.string,
  getImg: PropTypes.func,
}
