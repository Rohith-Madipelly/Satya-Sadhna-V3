import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAudio } from '../../../contextAPI/AudioContext';
import PlayIcon from '../../../assets/SVGS/MusicPlayer/Player/PlayIcon';
import PauseIcon from '../../../assets/SVGS/MusicPlayer/Player/PlayIcon'
import Metrics from '../../../utills/ResposivesUtils/Metrics';
import { MovingText } from '../../../components/UI/MovingText';
import { Feather, Ionicons } from '@expo/vector-icons';
import Pause from '../../../assets/SVGS/MusicPlayer/Player/Pause';

const FloatingPlayer = ({ style }) => {
  const navigation = useNavigation();
  const { currentTrack, isPlaying, togglePlayPause, stopTrack } = useAudio();

  // console.log("currentTrack",currentTrack)
  // Don't render if no track is loaded
  if (!currentTrack) {
    return null;
  }

  const handlePress = () => {
    // Navigate to AudioScreen with the current track ID
    navigation.navigate('AudioScreen', {
      id: currentTrack.id,
      download: false
    });
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={handlePress} style={styles.trackInfo}>
        <Image
          source={{ uri: currentTrack.artwork }}
          style={styles.artwork}
        // defaultSource={require('../../../assets/Image/')}
        />
        <View style={styles.textContainer}>
          <View
            style={{
              overflow: 'hidden',
              justifyContent: "center"
            }}
          >
            <MovingText
              text={currentTrack.title ?? ''}
              animationThreshold={30}
              style={[style.title, {
                color: "white",
              }]}
              isCenter={false}
            />
          </View>

          <Text style={styles.artist} numberOfLines={1}>
            {currentTrack.artist || 'Unknown Artist'}
          </Text>
        </View>

      </TouchableOpacity>

      <TouchableOpacity onPress={togglePlayPause} style={styles.playButton}>
        {isPlaying ? <Pause /> : <PauseIcon />}
      </TouchableOpacity>
      <TouchableOpacity style={styles.playButton}
        onPress={stopTrack}
      >
        <Feather name="square" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    marginHorizontal: 16,
    backgroundColor: '#030370',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  trackInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  artwork: {
    width: 40,
    height: 40,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Gabarito-VariableFont',
  },
  artist: {
    color: '#cccccc',
    fontSize: 12,
    marginTop: 2,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
});

export default FloatingPlayer;