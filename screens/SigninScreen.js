import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useAuth } from '../context/AuthContext'
import AuthForm from '../components/AuthForm'
import NavLink from '../components/NavLink'
import { NavigationEvents } from 'react-navigation'

const SigninScreen = ({ navigation }) => {
  const { state, signin, clearErrorMessage } = useAuth()
  console.log(state)
  return (
    <View style={styles.container}>
      <NavigationEvents onWillBlur={clearErrorMessage} />
      <AuthForm
        headerText="Sign In for Tracker"
        errorMessage={state.errorMessage}
        onSubmit={signin}
        submitButtonText="Sign In"
      />
      <NavLink
        routeName="Signup"
        text="Don't have an account? Sign up instead"
      />
    </View>
  )
}

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

export default SigninScreen
