import { useContext } from 'react'
import createDataContext from './createDataContext'
import api from '../api'
import { AsyncStorage } from 'react-native'
import { navigate } from '../utils/navigation'

const initialState = { token: null, errorMessage: null }

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SIGNUP_ERROR':
      return {
        ...state,
        errorMessage: action.payload
      }
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        token: action.payload
      }
    case 'SIGNIN_ERROR':
      return {
        ...state,
        errorMessage: action.payload
      }
    case 'SIGNIN_SUCCESS':
      return {
        ...state,
        token: action.payload
      }
    case 'CLEAR_ERROR':
      return {
        ...state,
        errorMessage: null
      }
    case 'SIGNOUT_ERROR':
      return {
        ...state,
        errorMessage: action.payload
      }
    case 'SIGNOUT_SUCCESS':
      return {
        ...state,
        token: null
      }
    default:
      return state
  }
}

const tryLocalSignin = dispatch => async () => {
  const token = await AsyncStorage.getItem('token')
  if (token) {
    dispatch({ type: 'SIGNIN_SUCCESS', payload: token })
    navigate('TrackList')
  } else {
    navigate('loginFlow')
  }
}

const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'CLEAR_ERROR' })
}

const signup = dispatch => async ({ email, password }) => {
  try {
    const response = await api.post('/signup', { email, password })
    await AsyncStorage.setItem('token', response.data.token)
    dispatch({ type: 'SIGNUP_SUCCESS', payload: response.data.token })
    navigate('TrackList')
  } catch (error) {
    dispatch({
      type: 'SIGNUP_ERROR',
      payload: 'Something went wrong with sign up'
    })
  }
}

const signin = dispatch => async ({ email, password }) => {
  try {
    const response = await api.post('/signin', { email, password })
    await AsyncStorage.setItem('token', response.data.token)
    dispatch({ type: 'SIGNIN_SUCCESS', payload: response.data.token })
    navigate('TrackList')
  } catch (error) {
    dispatch({
      type: 'SIGNIN_ERROR',
      payload: 'Something went wrong with sign in'
    })
  }
}

const signout = dispatch => async () => {
  try {
    await AsyncStorage.removeItem('token')
    dispatch({ type: 'SIGNOUT_SUCCESS' })
    navigate('loginFlow')
  } catch (error) {
    dispatch({
      type: 'SIGNOUT_ERROR',
      payload: 'Something went wrong with sign out'
    })
  }
}

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signin,
    signout,
    signup,
    clearErrorMessage,
    tryLocalSignin
  },
  initialState
)

export const useAuth = () => {
  const context = useContext(Context)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}
