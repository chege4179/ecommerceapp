
import React ,{useEffect, useState}from "react";
import {Image, TouchableOpacity, View, StyleSheet, Text} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const PlayerWidget = () => {
    const [isPlaying,setIsPlaying] = useState(false)
    const onPlayPause =() => {
        setIsPlaying(!isPlaying)
    }
    return (
        <View style={styles.container}>
            <View style={[styles.progress, { width: '50%'}]} />
            <View style={styles.row}>
                <Image source={{ uri: 'https://picsum.photos/300/300' }} style={styles.image} />
                <View style={styles.rightContainer}>
                    <View style={styles.nameContainer}>
                        <Text style={styles.title}>No Role Modelz</Text>
                        <Text style={styles.artist}>J Cole</Text>
                    </View>

                    <View style={styles.iconsContainer}>
                        <AntDesign name="hearto" size={30} color={"white"}/>
                        <TouchableOpacity onPress={onPlayPause}>
                            <FontAwesome name={isPlaying ? 'play':'pause'} size={30} color={"white"}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#131313',
        width: '103%',
        borderWidth: 2,
        borderColor: 'black',
    },
    progress: {
        height: 4,
        backgroundColor: '#bcbcbc'
    },
    row: {
        flexDirection: 'row',
    },
    image: {
        width: 75,
        height: 75,
        marginRight: 10,
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 100,
        justifyContent: 'space-around'
    },
    title: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        margin: 10,
    },
    artist: {
        color: 'lightgray',
        fontSize: 18,
    }
})
export default PlayerWidget;
