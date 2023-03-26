const getFavicon = (link) => {
  if (typeof link !== 'string') return ''
  const medium = /medium\.com/
  const youtube = /youtube\.com|youtu\.be/
  const facebook = /facebook\.com/
  const eeplus = /eeplus\.ntuee\.org/
  if (link.match(medium)) return 'https://cdn-icons-png.flaticon.com/512/5968/5968933.png'
  if (link.match(youtube)) return 'https://cdn-icons-png.flaticon.com/512/174/174883.png'
  if (link.match(facebook)) return 'https://cdn-icons-png.flaticon.com/512/124/124010.png'
  if (link.match(eeplus)) return '/favicon.ico'
}

export default getFavicon
