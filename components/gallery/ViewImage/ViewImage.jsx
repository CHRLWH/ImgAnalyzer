import React from 'react';
import { Image, StyleSheet, View, Text, ScrollView, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Icon } from 'react-native-elements';
import Navbar from '../../navbar/Navbar';
import AnimatedButton from '../../buttons/AnimatedButton';
import { API_URL } from '../../constants/config';

const ViewImage = ({ route, navigation }) => {
  const { image } = route.params;
  const imageUrl = `${API_URL}/images/getVisualizableImages/${image.image}`;

  const latitude = parseFloat(image.latitude); // Changed from latitud
  const longitude = parseFloat(image.longitude); // Changed from longitud

  const isValidCoordinate = (val) => typeof val === 'number' && !isNaN(val);
  const showMap = isValidCoordinate(latitude) && isValidCoordinate(longitude);

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/images/delete/${image.id}/`, {
        method: 'DELETE',
      });

      if (response.ok) {
        Alert.alert('Success', 'Image deleted successfully');
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Failed to delete image');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred while deleting the image');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={{ uri: imageUrl }} style={styles.image} />

        <View style={styles.infoContainer}>
          <Text style={styles.title}>{image.name}</Text>
          <Text style={styles.description}>{image.description}</Text>
          <Text style={styles.date}>{image.date}</Text>
          <Text style={styles.points}>
            <Icon name="paid" /> {image.value}
          </Text>
        </View>

        <Text style={styles.locationTitle}>
          {showMap ? 'Location 🗺️' : 'Location not available'}
        </Text>

        {showMap && (
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude,
                longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker
                coordinate={{ latitude, longitude }}
                title={image.name}
                description={image.description}
              />
            </MapView>
          </View>
        )}

        <View style={styles.actions}>
          <AnimatedButton style={styles.button} onPress={handleDelete}>
            <Text style={styles.buttonText}>Delete Image</Text>
          </AnimatedButton>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Navbar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 150,
  },
  image: {
    width: 300,
    height: 250,
    marginBottom: 20,
    borderRadius: 30,
    marginTop: '30%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    // Fixed boxShadow for RN
    shadowColor: 'rgb(243, 175, 175)',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    fontSize: 25,
    textAlign: 'center',
  },
  date: {
    fontSize: 20,
    marginTop: 5,
  },
  points: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
  },
  locationTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 5,
  },
  mapContainer: {
    width: '80%',
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: 20,
    alignSelf: 'center',
    shadowColor: 'rgb(255, 238, 0)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  actions: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#D32F2F',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    width: 200,
    elevation: 4,
    marginBottom: 150,
    shadowColor: 'rgb(255, 166, 138)',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default ViewImage;