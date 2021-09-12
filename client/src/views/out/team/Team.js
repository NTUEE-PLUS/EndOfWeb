/* eslint-disable prettier/prettier */
import React from 'react'
const Team = () => {
  return (
    <div id="team" className="text-center">
      <div className="container">
        <div className="col-md-8 col-md-offset-2 section-title">
          <h2>Meet the Team</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed dapibus leonec.</p>
        </div>
        <div className="row">
          <div className="col-sm-3 col-xs-6 team">
            <div className="thumbnail">
              {' '}
              <img src="https://i.imgur.com/x6Q9l52.png" alt="..." className="team-img img-fluid" />
              <div className="caption">
                <h4>王友廷</h4>
                <p>前端維護負責人</p>
              </div>
            </div>
          </div>
          <div className="col-sm-3 col-xs-6 team">
            <div className="thumbnail">
              {' '}
              <img src="https://i.imgur.com/umMRS1L.png" alt="..." className="team-img img-fluid" />
              <div className="caption">
                <h4>陳君輔</h4>
                <p>後端維護負責人</p>
              </div>
            </div>
          </div>
          <div className="col-sm-3 col-xs-6 team">
            <div className="thumbnail">
              {' '}
              <img src="https://i.imgur.com/IYmBNEr.png" alt="..." className="team-img img-fluid" />
              <div className="caption">
                <h4>余欣澄</h4>
                <p>留學採訪負責人</p>
              </div>
            </div>
          </div>
          <div className="col-sm-3 col-xs-6 team">
            <div className="thumbnail">
              {' '}
              <img src="https://i.imgur.com/edivzlk.png" alt="..." className="team-img img-fluid" />
              <div className="caption">
                <h4>李筠潔</h4>
                <p>留學採訪負責人</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Team
