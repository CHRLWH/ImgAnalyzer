import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, SafeAreaView, Text, StyleSheet, View, Pressable, Dimensions } from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';
import Navbar from '../navbar/Navbar';
import { API_URL } from '../constants/config';

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [search, setSearch] = useState('');
    const navigation = useNavigation();

    const { width } = Dimensions.get('window');
    const imageSize = (width - 60) / 2;
    const scrollViewRef = useRef();

    useEffect(() => {
        const fetchImages = () => {
            fetch(`${API_URL}/images/getImages`, {
                method: 'GET',
            })
                .then((resp) => resp.json())
                .then((imageData) => {
                    setImages(imageData);
                })
                .catch((error) => console.error('Error fetching data', error));
        };

        fetchImages();

        const interval = setInterval(fetchImages, 10000);
        return () => clearInterval(interval);
    }, []);

    const filteredImages = images.filter(item =>
        [item.name, item.date, item.location].some(field =>
            typeof field === 'string' && field.toLowerCase().includes(search.toLowerCase())
        )
    );

    const renderImage = (item, index) => {
        const imageUrl = `${API_URL}/images/getVisualizableImages/${item.image}`;
        return (
            <Pressable
                key={item.id}
                onPress={() => navigation.navigate('ViewImage', { image: item })}
            >
                <Animated.Image
                    entering={FadeIn.delay(100 * index).duration(800)}
                    source={{ uri: imageUrl }}
                    style={[styles.image, { width: imageSize, height: imageSize }]}
                    resizeMode="cover"
                />
            </Pressable>
        );
    };

    const scrollToTop = () => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>GALLERY</Text>

            <SearchBar
                placeholder="Search by name..."
                onChangeText={setSearch}
                value={search}
                containerStyle={styles.searchBar}
                inputContainerStyle={styles.searchInput}
                inputStyle={styles.searchText}
                searchIcon={<Icon name="search" size={22} color="#000" />}
                clearIcon={<Icon name="close" size={22} color="#000" />}
                lightTheme
                round
            />

            <ScrollView ref={scrollViewRef} contentContainerStyle={styles.gallery}>
                <View style={styles.row}>
                    {filteredImages.length > 0 ? (
                        filteredImages.map((item, index) => renderImage(item, index))
                    ) : (
                        <Text style={styles.noResults}>No results found</Text>
                    )}
                </View>
            </ScrollView>

            <Pressable style={styles.floatingButton} onPress={scrollToTop}>
                <FontAwesome name="arrow-up" size={24} color="white" />
            </Pressable>

            <View style={styles.footer}>
                <Navbar />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    searchBar: {
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        padding: 0,
        marginHorizontal: 20,
        marginTop: 30,
    },
    searchInput: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 30,
        height: 45,
        paddingHorizontal: 10,
    },
    searchText: {
        fontSize: 16,
        color: '#000',
    },
    gallery: {
        paddingHorizontal: 25,
        paddingTop: 50,
        paddingBottom: 100,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    image: {
        borderRadius: 15,
        marginBottom: 10,
        shadowColor: 'rgb(255, 217, 0)',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 5,
    },
    footer: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
    },
    title: {
        fontSize: 40,
        marginTop: '20%',
        marginLeft: '10%',
        marginRight: '10%',
        width: '80%',
        fontWeight: 'bold',
        color: '#D32F2F',
        shadowColor: 'rgb(255, 196, 0)',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 5,
        textAlign: 'center',
    },
    noResults: {
        fontSize: 18,
        color: 'gray',
        textAlign: 'center',
        marginTop: 20,
        width: '100%',
    },
    floatingButton: {
        position: 'absolute',
        bottom: 200,
        right: 25,
        backgroundColor: '#D32F2F',
        borderRadius: 50,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
});

export default Gallery;
