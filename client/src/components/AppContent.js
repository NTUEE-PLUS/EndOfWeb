import React, { Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import {
  login,
  logout,
  setImgSrc,
  selectLogin,
  clearImgSrc,
  setStudentInfo,
  clearStudentInfo,
} from '../slices/loginSlice'
import axios from 'axios'
import default_male from '../assets/images/default_male.png'
import { AppBackground, AppFallbackRender } from '.'

// routes config
import { routes_out, routes_in, routes_auth } from '../routes'

// for redirecting to login page
const getSearchParamsStr = (searchParams) => {
  if (!Array.isArray(searchParams)) return ''
  const searchParamsObj = new URLSearchParams()
  searchParams.forEach(({ name, value }) => name && searchParamsObj.set(name, value))
  return searchParamsObj.toString()
}
// eslint-disable-next-line react/prop-types
const RedirectEleWithPathLogged = ({ to, ...props }) => {
  const { pathname, search } = useLocation()
  const fullpath = pathname + search
  return (
    <Redirect
      to={`${to}?${getSearchParamsStr([{ name: 'pathFrom', value: fullpath }])}`}
      {...props}
    />
  )
}
// end of redirecting to login page

const AppContent = () => {
  const ContentStyle = {
    maxWidth: `100%`,
    maxHeight: `100%`,
  }

  const dispatch = useDispatch()
  const { isLogin, isAuth } = useSelector(selectLogin)
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    // check login status
    axios
      .post('/api/isLogin', {})
      .then((res) => {
        dispatch(login(res.data.isAuth))
        dispatch(setImgSrc(res.data.userimage === '' ? default_male : res.data.userimage))
        dispatch(setStudentInfo(res.data))
      })
      .catch((err) => {
        dispatch(logout())
        dispatch(clearImgSrc())
        dispatch(clearStudentInfo())
      })
  }, [isLogin])
  return (
    <div style={ContentStyle}>
      <AppBackground />
      <Suspense
        fallback={
          <div className="d-flex flex-row justify-content-center">
            <div className="spinner-border text-primary mt-3" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        }
      >
        <Switch>
          {routes_out.map((route, idx) => {
            return (
              route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={(props) => (
                    <ErrorBoundary fallbackRender={AppFallbackRender}>
                      <route.component {...props} />
                    </ErrorBoundary>
                  )}
                />
              )
            )
          })}
          {/* {!isLogin ? <Redirect to="/home" /> : null} */}
          {routes_in.map((route, idx) => {
            return (
              route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={(props) =>
                    isLogin ? (
                      <ErrorBoundary fallbackRender={AppFallbackRender}>
                        <route.component {...props} />
                      </ErrorBoundary>
                    ) : (
                      <RedirectEleWithPathLogged to="/login" />
                    )
                  }
                />
              )
            )
          })}
          {isAuth
            ? routes_auth.map((route, idx) => {
                return (
                  route.component && (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={(props) => (
                        <>
                          <route.component {...props} />
                        </>
                      )}
                    />
                  )
                )
              })
            : null}
          {/* {isAuth ? (
            <Redirect exact from="/" to="/auth/matching" />
          ) : (
            <Redirect exact from="/" to="/home" />
          )} */}
        </Switch>
      </Suspense>
    </div>
  )
}

export default React.memo(AppContent)
