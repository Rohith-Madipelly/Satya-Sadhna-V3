import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, SafeAreaView, Dimensions, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// import Slider from '@react-native-community/slider';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { useToast } from 'react-native-toast-notifications';
import { useSelector } from 'react-redux';

import CustomStatusBar from '../../../components/UI/CustomStatusBar/CustomStatusBar';
import LoadingImage from '../../../components/UI/ImageConatiners/LoadingImage';
import { BASE_URL } from '../../../Enviornment';
import PauseIcon from '../../../assets/SVGS/MusicPlayer/Player/Pause';
import PlayIcon from '../../../assets/SVGS/MusicPlayer/Player/PlayIcon';
import MuteIcon from '../../../assets/SVGS/MusicPlayer/Player/MuteIcon';
import UnMuteIcon from '../../../assets/SVGS/MusicPlayer/Player/UnMuteIcon';

import { useAudio } from '../../../contextAPI/AudioContext';
import { useProgress } from 'react-native-track-player';
import Metrics from '../../../utills/ResposivesUtils/Metrics';
import { VideoPageData } from '../../../network/API_Calls'; // Assuming this API call exists
import { CustomAlerts_Continue } from '../../../utills/CustomReuseAlerts.js'; // Assuming this utility exists

const STORAGE_KEY = 'SatyaSadhnaDownload'; // Define the storage key

const AudioScreen = ({ route }) => {
  const { id, download } = route.params || {};
  const navigation = useNavigation();
  const toast = useToast();
  const { width, height } = Dimensions.get('screen');

  // Get token from Redux store
  const token = useSelector((state) => state.login.token);

  // Audio context from hook
  const {
    currentTrack,
    isPlaying,
    togglePlayPause,
    stopTrack,
    seekTo,
    toggleMute,
    isMuted,
    toggleLoop,
    isLooping,
    playTrack
  } = useAudio();

  const progress = useProgress();

  // Local states for metadata and download handling
  const [thumbnail, setThumbnail] = useState('');
  const [title, setTitle] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [spinner, setSpinner] = useState(true);
  const [downloadLoading, setDownloadLoading] = useState(false);

  // Fetch track metadata
  const loadTrackData = useCallback(async () => {
    if (!id) {
      toast.show('Invalid track ID', { type: 'danger' });
      setSpinner(false);
      return;
    }

    setSpinner(true);
    try {
      // Clean token (remove quotes if present)
      const cleanToken = token?.replace(/"/g, '');
      const res = await VideoPageData(cleanToken, id);
      const { postDetails } = res?.data || {};

      if (postDetails) {
        const thumbnailUrl = `${BASE_URL}/${postDetails.thumbnail}`;
        const audioFileUrl = `${BASE_URL}/${postDetails.audioUrl}`;

        setThumbnail(thumbnailUrl);
        setTitle(postDetails.title);
        setAudioUrl(audioFileUrl);

        // Handle download if requested
        if (download) {
          CustomAlerts_Continue(
            'Download',
            'Save this track for offline listening?',
            () => initiateDownload(audioFileUrl, `${postDetails.title}.mp3`)
          );
        }

        // Play the track if it's not already playing
        if (currentTrack?.id !== id) {
          const trackData = {
            id,
            url: audioFileUrl,
            title: postDetails.title,
            artist: 'Satya Sadhna',
            artwork: thumbnailUrl,
          };
          await playTrack(trackData);
        }
      } else {
        toast.show('No track data available', { type: 'warning' });
      }
    } catch (err) {
      console.error('Loading track failed:', err);
      toast.show('Error loading track', { type: 'danger' });
    } finally {
      setSpinner(false);
    }
  }, [id, download, currentTrack, token, playTrack, toast]);

  // Handle download
  const initiateDownload = async (uri, filename) => {
    setDownloadLoading(true);
    try {
      // Check if already downloaded
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      const downloaded = stored ? JSON.parse(stored) : [];

      if (downloaded.some(file => file.id === id)) {
        toast.show('Already downloaded', { type: 'warning' });
        setDownloadLoading(false);
        return;
      }

      // Request permissions
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        toast.show('Storage permission denied', { type: 'danger' });
        setDownloadLoading(false);
        return;
      }

      // Download file
      const fileUri = FileSystem.documentDirectory + filename;
      const downloadResult = await FileSystem.downloadAsync(uri, fileUri);

      if (downloadResult.status === 200) {
        // Save to storage
        const updated = [...downloaded, {
          id,
          name: filename,
          musicURL: downloadResult.uri,
          fileType: 'audio',
          title: title,
          downloadDate: new Date().toISOString()
        }];

        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

        Alert.alert(
          'Downloaded Successfully',
          'Track has been saved to your device.',
          [
            { text: 'Go to Downloads', onPress: () => navigation.navigate('Downloads') },
            { text: 'OK' },
          ]
        );
      } else {
        toast.show('Download failed', { type: 'danger' });
      }
    } catch (err) {
      console.error('Download failed:', err);
      toast.show('Download failed: ' + err.message, { type: 'danger' });
    } finally {
      setDownloadLoading(false);
    }
  };

  useEffect(() => {
    loadTrackData();
  }, [loadTrackData]);

  // Format time helper
  const formatTime = (seconds) => {
    if (!seconds || seconds === 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Check if current track is the one being displayed
  const isCurrent = currentTrack?.id === id;

  if (spinner) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Spinner visible color="#030370" animation="fade" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomStatusBar barStyle="light-content" backgroundColor="rgba(20,0,230,0.5)" />
      <Spinner visible={downloadLoading} color="#030370" animation="fade" />

      <LinearGradient colors={['#1400FF80', '#ffffff30', '#fff']} style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Feather name="arrow-left" size={27} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleLoop}
            style={[styles.loopButton, { backgroundColor: isLooping ? '#030370' : '#cccccc' }]}
            accessibilityLabel={isLooping ? 'Disable loop' : 'Enable loop'}
          >
            <Feather name="repeat" size={20} color={isLooping ? 'white' : 'gray'} />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content(width, height)}>
          {/* <LoadingImage 
            source={{ uri: thumbnail }} 
            style={styles.thumbnail(height)} 
            loaderColor="#030370"
            defaultSource={require('../../../assets/images/default-album-art.png')} // Add a default image
          /> */}

          <Text numberOfLines={2} style={styles.title}>
            {title || 'No Title'}
          </Text>

          {/* Progress Slider */}
          <View style={styles.sliderContainer}>
            {/* <Slider
              minimumValue={0}
              maximumValue={progress.duration || 1}
              value={progress.position || 0}
              minimumTrackTintColor="#030370"
              maximumTrackTintColor="#d3d3d3"
              thumbTintColor="#030370"
              onSlidingComplete={(value) => seekTo(value)}
              disabled={!isCurrent}
            /> */}
            <View style={styles.timeRow}>
              <Text style={styles.timeText}>{formatTime(progress.position)}</Text>
              <Text style={styles.timeText}>{formatTime(progress.duration)}</Text>
            </View>
          </View>

          {/* Controls */}
          <View style={styles.controlsRow}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={toggleMute}
              disabled={!isCurrent}
            >
              {isMuted ? <MuteIcon /> : <UnMuteIcon />}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.playButton}
              onPress={togglePlayPause}
              disabled={!currentTrack}
            >
              {isPlaying && isCurrent ? <PauseIcon /> : <PlayIcon />}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => audioUrl && initiateDownload(audioUrl, `${title}.mp3`)}
              disabled={!audioUrl}
            >
              <Feather name="download" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backButton: {
    padding: 10,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  loopButton: {
    padding: 10,
    borderRadius: Metrics.rfv(20),
  },
  content: (w, h) => ({
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
    marginHorizontal: 20,
  }),
  thumbnail: h => ({
    width: '85%',
    height: h * 0.4,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
  }),
  title: {
    width: '90%',
    marginTop: 20,
    fontSize: 20,
    fontWeight: '600',
    color: '#030370',
    textAlign: 'center',
    fontFamily: 'Gabarito-VariableFont',
  },
  sliderContainer: {
    width: '90%',
    marginVertical: 20,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
    paddingHorizontal: 5,
  },
  timeText: {
    fontSize: 14,
    color: '#030370',
    fontWeight: '500',
  },
  controlsRow: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  controlButton: {
    backgroundColor: '#030370',
    borderRadius: Metrics.rfv(25),
    width: Metrics.rfv(50),
    height: Metrics.rfv(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: '#030370',
    borderRadius: Metrics.rfv(35),
    width: Metrics.rfv(70),
    height: Metrics.rfv(70),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#030370',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default AudioScreen;