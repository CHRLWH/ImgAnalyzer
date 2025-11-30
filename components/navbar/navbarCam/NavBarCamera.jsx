import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Alert } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import LoadingOverlay from "../../pantallaDeCarga/loadingScreen";
import AnimatedButton from '../../buttons/AnimatedButton';
import { API_URL } from '../../constants/config';

const NavbarCamera = () => {
  const [loading, setLoading] = useState(false);

  const takePhoto = async () => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      const locationPermission = await Location.requestForegroundPermissionsAsync();

      if (!permission.granted || !locationPermission.granted) {
        Alert.alert("Permiso requerido", "Se necesita acceso a la cámara y ubicación.");
        return;
      }
      const result = await ImagePicker.launchCameraAsync({
        base64: false,
        quality: 0.7,
      });

      if (!result.canceled) {
        const photoUri = result.assets[0].uri;

        const location = await Location.getCurrentPositionAsync({});
        const coords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };

        await uploadImageToDB(photoUri, coords);
      }
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const uploadImageToDB = async (uri, { latitude, longitude }) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("photo", {
        uri,
        name: uri.split("/").pop(),
        type: "image/jpeg",
      });

      formData.append("latitude", latitude.toString());
      formData.append("longitude", longitude.toString());

      const response = await fetch(`${API_URL}/images/uploadImage`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      if (!response.ok) throw new Error(`Error del servidor: ${response.status}`);

      setLoading(false);
      Alert.alert("Imagen Analizada Con Éxito", "La imagen ha sido analizada y guardada.");
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.contenedor}>
      <AnimatedButton onPress={takePhoto} style={styles.iconContainer}>
        <Icon name="add-circle" size={45} color="red" />
      </AnimatedButton>
      <LoadingOverlay visible={loading} message="Analizando Imagen..." />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    backgroundColor: 'white',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NavbarCamera;
