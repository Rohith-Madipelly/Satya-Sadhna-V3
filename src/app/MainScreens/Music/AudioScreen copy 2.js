import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useAudio } from '../../../contextAPI/AudioContext';

const { width } = Dimensions.get('window');
const AudioScreen = () => {

    const { loadQueue, playTrack, currentTrack, isPlaying, playTrackById, togglePlayPause, playbackState } = useAudio();
  return (
    <SafeAreaView style={styles.container}>
      {/* Album Art */}
      <View style={styles.artworkContainer}>
        <Image
          source={{ uri: currentTrack.artwork }}
          style={styles.artwork}
          resizeMode="cover"
        />
      </View>

      {/* Track Info */}
      <View style={styles.trackInfo}>
        <Text style={styles.title} numberOfLines={2}>
          {/* {currentTrack.title} */}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {/* {currentTrack.artist} */}
        </Text>
        <Text style={styles.album} numberOfLines={1}>
          {/* {currentTrack.album} */}
        </Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        {/* <Text style={styles.timeText}>{formatTime(progress.position)}</Text> */}
        {/* <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={progress.duration}
          value={progress.position}
          onSlidingComplete={handleSeek}
          minimumTrackTintColor="#fff"
          maximumTrackTintColor="#666"
          thumbStyle={styles.sliderThumb}
        /> */}
        {/* <Text style={styles.timeText}>{formatTime(progress.duration)}</Text> */}
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity 
        // onPress={handlePrevious} 
        style={styles.controlButton}>
          <Ionicons name="play-skip-back" size={35} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
        //  onPress={handlePlayPause} 
         style={styles.playButton}>
          {/* <Ionicons
            name={isPlaying ? 'pause' : 'play'}
            size={50}
            color="#fff"
          /> */}
        </TouchableOpacity>

        <TouchableOpacity 
        // onPress={handleNext} 
        style={styles.controlButton}>
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