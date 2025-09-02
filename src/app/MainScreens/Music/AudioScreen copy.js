import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useAudio } from '../../../contextAPI/AudioContext';
import { MovingText } from '../../../components/UI/MovingText';
import Slider from '@react-native-community/slider';
import { MusicPlayerTimeFormat } from '../../../utills/TimeFormats';


const { width } = Dimensions.get('window');
const AudioScreen = () => {

  const { loadQueue, playTrack, currentTrack, isPlaying,position,duration, playTrackById,seekTo, togglePlayPause, playbackState, skipToNext, skipToPrevious, safeSkipToPrevious } = useAudio();

  console.log("isPlaying", isPlaying,"position",duration)

  // const didSkip =  safeSkipToPrevious()


  const [positionx,setPositionx]=useState(0)
  return (
    <SafeAreaView style={styles.container}>
      {/* Album Art */}
      <View style={styles.artworkContainer}>
        <Image
          source={{ uri: currentTrack?.artwork || "" }}
          style={[styles.artwork,{zIndex:2}]}
          resizeMode="cover"
        />
      </View>

      {/* Track Info */}
      <View style={styles.trackInfo}>
        {/* <Text style={styles.title} numberOfLines={2}>
          {currentTrack.title}
        </Text> */}
        <View
          style={{
            width: 250, // or dynamically calculated width
            overflow: 'hidden',
            justifyContent: "center"
          }}
        >
          <MovingText
            text={currentTrack?.title ?? ''}
            animationThreshold={30}
            // style={styles.trackTitleText}
            style={[{
              color: "white",
              fontSize: 22,
              fontWeight: '700',
              // textAlign:'center'
            }]}
          />
        </View>

        <Text style={styles.artist} numberOfLines={1}>
          {currentTrack?.artist}
        </Text>
        <Text style={styles.album} numberOfLines={1}>
          {currentTrack?.album}
        </Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <Text style={styles.timeText}>{MusicPlayerTimeFormat(position)}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          value={position}
          onSlidingComplete={seekTo}
          minimumTrackTintColor="#fff"
          maximumTrackTintColor="#666"
          thumbStyle={styles.sliderThumb}
        />
        
        <Text style={styles.timeText}>{MusicPlayerTimeFormat(duration)}</Text>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          onPress={skipToPrevious}
          style={styles.controlButton}>
          <Ionicons name="play-skip-back" size={35} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={togglePlayPause}
          style={styles.playButton}>
          <Ionicons
            name={isPlaying ? 'pause' : 'play'}
            size={50}
            color="#fff"
          />
        </TouchableOpacity>

        {/* <Animated.View style={[styles.playButton, animatedStyle]}>
  <TouchableOpacity onPress={togglePlayPause}>
    <Ionicons
      name={isPlaying ? 'pause' : 'play'}
      size={50}
      color="#fff"
    />
  </TouchableOpacity>
</Animated.View> */}


        <TouchableOpacity
          onPress={skipToNext}
          style={styles.controlButton}
          // disabled={!safeSkipToPrevious}
        >
          <Ionicons name="play-skip-forward" size={35} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Additional Controls */}
      <View style={styles.additionalControls}>
        {/* <TouchableOpacity style={styles.smallButton}>
          <Ionicons name="shuffle" size={20} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.smallButton}>
          <Ionicons name="repeat" size={20} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.smallButton}>
          <Ionicons name="heart-outline" size={20} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.smallButton}>
          <Ionicons name="share-outline" size={20} color="#ccc" />
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  )
}

export default AudioScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 20,
  },
  noTrackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noTrackText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  artworkContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  artwork: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: 20,
  },
  trackInfo: {
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  artist: {
    fontSize: 18,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 4,
  },
  album: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  slider: {
    flex: 1,
    height: 40,
    marginHorizontal: 10,
  },
  sliderThumb: {
    backgroundColor: '#fff',
  },
  timeText: {
    color: '#ccc',
    fontSize: 14,
    width: 45,
    textAlign: 'center',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  controlButton: {
    marginHorizontal: 30,
  },
  playButton: {
    backgroundColor: '#333',
    borderRadius: 50,
    padding: 15,
  },
  additionalControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  smallButton: {
    padding: 10,
  },
});