import { Alert, Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useAudio } from '../../../contextAPI/AudioContext';
import { MovingText } from '../../../components/UI/MovingText';
import Slider from '@react-native-community/slider';
import { MusicPlayerTimeFormat } from '../../../utills/TimeFormats';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomStatusBar from '../../../components/UI/CustomStatusBar/CustomStatusBar';
import UnMuteIcon from '../../../assets/SVGS/MusicPlayer/UnMuteIcon';
import MuteIcon from '../../../assets/SVGS/MusicPlayer/MuteIcon';
import { useToast } from 'react-native-toast-notifications';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

const { width } = Dimensions.get('window');
const AudioScreen = () => {

  const { loadQueue, playTrack, currentTrack, isPlaying, position, duration, playTrackById, seekTo, togglePlayPause, playbackState, skipToNext, skipToPrevious, safeSkipToPrevious, isMuted, toggleMute, isLooping, toggleLoop } = useAudio();



  // const didSkip =  safeSkipToPrevious()
  const insets = useSafeAreaInsets();
  const navigate = useNavigation()

  const [positionx, setPositionx] = useState(0)

  const toast = useToast()

  const [downloadLoading, setDownloadLoading] = useState(false)
  const SatyaSadhnaDownload = "SatyaSadhnaDownloadFilesRohekk"

  const navigation = useNavigation()

  const downloadAudio = async (audioUrl, fileName, id) => {
    try {
      setDownloadLoading(true);
      const storedFiles = await AsyncStorage.getItem(SatyaSadhnaDownload);
      const downloadedFiles = storedFiles ? JSON.parse(storedFiles) : [];
      const isAlreadyDownloaded = downloadedFiles.some((file) => file.id === id);
      if (isAlreadyDownloaded) {
        toast.show('This file has already been downloaded', { type: 'warning' });
        return;
      }

      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        toast.show('Permission denied for media library access', { type: 'danger' });
        return;
      }

      const fileUri = FileSystem.documentDirectory + fileName;
      const { uri } = await FileSystem.downloadAsync(audioUrl, fileUri);
      const newDownload = { id, name: fileName, musicURL: uri, fileType: 'audio' };
      const updatedFiles = [...downloadedFiles, newDownload];
      await AsyncStorage.setItem(SatyaSadhnaDownload, JSON.stringify(updatedFiles));
      Alert.alert(
        'Download complete',
        'The file has been downloaded successfully.',
        [
          { text: 'Go to downloads', onPress: () => navigation.navigate('Downloads') },
          { text: 'OK', onPress: () => { } },
        ]
      );
    } catch (error) {
      console.error('Error downloading file:', error);
      toast.show('Failed to download file', { type: 'danger' });
    } finally {
      setDownloadLoading(false);
    }
  };
  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top, backgroundColor: '#041744ff' }]}>
      {/* Album Art */}


      <CustomStatusBar barStyle={"light-content"} backgroundColor='#041744ff' />
      <View style={{ marginTop: 10, marginHorizontal: 5, justifyContent: 'space-between', flexDirection: 'row' }}>
        <TouchableOpacity
          style={{ backgroundColor: "white", height: 30, width: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}
          onPress={() => {
            navigate.goBack()
          }}
        >
          <Ionicons name="arrow-back" size={20} color="black" />
        </TouchableOpacity>

        <View style={{ justifyContent: 'center', }}>
          <Text style={{ color: 'white', fontSize: 18 }}> {currentTrack?.album}</Text>
        </View>

        <TouchableOpacity
          disabled
          style={{
            // backgroundColor: "white",
            height: 40, width: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center'
          }}
        >
          {/* <Feather name="download" size={24} color="black" /> */}
        </TouchableOpacity>
      </View>


      <View style={[styles.artworkContainer, {}]}>
        <Image
          source={{ uri: currentTrack?.artwork || "" }}
          style={[styles.artwork,]}
          resizeMode="cover"
        />
      </View>

      {/* Track Info */}
      <View style={[styles.trackInfo, {}]}>
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
        {/* <Text style={styles.album} numberOfLines={1}>
          {currentTrack?.album}
        </Text> */}
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        {/* <Text style={styles.timeText}>{MusicPlayerTimeFormat(position)}</Text> */}
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

        {/* <Text style={styles.timeText}>{MusicPlayerTimeFormat(duration)}</Text> */}
      </View>

      <View style={[styles.progressContainer, { justifyContent: 'space-between', width: "90%", alignSelf: 'center' }]}>
        <Text style={styles.timeText}>{MusicPlayerTimeFormat(position)}</Text>


        <Text style={styles.timeText}>{MusicPlayerTimeFormat(duration)}</Text>
      </View>



      {/* Additional Controls */}
      <View style={styles.additionalControls}>
        <TouchableOpacity style={styles.smallButton} onPress={toggleMute}>
          {/* <Ionicons name="shuffle" size={20} color="#ccc" /> */}
          {isMuted ? <MuteIcon /> : <UnMuteIcon />}
        </TouchableOpacity>
        <TouchableOpacity style={styles.smallButton} onPress={toggleLoop}>
          {isLooping ? <Feather name="repeat" size={20} color="white" /> : <Feather name="repeat" size={20} color="gray" />}

        </TouchableOpacity>
        <TouchableOpacity style={styles.smallButton} onPress={() => {
          downloadAudio(currentTrack.url, `${currentTrack.title}.mp3`, currentTrack.id)
          // toast.show("Not yet done")
        }}>
          {/* <Feather name="download" size={24} color="#ccc" /> */}
          <MaterialIcons name="file-download" size={24} color="#ccc" />
          {/* <MaterialIcons name="file-download-done" size={24}  color="#ccc"/> */}
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.smallButton}>
          <Ionicons name="share-outline" size={20} color="#ccc" />
        </TouchableOpacity> */}
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


        <TouchableOpacity
          onPress={skipToNext}
          style={styles.controlButton}
        // disabled={!safeSkipToPrevious}
        >
          <Ionicons name="play-skip-forward" size={35} color="#fff" />
        </TouchableOpacity>
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
    // marginBottom: 30,
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
    // marginBottom: 30,
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
    // width: 45,
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
    // backgroundColor: '#333',
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