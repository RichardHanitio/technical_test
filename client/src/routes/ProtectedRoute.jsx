import React from 'react'
import { Navigate } from 'react-router-dom'
import {useSnackbar} from "notistack"
import {useSelector, useDispatch} from "react-redux"

import {selectAuth, logout} from "../state/auth/authSlice"

const ProtectedRoute = ({children, redirectPath, msg}) => {
  const {isLoggedIn} = useSelector(selectAuth);
  const {enqueueSnackbar} = useSnackbar();

  if (!isLoggedIn) {
    enqueueSnackbar(msg, {variant : "warning"})
    return <Navigate to={redirectPath} replace />
  }
  return children
}

export default ProtectedRoute