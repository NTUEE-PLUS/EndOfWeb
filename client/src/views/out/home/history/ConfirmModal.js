import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CModal, CModalBody, CModalHeader, CModalFooter, CModalTitle, CButton } from '@coreui/react'
import axios from 'axios'

const ConfirmModal = ({ visible, setVisible, grade, title, _id, refetch }) => {
  const [pending, setPending] = useState(false)
  const handleDelete = (_id) => {
    setPending(true)
    axios
      .delete('/api/history', { params: { _id } })
      .then(() => {
        setPending(false)
        setVisible(false)
        refetch()
        alert('已刪除')
      })
      .catch((err) => {
        setPending(false)
        setVisible(false)
        err.response.data.description && alert('錯誤\n' + err.response.data.description)
      })
  }
  return (
    <CModal alignment="center" visible={visible} onDismiss={() => setVisible(false)}>
      <CModalHeader>
        <CModalTitle>
          {pending ? 'Deleting...' : 'Are you sure to delete the year data?'}
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        {pending
          ? 'Deleting this year, please wait...'
          : `You are trying to delete a year data with {grade = '${grade}', title = '${title}'}. The operation is
        irrevertible. Click confirm button to continue.`}
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)} disabled={pending}>
          Cancel
        </CButton>
        <CButton color="danger" onClick={() => handleDelete(_id)} disabled={pending}>
          Confirm
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ConfirmModal

ConfirmModal.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
  grade: PropTypes.string,
  title: PropTypes.string,
  _id: PropTypes.string,
  refetch: PropTypes.func,
}
