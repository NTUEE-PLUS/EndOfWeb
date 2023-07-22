import React from 'react'
import parser from 'html-react-parser'
const FormattedText = ({ text }) => {
  const transformedText = urlsToLinks(text)
  return <h5 style={{ whiteSpace: 'pre-wrap' }}>{parser(transformedText)}</h5>
}
export default FormattedText
const urlsToLinks = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g
  return text.replace(urlRegex, '<a href="$1">$1</a>')
}
