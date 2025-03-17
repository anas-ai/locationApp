import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Modal,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import {ICON_IMG} from '../../constants/ImagesConstansts';
import {ScreenName} from '../../constants/ScreenName';
import GetLocation from 'react-native-get-location';

type HomeScreenProps = {
  navigation: any;
};

interface Location {
  latitude: number;
  longitude: number;
}


const HomeScreen = ({navigation}: HomeScreenProps) => {
  const [isModalVisible, setModalVisible] = useState(true);
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState<string | null>(null);
  useEffect(()=>{
    requestLocationPermission()
  },[])


  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'We need access to your location to show nearby stores.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          Alert.alert(
            'Permission Denied',
            'Location access is necessary for the best experience. Please enable it in your settings.',
          );
        }
      } catch (err) {
        console.error('Permission Request Error:', err);
      }
    } else {
      getCurrentLocation();
    }
  };

  // const getCurrentLocation = () => {
  //   setLoading(true);
  //   GetLocation.getCurrentPosition({
  //     enableHighAccuracy: true,
  //     timeout: 60000,
  //   })
  //     .then((location) => {
  //       setLocation({
  //         latitude: location.latitude,
  //         longitude: location.longitude,
  //       });
  //       console.log('Fetched Location:', location);
  //       setModalVisible(false); // Hide modal once location is fetched
  //     })
  //     .catch((error) => {
  //       console.error('Location Error:', error.message);
  //       Alert.alert(
  //         'Location Error',
  //         'Unable to fetch your location. Please try again later.'
  //       );
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  const getCurrentLocation = () => {
    setLoading(true);
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        setLocation({
          latitude: location.latitude,
          longitude: location.longitude,
        });
        console.log('Fetched Location:', location);
        setModalVisible(false); // Hide modal once location is fetched

        // Update the delivery address with the fetched location
      })
      .catch(error => {
        console.error('Location Error:', error.message);
        Alert.alert(
          'Location Error',
          'Unable to fetch your location. Please try again later.',
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleManualSearch = () => {
    setModalVisible(false);
    navigation.navigate(ScreenName.MAP_SCREEN);
  };

  const handleShowOnMap = async () => {
    setLoading(true); // Show loading indicator

    if (location) {
      await navigation.navigate(ScreenName.MAP_SCREEN, {location});
      setLoading(false); // Hide loading indicator after navigating
    } else {
      Alert.alert(
        'Location Error',
        'No location data available to show on the map.',
      );
      setLoading(false); // Hide loading if location is unavailable
    }
  };

  return (
    <SafeAreaView style={styles.globalContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={ICON_IMG.USER_IMG} style={styles.icon} />
        <TouchableOpacity activeOpacity={0.6}>
          <Image source={ICON_IMG.SEARCH_IMG} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Loader */}
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#E53935" />
        </View>
      )}

      {/* Modal for Location Permission */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={ICON_IMG.SEARCH_IMG} style={styles.warningIcon} />
            <Text style={styles.modalTitle}>Location Permission is Off</Text>
            <Text style={styles.modalMessage}>
              We need your location to find the nearest store & provide you a
              seamless delivery experience.
            </Text>
            <TouchableOpacity
              style={styles.enableButton}
              onPress={requestLocationPermission}>
              <Text style={styles.enableButtonText}>Enable Location</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.searchButton}
              onPress={handleManualSearch}>
              <Text style={styles.searchButtonText}>
                Search Your Location Manually
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Location Display (if available) */}

      {location && (
        <View style={{marginVertical: 20}}>
          <Text>
            {deliveryAddress
              ? `Delivery Address: ${deliveryAddress}`
              : 'Fetching your location...'}
          </Text>
        </View>
      )}
      {location && (
        <TouchableOpacity style={styles.enableButton} onPress={handleShowOnMap}>
          <Text style={styles.enableButtonText}>Show on Map</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  globalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  icon: {
    height: 30,
    width: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  warningIcon: {
    height: 50,
    width: 50,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  enableButton: {
    backgroundColor: '#E53935',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  enableButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#E53935',
    fontWeight: 'bold',
    fontSize: 16,
  },
  locationContainer: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginTop: 20,
  },
  locationText: {
    fontSize: 16,
    color: '#333',
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 1,
  },
});

export default HomeScreen;
