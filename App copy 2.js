import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import TrackPlayerService from './services/TrackPlayerService';
import { playbackService } from './services/PlaybackService';

import { sampleTracks } from './music/data/tracks';
import MusicPlayer from './music/components/MusicPlayer';
import 'global';

// Register the playback service
TrackPlayer.registerPlaybackService(() => playbackService);

export default function App() {
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  useEffect(() => {
    const initializePlayer = async () => {
      try {
        await TrackPlayerService.setupPlayer();
        await TrackPlayerService.addTracks(sampleTracks);
        setIsPlayerReady(true);
      } catch (error) {
        console.log('Error initializing player:', error);
      }
    };
    initializePlayer();
    return () => {
      TrackPlayerService.destroy();
    };
  }, []);

  if (!isPlayerReady) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading Player...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      <MusicPlayer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
  },
});