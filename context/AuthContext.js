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
    default:
      return state
  }
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
      payload: 'Something went wrong with SignUp'
    })
  }
}

const signin = dispatch => {
  return ({ email, password }) => {}
}

const signout = dispatch => {
  return () => {}
}

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signin,
    signout,
    signup
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
