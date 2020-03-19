import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import SignupScreen from './screens/SignupScreen'
import SigninScreen from './screens/SigninScreen'
import TrackCreateScreen from './screens/TrackCreateScreen'
import AccountScreen from './screens/AccountScreen'
import TrackListScreen from './screens/TrackListScreen'
import TrackDetailScreen from './screens/TrackDetailScreen'
import { Provider as AuthProvider } from './context/AuthContext'
import { setNavigator } from './utils/navigation'
import LoadingScreen from './screens/LoadingScreen'

const switchNavigator = createSwitchNavigator({
  Loading: LoadingScreen,
  loginFlow: createStackNavigator({
    Signup: {
      screen: SignupScreen,
      navigationOptions: ({}) => ({
        headerShown: false
      })
    },
    Signin: {
      screen: SigninScreen,
      navigationOptions: ({}) => ({
        headerShown: false
      })
    }
  }),
  mainFlow: createBottomTabNavigator({
    trackListFlow: createStackNavigator({
      TrackList: TrackListScreen,
      TrackDetail: TrackDetailScreen
    }),
    TrackCreate: TrackCreateScreen,
    Account: AccountScreen
  })
})

const App = createAppContainer(switchNavigator)

export default () => {
  return (
    <AuthProvider>
      <App ref={navigator => setNavigator(navigator)} />
    </AuthProvider>
  )
}
