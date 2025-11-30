import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, View, Image, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import Navbar from '../navbar/Navbar';
import { API_URL } from '../constants/config';

const Home = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [latestImage, setLatestImage] = useState(null);
    const [totalCoins, setTotalCoins] = useState(0);

    useEffect(() => {
        fetch(`${API_URL}/images/getImages`)
            .then((resp) => resp.json())
            .then((imageData) => {
                setImages(imageData);
                setLatestImage(imageData.length > 0 ? imageData[imageData.length - 1] : null);
                const total = imageData.reduce((sum, img) => sum + (img.value || 0), 0);
                setTotalCoins(total);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching images:', error);
                setLoading(false);
            });
    }, []);

    return (
        <SafeAreaProvider style={styles.container}>
            <View style={styles.curvedTop} />
            <SafeAreaView style={styles.contentContainer}>
                <View style={styles.header}>
                    <View style={styles.statContainer}>
                        <Icon name="images" size={40} color="rgb(255, 254, 249)" />
                        <Text style={styles.statText}> x {images.length}</Text>
                    </View>
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../../assets/LogoCimpaPixelado.png')}
                            style={styles.logo}
                        />
                    </View>
                    <View style={styles.statContainer}>
                        <Icon name="cash" size={40} color="rgb(255, 255, 255)" />
                        <Text style={styles.statText}> x {totalCoins}</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Latest Photo</Text>

                {loading ? (
                    <ActivityIndicator size="large" color="#D32F2F" />
                ) : latestImage ? (
                    <Image
                        source={{ uri: `${API_URL}/images/getVisualizableImages/${latestImage.image}` }}
                        style={styles.latestImage}
                        resizeMode="cover"
                    />
                ) : (
                    <Text style={styles.noImageText}>No images available.</Text>
                )}

                <Text style={styles.carouselTitle}>Other Images</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
                    {images.map((item, index) => (
                        <Image
                            key={index}
                            source={{ uri: `${API_URL}/images/getVisualizableImages/${item.image}` }}
                            style={styles.carouselImage}
                            resizeMode="cover"
                        />
                    ))}
                </ScrollView>
            </SafeAreaView>
            <View style={styles.footer}>
                <Navbar />
            </View>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex: 1,
    },
    curvedTop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '23%',
        backgroundColor: '#D32F2F',
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,
        shadowColor: 'rgb(243, 175, 175)',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 5,
    },
    contentContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '70%',
        zIndex: 1,
        marginTop: 10,
        marginBottom: 45,
    },
    statContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        height: 100,
        width: 100,
        zIndex: -1,
        marginTop: 0,
    },
    statText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#fff',
    },
    sectionTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 20,
        shadowColor: 'rgb(252, 210, 73)',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 5,
    },
    latestImage: {
        width: 300,
        height: 200,
        borderRadius: 15,
        marginVertical: 10,
    },
    noImageText: {
        fontSize: 18,
        color: 'gray',
        textAlign: 'center',
        marginTop: 20,
    },
    carouselTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#3a4251',
        marginTop: 20,
        marginBottom: 10,
        shadowColor: 'rgb(252, 210, 73)',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 5,
    },
    carousel: {
        flexDirection: 'row',
        marginTop: 10,
    },
    carouselImage: {
        width: 120,
        height: 100,
        marginHorizontal: 8,
        borderRadius: 10,
    },
    footer: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
    },
});

export default Home;
