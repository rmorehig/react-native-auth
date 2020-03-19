import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useAuth } from '../context/AuthContext'
import { Button } from 'react-native-elements'
import Spacer from '../components/Spacer'
import { SafeAreaView } from 'react-navigation'

const AccountScreen = () => {
  const { signout } = useAuth()
  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Spacer>
        <Button title="Sign Out" onPress={signout} />
      </Spacer>
    </SafeAreaView>
  )
}

export default AccountScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 200
  },
  link: {
    color: 'blue'
  }
})
