import React from 'react'
import PropTypes from 'prop-types'
import { CModal, CModalBody, CModalHeader, CModalFooter, CModalTitle, CButton } from '@coreui/react'

const ConfirmModal = ({ visible, setVisible, deleteArticle }) => {
  return (
    <CModal alignment="center" visible={visible} onDismiss={() => setVisible(false)}>
      <CModalHeader>
        <CModalTitle>Are you sure to delete this abroad sharing data?</CModalTitle>
      </CModalHeader>
      <CModalBody>
        You are trying to delete a abroad sharing data. The operation is irrevertible. Click confirm
        button to continue.
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Cancel
        </CButton>
        <CButton
          color="danger"
          onClick={() => {
            deleteArticle()
            setVisible(false)
          }}
        >
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
  deleteArticle: PropTypes.func,
}
