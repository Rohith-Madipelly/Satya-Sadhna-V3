import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Slider,
  SafeAreaView,
} from 'react-native';
import TrackPlayer, {
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
  Event,
  State,
} from 'react-native-track-player';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const MusicPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const playbackState = usePlaybackState();
  const progress = useProgress();

  // Listen to track changes
  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async (event) => {
    if (event.type === Event.PlaybackActiveTrackChanged && event.index !== null) {
      const track = await TrackPlayer.getTrack(event.index);
      setCurrentTrack(track);
    }
  });

  useEffect(() => {
    const getCurrentTrack = async () => {
      try {
        const trackIndex = await TrackPlayer.getActiveTrackIndex();
        if (trackIndex !== null && trackIndex !== undefined) {
          const track = await TrackPlayer.getTrack(trackIndex);
          setCurrentTrack(track);
        }
      } catch (error) {
        console.log('Error getting current track:', error);
      }
    };
    getCurrentTrack();
  }, []);

  const isPlaying = playbackState.state === State.Playing;

  const handlePlayPause = async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  const handleNext = async () => {
    try {
      await TrackPlayer.skipToNext();
    } catch (error) {
      console.log('No next track available');
    }
  };

  const handlePrevious = async () => {
    try {
      await TrackPlayer.skipToPrevious();
    } catch (error) {
      console.log('No previous track available');
    }
  };

  const handleSeek = async (value) => {
    await TrackPlayer.seekTo(value);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentTrack) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.noTrackContainer}>
          <Text style={styles.noTrackText}>No track selected</Text>
        </View>
      </SafeAreaView>
    );
  }

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
          {currentTrack.title}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {currentTrack.artist}
        </Text>
        <Text style={styles.album} numberOfLines={1}>
          {currentTrack.album}
        </Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <Text style={styles.timeText}>{formatTime(progress.position)}</Text>
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
        <Text style={styles.timeText}>{formatTime(progress.duration)}</Text>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity onPress={handlePrevious} style={styles.controlButton}>
          <Ionicons name="play-skip-back" size={35} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePlayPause} style={styles.playButton}>
          <Ionicons
            name={isPlaying ? 'pause' : 'play'}
            size={50}
            color="#fff"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNext} style={styles.controlButton}>
          <Ionicons name="play-skip-forward" size={35} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Additional Controls */}
      <View style={styles.additionalControls}>
        <TouchableOpacity style={styles.smallButton}>
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
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

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

export default MusicPlayer;