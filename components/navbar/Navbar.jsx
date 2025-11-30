import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import NavbarHome from './navbarHome/NavbarHome';
import NavbarCamera from './navbarCam/NavBarCamera';
import NavbarGallery from './navbarGallery/NavbarGallery';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('home');
  const navigation = useNavigation();

  const handleNavigation = (tab, route) => {
    setActiveTab(tab);
    if (route) {
      navigation.navigate(route);
    }
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
        <View style={styles.navContainer}>
          <NavbarHome
            isActive={activeTab === 'home'}
            onPress={() => handleNavigation('home', 'Home')}
          />
          <NavbarCamera
            isActive={activeTab === 'camera'}
            onPress={() => handleNavigation('camera', 'Camera')}
          />
          <NavbarGallery
            isActive={activeTab === 'gallery'}
            onPress={() => handleNavigation('gallery', 'Gallery')}
          />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    alignSelf: 'center',
    width: '90%',
    height: 100,
    backgroundColor: '#D32F2F',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 50,
    marginHorizontal: '4%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2, // Adjusted for better look
    shadowRadius: 5,
    elevation: 5,
  },
  container: {
    marginHorizontal: '3%',
    marginBottom: '17%',
  },
});

export default Navbar;
