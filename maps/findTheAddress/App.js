import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView, Alert, ActivityIndicator } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'

export default function App() {
  const [address, setAddress] = useState('')
  const [coordinates, setCoordinates] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  })
  // I added loading since getting the user locatin took awile
  const [loading, setLoading] = useState(true)

  const getLocation = () => {
    Location.requestForegroundPermissionsAsync()
    .then(status => {
      console.log(status.status)
      if (status.status != 'granted') {
        Alert.alert('No permission to get location')
        setLoading(false)
        return
      }
    })

    Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High })
    .then(location => {
      console.log(location)
      setCoordinates({
        ...coordinates,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      })
      setLoading(false)
    })
  }

  useEffect(() => {getLocation()}, [])

  const convertToCoordinates = () => {
    fetch(`https://geocode.maps.co/search?q=${address}&api_key=${process.env.EXPO_PUBLIC_API_KEY}`)
    .then(response => response.json())
    .then(response => {
      const { lat, lon } = response[0]
      setCoordinates({
        ...coordinates,
        latitude: Number(lat),
        longitude: Number(lon), 
      })
      setAddress('')
    })
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {loading ? 
        (<ActivityIndicator style={styles.loadingIndicator} size="large" />) : 
        (<MapView 
          style={styles.mapStyle}
          region={{
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            latitudeDelta: coordinates.latitudeDelta,
            longitudeDelta: coordinates.longitudeDelta,
          }}
          >
            <Marker
            coordinate={{
              latitude: coordinates.latitude,
              longitude: coordinates.longitude,
            }}
          />
          </MapView>)
      }
      <View style={styles.inputStyle}>
        <TextInput 
          style={{marginTop: 20, textAlign: 'center'}}
          value={address}
          onChangeText={text => setAddress(text)}
          placeholder='Enter the address'
        />
        <Button 
          title='find address'
          onPress={convertToCoordinates}
        />
      </View>
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: '100%',
    height: '100%',
    flex: 5
  },
  inputStyle: {
    flex: 1
  },
  loadingIndicator: {
    flex: 5,
    marginTop: 70
  }
})
