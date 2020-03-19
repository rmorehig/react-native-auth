import React, { useEffect } from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'
import { useAuth } from '../context/AuthContext'

const LoadingScreen = () => {
  const { tryLocalSignin } = useAuth()

  useEffect(() => {
    tryLocalSignin()
  }, [])

  return <ActivityIndicator />
}

export default LoadingScreen

const styles = StyleSheet.create({})
