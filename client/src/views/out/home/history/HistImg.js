import React, { useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'

const HistImg = ({ alt, queryId, getImg, ...props }) => {
  const [pending, setPending] = useState(false)
  const [src, setSrc] = useState('')
  const pendingComponent = <img {...props} src="https://i.imgur.com/0HIqjg0.gif" alt="pending" />

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

  return pending ? pendingComponent : <img {...props} src={src} alt={alt || 'histimg'} />
}

export default HistImg
HistImg.propTypes = {
  alt: PropTypes.string,
  queryId: PropTypes.string,
  getImg: PropTypes.func,
}
