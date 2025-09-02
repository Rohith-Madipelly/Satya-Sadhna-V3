import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useAudio } from '../../contextAPI/AudioContext';

const DeveloperScreenTest1 = () => {
    const { loadQueue, playTrackById, togglePlayPause, playTrack, currentTrack, isPlaying, playbackState } = useAudio();


    const Data = [
        {
            id: 1,
            url: "https://www.satyasadhna.com/upload/audios/1756118293353.mp3",
            title: "Hero Song",
            artist: "artist",
            artwork: "https://picsum.photos/400/400?random=5",
        },
        {
            id: 2,
            url: "https://www.satyasadhna.com/upload/audios/1756118293353.mp3",
            title: "Hero Song",
            artist: "artist",
            artwork: "https://picsum.photos/400/400?random=5",
        }
    ]


    useEffect(() => {
        loadQueue(Data)
    }, [])


    // console.log("currentTrack",currentTrack)

    console.log("isPlaying", isPlaying, "playbackState", playbackState)
    return (
        <View>
            <Text>DeveloperScreenTest1</Text>

            <TouchableOpacity onPress={() => { playTrackById(0) }} style={{ width: 300, height: 30, backgroundColor: "pink" }}>
                <Text>Play</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => { togglePlayPause() }} style={{ width: 300, height: 30, backgroundColor: "pink" }}>
                <Text>stpe</Text>
            </TouchableOpacity>

        </View>
    )
}

export default DeveloperScreenTest1

const styles = StyleSheet.create({})