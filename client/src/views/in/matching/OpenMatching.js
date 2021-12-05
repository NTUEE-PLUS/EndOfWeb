/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
<<<<<<< HEAD
import { CFormCheck, CButton } from '@coreui/react'
=======
import { CFormCheck } from '@coreui/react'
>>>>>>> 4149590 (Simple open matching (#153))

const OpenMatching = ({ setOpened }) => {
  const [identity, setIdentity] = useState('')
  let tempIdentity = ''
  return (
<<<<<<< HEAD
    <div className="OpenMatching w-50">
=======
<<<<<<< HEAD
    <div className="OpenMatching p-5 rounded bg-white text-black w-50 mx-auto mt-5">
>>>>>>> 8fb0865 (Simple open matching (#153))
      {identity === '' ? (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h1 className="my-5">
            歡迎使用留學交流（原EE Chain）功能！
            <br />
            您是第一次開通，所以請選擇您的身份
          </h1>
          <br />
          <div className="d-flex align-items-around justify-content-around mb-5">
            <div className="col-6 h4 px-2">
=======
    <div className="OpenMatching" style={{ color: 'white' }}>
      {identity === '' ? (
        <div>
          <h2>歡迎使用留學交流（原EE Chain）功能！ 您是第一次開通，所以請選擇您的身份</h2>
          <div className="d-flex">
            <div className="col-5">
>>>>>>> 4149590 (Simple open matching (#153))
              <CFormCheck
                type="radio"
                name="identity"
                value="senior"
                id="senior"
                label="我是學長姊"
<<<<<<< HEAD
                className="my-1 d-flex justify-content-center align-items-center"
=======
>>>>>>> 4149590 (Simple open matching (#153))
                onChange={(e) => (tempIdentity = e.target.value)}
              />
              已有申請學校或在國外工作等等的經驗，願意回來幫助學弟妹出國、與其他已畢業學長姐交流。
            </div>
<<<<<<< HEAD
            <div className="col-6 h4 px-3 left-part">
=======
            <div className="col-5">
>>>>>>> 4149590 (Simple open matching (#153))
              <CFormCheck
                type="radio"
                name="identity"
                value="junior"
                id="junior"
                label="我是學弟妹"
<<<<<<< HEAD
                className="my-1 d-flex justify-content-center align-items-center"
=======
>>>>>>> 4149590 (Simple open matching (#153))
                onChange={(e) => (tempIdentity = e.target.value)}
              />
              想申請出國希望能多得到學長姊的經驗，未來出國後將再把經驗流傳給下一屆！
            </div>
          </div>
<<<<<<< HEAD
          <br />
          <CButton onClick={() => setIdentity(tempIdentity)}>下一步</CButton>
        </div>
      ) : identity === 'senior' ? (
        <div className="d-flex flex-column align-items-center justify-content-center">
          <h2>
            學長姐您好，欲開通 EE Chain ，請完成下列事項：
            <br />
            <br />
            請於9/20前填妥 「
            <a
              target="_blank"
              rel="noreferrer"
              href="https://docs.google.com/forms/d/e/1FAIpQLScOJj5lN4sIb_ppYKVT4QiHLZiZ8satlHcd0bln2Kp4PHBnYw/viewform?fbclid=IwAR1X4jzLa1dLyYq1SuVS-TC-F0z77O6h54weANgHLhw5snpaVsV3Gk1CUwM"
            >
              當年留學申請經驗
            </a>
            」 我們才會幫您配對您的學弟妹哦！
            <br />
            <br />
            完成後，請按下方『確認送出』
          </h2>
=======
          <button onClick={() => setIdentity(tempIdentity)}>下一步</button>
        </div>
      ) : identity === 'senior' ? (
        <div>
          學長姐您好，欲開通 EE Chain ，請完成下列事項 請於9/20前填妥 「
          <a href="https://docs.google.com/forms/d/e/1FAIpQLScOJj5lN4sIb_ppYKVT4QiHLZiZ8satlHcd0bln2Kp4PHBnYw/viewform?fbclid=IwAR1X4jzLa1dLyYq1SuVS-TC-F0z77O6h54weANgHLhw5snpaVsV3Gk1CUwM">
            當年留學申請經驗
          </a>
          」 我們才會幫您配對您的學弟妹哦！ 完成後，請按下方『確認送出』
>>>>>>> 4149590 (Simple open matching (#153))
          <br />
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              console.log('open')
              setOpened(true)
            }}
          >
            確認送出
          </button>
        </div>
      ) : (
<<<<<<< HEAD
        <div className="d-flex flex-column align-items-center justify-content-center">
          <h2>
            學弟妹您好，欲開通 EE Chain ，請完成下列事項
            <br />
            <br />
            請於9/20前填妥
            <a
              target="_blank"
              rel="noreferrer"
              href="https://docs.google.com/forms/d/e/1FAIpQLSeP3_IwQIQYiB5yRxNq53c0j77N9EasbdlWbXRhRNTsvxl1CA/viewform?fbclid=IwAR1X4jzLa1dLyYq1SuVS-TC-F0z77O6h54weANgHLhw5snpaVsV3Gk1CUwM"
            >
              留學申請資料
            </a>
            我們才會幫您配對輔導您的學長姐哦！
            <br />
            <br />
            完成後，請按下方『確認送出』
          </h2>
=======
        <div>
          學弟妹您好，欲開通 EE Chain ，請完成下列事項 請於9/20前填妥
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP3_IwQIQYiB5yRxNq53c0j77N9EasbdlWbXRhRNTsvxl1CA/viewform?fbclid=IwAR1X4jzLa1dLyYq1SuVS-TC-F0z77O6h54weANgHLhw5snpaVsV3Gk1CUwM">
            留學申請資料
          </a>
          我們才會幫您配對輔導您的學長姐哦！ 完成後，請按下方『確認送出』
>>>>>>> 4149590 (Simple open matching (#153))
          <br />
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              console.log('open')
              setOpened(true)
            }}
          >
            確認送出
          </button>
        </div>
      )}
    </div>
  )
}
OpenMatching.propTypes = {
  setOpened: PropTypes.func,
}
export default OpenMatching
