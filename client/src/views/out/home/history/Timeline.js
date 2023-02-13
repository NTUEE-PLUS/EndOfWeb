import React, { useState } from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import history_icon from '../../../../assets/icons/history_icon.png'
import 'react-vertical-timeline-component/style.min.css'
import PropTypes from 'prop-types'
import { CRow, CButton } from '@coreui/react'
import Editor from './Editor'
import { useSelector } from 'react-redux'
import { selectLogin } from '../../../../slices/loginSlice'
import ConfirmModal from './ConfirmModal'
import HistImg from './HistImg'

const Timeline = ({ data, refetch, getImg }) => {
  const [visible, setVisible] = useState(false)
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
  const [delInfo, setDelInfo] = useState({ title: '', grade: '', _id: '' })
  const [add, setAdd] = useState(true)
  const { isAuth, isLogin } = useSelector(selectLogin)
  const canEdit = isAuth && isLogin
  const formTemplate = {
    grade: '',
    title: '',
    people: [{ name: '', img: null }],
  }
  const [dataForm, setDataForm] = useState(formTemplate)

  const deepCopyForm = async ({ people, ...others }) => ({
    ...others,
    people: await Promise.all(
      people.map(async ({ name, queryId }) => ({ name, img: await getImg(queryId) })),
    ),
  })
  const handleDelete = (toDel) => {
    setDelInfo(toDel)
    setConfirmModalOpen(true)
  }

  const EditOnClick = (year) => {
    deepCopyForm(year).then((form) => setDataForm(form))
    setAdd(false)
    setVisible(true)
  }
  return (
    <div
      className="d-flex flex-column jusitfy-contnet-center align-items-center section"
      id="history"
    >
      <CRow className="section-title">
        <h2>History</h2>
      </CRow>
      <VerticalTimeline>
        {data.history.map((year, i) => (
          <VerticalTimelineElement
            key={i}
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
            date={year.grade}
            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            icon={<img src={history_icon} alt="O" className="img-fluid" />}
          >
            {canEdit ? (
              <div className="d-flex justify-content-between">
                <h3 className="vertical-timeline-element-title">{year.title}</h3>
                <div>
                  <CButton
                    onClick={() => EditOnClick(year)}
                    color="success"
                    style={{ marginRight: '0.1em', marginLeft: '0.1em' }}
                  >
                    Edit
                  </CButton>
                  <CButton
                    onClick={() => handleDelete({ ...data.history[i], people: null })}
                    color="danger"
                    style={{ marginRight: '0.1em', marginLeft: '0.1em' }}
                  >
                    Delete
                  </CButton>
                </div>
              </div>
            ) : (
              <h3 className="vertical-timeline-element-title">{year.title}</h3>
            )}

            <div className="row">
              {year.people.map((person) => {
                return (
                  <div
                    key={person.name}
                    className="col d-flex flex-column align-items-center justify-content-between mt-2"
                  >
                    <HistImg getImg={getImg} queryId={person.queryId} alt="" />
                    <h4 className="mt-2">{person.name}</h4>
                  </div>
                )
              })}
            </div>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
      {canEdit && (
        <CButton
          onClick={() => {
            setDataForm(formTemplate)
            setAdd(true)
            setVisible(true)
          }}
          color="success"
          size="lg"
          shape="rounded-pill"
        >
          +
        </CButton>
      )}
      <Editor
        visible={visible && canEdit}
        setVisible={setVisible}
        add={add}
        dataForm={dataForm}
        setDataForm={setDataForm}
        refetch={refetch}
      />
      <ConfirmModal
        visible={confirmModalOpen}
        setVisible={setConfirmModalOpen}
        title={delInfo.title}
        grade={delInfo.grade}
        _id={delInfo._id}
        refetch={refetch}
      />
    </div>
  )
}

export default Timeline
Timeline.propTypes = {
  data: PropTypes.object,
  refetch: PropTypes.func,
  getImg: PropTypes.func,
}
