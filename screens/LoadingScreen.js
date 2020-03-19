import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { useAuth } from '../context/AuthContext'

const LoadingScreen = () => {
  const { tryLocalSignin } = useAuth()
  useEffect(() => {
    tryLocalSignin()
  }, [])
  return null
}

export default LoadingScreen

const styles = StyleSheet.create({})
