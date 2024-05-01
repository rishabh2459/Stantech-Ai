import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import {
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from "react-native-google-places-autocomplete";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_API_KEY } from "./google_api_key";
import Geolocation from "@react-native-community/geolocation";
import { watcher } from "../metro.config";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_POSITION = {
  latitude: 28.6139,
  longitude: 77.2088,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

function InputAutocomplete({ label, placeholder, onPlaceSelected }) {
  return (
    <>
      <Text>{label}</Text>
      <GooglePlacesAutocomplete
        styles={{ textInput: styles.input }}
        placeholder={placeholder || ""}
        fetchDetails
        onPress={(data, details = null) => {
          // console.log(data);
          onPlaceSelected(details);
        }}
        query={{
          key: GOOGLE_API_KEY,
          language: "en",
        }}
      />
    </>
  );
}

export default function Maps({ route }) {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [showDirections, setShowDirections] = useState(false);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [userPath, setUserPath] = useState([]);
  const [currentuserPath, setCurrentUserPath] = useState([]);
  const [showLocation, setShowLocation] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    console.log(showLocation);
    // Function to get current location
    const getCurrentLocation = () => {
      if(showLocation == true){
      Geolocation.getCurrentPosition(
        (position) => {
          console.log(position, "posi");
          const { latitude, longitude } = position.coords;
          const currentPosition = {
            latitude,
            longitude,
          };
          setOrigin(currentPosition);
          setCurrentUserPath(currentPosition);
          setUserPath((prevPath) => [...prevPath, currentPosition]);
          moveTo(currentPosition);
        },
      );
    }
    };
  
    getCurrentLocation();

    const intervalId = setInterval(getCurrentLocation, 600000);
  
    return () => clearInterval(intervalId);
  }, [showLocation]);

  const traceRouteOnReady = (args) => {
    if (args) {
      setDistance(args.distance);
      setDuration(args.duration);
    }
  };

  const traceRoute = () => {
    if (origin && destination) {
      setShowDirections(true);
      mapRef.current?.fitToCoordinates([currentuserPath, userPath], {
        edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
      });
    }
  };

  const onPlaceSelected = (details, flag) => {
    // console.log(details);
    const set = flag === "origin" ? setOrigin : setDestination;
    const position = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
    };
    set(position);
    moveTo(position);
  };

  const moveTo = async (position) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }
  };

  const locationupdate = () => {
    setUserPath([]);
    setShowLocation(false);
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_POSITION}
      >
        {/* {origin && <Marker coordinate={origin} />} */}
        {/* {destination && <Marker coordinate={destination} />} */}
        {showDirections && origin && destination && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_API_KEY}
            strokeColor="#6644ff"
            strokeWidth={4}
            onReady={traceRouteOnReady}
          />
        )}
        <Polyline
          coordinates={userPath}
          strokeWidth={4}
          strokeColor="#FF0000"
        />
        {userPath.length > 0 && <Marker image={require("../screens/image/Red_Arrow_Left.png")} coordinate={userPath[userPath.length - 1]} />}
      </MapView>
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={showLocation == false ? styles.clickButton : styles.clickoutButton} onPress={() => setShowLocation(true)}>
        <Text style={styles.text}>Check in</Text>
      </TouchableOpacity>
      <TouchableOpacity style={showLocation == true ? styles.clickButton : styles.clickoutButton} onPress={() => locationupdate()}>
        <Text style={styles.text}>Check out</Text>
      </TouchableOpacity>
      </View>
      {distance && duration ? (
      <View style={styles.searchContainer}>
        {/* <InputAutocomplete
          label="Origin"
          onPlaceSelected={(details) => onPlaceSelected(details, "origin")}
        />
        <InputAutocomplete
          label="Destination"
          onPlaceSelected={(details) => onPlaceSelected(details, "destination")}
        />
        <TouchableOpacity style={styles.button} onPress={traceRoute}>
          <Text style={styles.buttonText}>Trace route</Text>
        </TouchableOpacity> */}
      
          <View>
            <Text>Distance: {distance.toFixed(2)}</Text>
            <Text>Duration: {Math.ceil(duration)} min</Text>
          </View>
      </View>
        ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "90%",
  },
  searchContainer: {
    position: "absolute",
    width: "90%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
    top: 20,
  },
  input: {
    borderColor: "#888",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#bbb",
    paddingVertical: 12,
    marginTop: 16,
    borderRadius: 4,
  },
  buttonText: {
    textAlign: "center",
  },

  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
     },
     clickButton:{
       backgroundColor: 'green',
       width: '30%',
       borderRadius: 8,
       height: 30,
       justifyContent: 'center',
       alignItems: 'center',
       margin: 10
     },
     clickoutButton: {
      backgroundColor: 'red',
      width: '30%',
      borderRadius: 8,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10
     },
     text: {
       color: 'white',
       alignSelf: 'center',
       textAlign: 'center',
       justifyContent: 'center',
     }
});
