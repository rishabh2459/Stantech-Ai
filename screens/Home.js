import { PermissionsAndroid, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Geolocation from '@react-native-community/geolocation';

const Home = ({navigation}) => {
  const [checkinCurrent, setCheckinCurrent] = useState("")

    const requestSmsAndDialerPermissions = async () => {
        try {
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            PermissionsAndroid.PERMISSIONS.CAMERA,
          ]);
          if (
            granted['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED &&            granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED
          ) {
            console.log('SMS and dialer permissions granted');
          } else {
            // requestSmsAndDialerPermissions();
            console.log('Some permissions were not granted');
          }
        } catch (err) {
          console.warn(err);
        }
      };
    
      useEffect(()=> {
        requestSmsAndDialerPermissions();
      },[])
      

    const checkin = () => {
      Geolocation.getCurrentPosition(info => {
        console.log(info.coords),
        setCheckinCurrent(info.coords),
        navigation.navigate("Maps", info.coords)
      }
      )
    }

      // console.log(location);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => checkin()}>
        <Text style={styles.text}>Check in</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => checkin()}>
        <Text style={styles.text}>Check out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
 display: 'flex',
 justifyContent: 'center',
 alignItems: 'center'
  },
  button:{
    backgroundColor: 'green',
    width: '30%',
    borderRadius: 8,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  text: {
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  }
})