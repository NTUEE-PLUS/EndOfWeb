import { CFormControl, CInputGroup, CButton } from '@coreui/react'
import { useHistory } from 'react-router-dom'
import React from 'react'
import CIcon from '@coreui/icons-react'
import PropTypes from 'prop-types'

const SearchBar = ({ rootRoute, keywords, setKeywords }) => {
  const history = useHistory()
  const handleBackToHome = () => {
    setKeywords('')
    history.push(rootRoute)
  }
  const handleSearch = () => history.push(`${rootRoute}/1/${encodeURIComponent(keywords)}`)
  return (
    <CInputGroup>
      <CButton onClick={handleBackToHome} color="light">
        <CIcon icon="cil-home" />
      </CButton>
      <CFormControl
        type="search"
        placeholder={keywords === '' ? 'search for...' : keywords}
        onChange={(e) => setKeywords(e.target.value)}
        onKeyDown={(e) => (e.code === 'Enter' || e.code === 'NumpadEnter') && handleSearch()}
        value={keywords ? keywords : ''}
      ></CFormControl>
      <CButton color="light" onClick={handleSearch}>
        <CIcon icon="cil-search" />
      </CButton>
    </CInputGroup>
  )
}

SearchBar.propTypes = {
  rootRoute: PropTypes.string.isRequired,
  keywords: PropTypes.string,
  setKeywords: PropTypes.func,
}
export default SearchBar
