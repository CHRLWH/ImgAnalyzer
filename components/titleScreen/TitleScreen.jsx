import React, { useEffect, useRef } from 'react';
import { SafeAreaView, Text, StyleSheet, Animated, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Circle } from 'react-native-svg';

const TitleScreen = () => {
  const navigation = useNavigation();
  const scale = useRef(new Animated.Value(1)).current;
  const backgroundColorValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(backgroundColorValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false, // color animations don't support native driver
      })
    ).start();
  }, []);

  const backgroundColor = backgroundColorValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#f60101ff', '#ff0000ff'], // Slightly different shades for visible animation
  });

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    setTimeout(() => {
      navigation.navigate('Home');
    }, 500);
  };

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      <SafeAreaView style={styles.safeArea}>
        <Svg height="100%" width="100%" style={styles.particlesContainer}>
          {[...Array(20)].map((_, i) => (
            <Circle
              key={i}
              cx={Math.random() * 400}
              cy={Math.random() * 800}
              r={Math.random() * 5 + 2}
              fill="rgba(255,255,255,0.7)"
            />
          ))}
        </Svg>
        <Image source={require('../../assets/logoCimpa.png')} style={{ width: 200, height: 200 }} />
        <Text style={styles.title}>ImgAnalyzer</Text>
        <Animated.View style={{ transform: [{ scale }] }}>
          <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handlePress}
            style={styles.boton}
          >
            <Text style={styles.botonTexto}>Entrar</Text>
          </Pressable>
        </Animated.View>
      </SafeAreaView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  particlesContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#3a4251',
    textAlign: 'center',
    marginVertical: 20,
  },
  boton: {
    backgroundColor: '#ffffffff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
    marginTop: 40,
  },
  botonTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TitleScreen;