import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { selectCareer, setKeywords, clearKeywords } from '../career/index'
import CareerBlock from '../career/CareerBlock'
import Masonry from 'react-masonry-css'
import { Spinner } from './index'
import {
  CButton,
  CFormControl,
  CInputGroup,
  CFormSelect,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Pagination from '@material-ui/lab/Pagination'
import { selectLogin } from '../../../slices/loginSlice'
let datas = []
const Recruitment = () => {
  const dispatch = useDispatch()
  const { isAuth } = useSelector(selectLogin)
  const [isModal, setIsModal] = useState(true)
  const [showData, setShowData] = useState({ data: [], maxPage: 0 })
  const own = location.pathname.search('own') > 0 ? true : false // annto
  const { keywords } = useSelector(selectCareer)
  const [isPending, setIsPending] = useState(true)
  const [page, setPage] = useState(1)
  const postsPerPage = 9
  const breakpointColumnsObj = {
    default: 2,
    1100: 2,
    500: 1,
  }
  const switchType = (e) => {
    let tt = e.target.value
    if (tt === 'both') {
      setShowData({ maxPage: showData.maxPage, data: datas })
    } else {
      setShowData({
        maxPage: showData.maxPage,
        data: datas.filter((data) => data.title.type === tt),
      })
    }
  }
  const searchData = (e) => {
    e.preventDefault()
    if (keywords) {
      setIsPending(true)
      axios
        .post('/api/smartsearchRecruitment', { keyword: keywords, perpage: 99 })
        .then((res) => {
          datas = res.data.data
          setShowData({ maxPage: showData.maxPage, data: datas })
          setIsPending(false)
        })
        .catch((err) => {
          err.response.data.description && alert('錯誤\n' + err.response.data.description)
        })
    } else {
      getData()
    }
  }
  const getData = () => {
    setIsPending(true)
    dispatch(clearKeywords())
    axios
      .post('/api/showRecruitment', { page, perpage: postsPerPage })
      .then((res) => {
        if (res.data.data.length !== 0) {
          datas = res.data.data
          console.log(datas)
          setShowData({ maxPage: showData.maxPage, data: datas })
        }
        setIsPending(false)
      })
      .catch((err) => {
        err.response.data.description && alert('錯誤\n' + err.response.data.description)
      })
  }
  useEffect(() => {
    getData()
  }, [page])

  return (
    <>
      <CModal size="xl" visible={isModal} onDismiss={() => setIsModal(false)} alignment="center">
        <CModalHeader onDismiss={() => setIsModal(false)}>
          <CModalTitle>免責聲明</CModalTitle>
        </CModalHeader>
        <CModalBody>
          此網站主要目的為提供系友和學生之間的交流與互助窗口，提供內推機會的學長姐們並不需對申請者負任何責任，也請申請者不要以"練習面試機會"、"投了不虧"等等心態去聯繫學長姐，導致浪費學長姐們的時間與好意，謝謝大家的配合。
        </CModalBody>
        <CModalFooter>
          <CButton color="warning" onClick={() => setIsModal(false)}>
            我瞭解了
          </CButton>
        </CModalFooter>
      </CModal>
      <div
        className="d-flex flex-column justify-content-center align-items-center mb-4"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '500px',
          color: 'white',
        }}
      >
        <div className="display-1">Recruitment</div>
        <div className="d-flex justify-content-center">
          <form className="text-light py-2 my-2 col-9" onSubmit={(e) => searchData(e)}>
            <CInputGroup>
              <CButton
                onClick={() => {
                  clearKeywords()
                  getData()
                }}
                color="light"
              >
                <CIcon icon="cil-home" />
              </CButton>
              <CFormControl
                type="search"
                placeholder={keywords === '' ? 'search for...' : keywords}
                value={keywords}
                onChange={(e) => {
                  dispatch(setKeywords(e.target.value))
                }}
              ></CFormControl>
              <CButton color="light" onClick={(e) => searchData(e)}>
                <CIcon icon="cil-search" />
              </CButton>
            </CInputGroup>
          </form>
          <CInputGroup className="col-2 my-auto" onChange={switchType}>
            <CFormSelect>
              <option value="both">Both</option>
              <option value="intern">Intern</option>
              <option value="fulltime">Fulltime</option>
            </CFormSelect>
          </CInputGroup>
        </div>
      </div>
      <Pagination
        className="my-4 d-flex justify-content-center"
        count={showData.maxPage}
        defaultPage={page}
        page={page}
        color="secondary"
        onChange={(e, val) => {
          window.scrollTo(0, 0)
          setPage(val)
        }}
      />
      {isPending ? (
        <Spinner />
      ) : showData.data.length === 0 ? (
        <div className="display-2 d-flex justify-content-center mt-3 text-white">
          Result not found
        </div>
      ) : (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
          columnAttrs={{
            className: 'should be overridden',
            'data-test': '',
            style: { '--test': 'test', color: 'black' },
          }}
          style={{ display: 'flex' }}
        >
          {showData.data.map(
            (post) =>
              (own || post.hide === undefined || post.hide === false) && (
                <CareerBlock post={post} key={post._id} isAuth={isAuth} />
              ),
          )}
        </Masonry>
      )}
    </>
  )
}

export default Recruitment
