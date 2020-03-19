import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

const TrackListScreen = ({ navigation }) => {
  return (
    <View>
      <Text></Text>
      <Button
        title="Go to Track Detail"
        onPress={() => navigation.navigate('TrackDetail')}
      />
    </View>
  )
}

export default TrackListScreen

const styles = StyleSheet.create({})
