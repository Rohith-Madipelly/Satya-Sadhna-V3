import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import TrackPlayer, {
  Capability,
  State,
  Event,
  RepeatMode,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
  AppKilledPlaybackBehavior,
} from 'react-native-track-player';
import { AppState } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { MapApiTrackToPlayerTrack } from '../app/MainScreens/Music/MapApiTrackToPlayerTrack';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const toast = useToast();

  // Player states
  const playbackState = usePlaybackState();
  const { position, duration } = useProgress();

  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [queue, setQueue] = useState([]);

  const isPlayerInitialized = useRef(false);
  const setupAttempted = useRef(false);

  // --- Setup TrackPlayer ---
  useEffect(() => {
    if (!setupAttempted.current) {
      setupAttempted.current = true;
      setup();
    }

    return () => {
      cleanup();
    };
  }, []);

  const setup = async () => {
    try {
      if (isPlayerInitialized.current) {
        console.log('🎧 TrackPlayer already initialized');
        return;
      }

      // Check if player is already set up
      let isAlreadySetup = false;
      try {
        const state = await TrackPlayer.getState();
        isAlreadySetup = state !== State.None;
      } catch (error) {
        // Player not setup yet
        console.log('🎧 Setting up TrackPlayer for first time');
      }

      if (!isAlreadySetup) {
        await TrackPlayer.setupPlayer({ 
          maxCacheSize: 1024 * 10,
          iosCategoryOptions: ['allowBluetooth', 'allowBluetoothA2DP'],
        });

        await TrackPlayer.updateOptions({
          android: {
            appKilledPlaybackBehavior: AppKilledPlaybackBehavior.PausePlayback,
          },
          stopWithApp: false, // Allow background playback
          capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.Stop,
            Capability.SeekTo,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
          ],
          compactCapabilities: [
            Capability.Play, 
            Capability.Pause,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
          ],
          progressUpdateEventInterval: 1,
        });
      }

      // Set default repeat mode
      await TrackPlayer.setRepeatMode(RepeatMode.Off);

      isPlayerInitialized.current = true;
      setIsPlayerReady(true);
      
      // Get initial track if any
      try {
        const activeIndex = await TrackPlayer.getActiveTrackIndex();
        if (activeIndex !== undefined && activeIndex !== null) {
          const track = await TrackPlayer.getTrack(activeIndex);
          setCurrentTrack(track);
        }
      } catch (error) {
        // No active track, which is fine
      }

      console.log('✅ TrackPlayer setup completed');
    } catch (error) {
      console.error('❌ TrackPlayer setup error:', error);
      toast.show('Failed to initialize audio player', { type: 'danger' });
    }
  };

  const cleanup = async () => {
    try {
      if (isPlayerInitialized.current) {
        await TrackPlayer.reset();
        console.log('🧹 TrackPlayer cleanup completed');
      }
    } catch (error) {
      console.error('❌ TrackPlayer cleanup error:', error);
    }
  };

  // --- Track changes & queue management ---
  useTrackPlayerEvents(
    [Event.PlaybackTrackChanged, Event.PlaybackQueueEnded, Event.PlaybackError],
    async (event) => {
      switch (event.type) {
        case Event.PlaybackTrackChanged:
          if (event.nextTrack !== undefined && event.nextTrack !== null) {
            try {
              const track = await TrackPlayer.getTrack(event.nextTrack);
              setCurrentTrack(track);
              console.log('🎵 Track changed:', track?.title);
            } catch (error) {
              console.error('❌ Error getting track info:', error);
            }
          } else {
            setCurrentTrack(null);
          }
          break;

        case Event.PlaybackQueueEnded:
          if (isLooping && currentTrack) {
            try {
              await TrackPlayer.seekTo(0);
              await TrackPlayer.play();
              console.log('🔄 Looping current track');
            } catch (error) {
              console.error('❌ Error looping track:', error);
            }
          }
          break;

        case Event.PlaybackError:
          console.error('❌ Playback error:', event);
          toast.show('Playback error occurred', { type: 'danger' });
          break;
      }
    }
  );

  // --- Handle app state changes ---
  useEffect(() => {
    const subscription = AppState.addEventListener('change', async (nextState) => {
      if (nextState === 'active' && isPlayerReady) {
        try {
          const state = await TrackPlayer.getState();
          console.log('📱 App resumed, player state:', state);
          
          // Refresh current track info
          const activeIndex = await TrackPlayer.getActiveTrackIndex();
          if (activeIndex !== undefined && activeIndex !== null) {
            const track = await TrackPlayer.getTrack(activeIndex);
            setCurrentTrack(track);
          }
        } catch (error) {
          console.error('❌ Error checking player state on app resume:', error);
        }
      }
    });

    return () => subscription?.remove();
  }, [isPlayerReady]);

  // --- Player controls ---
  const playTrack = async (track) => {
    if (!isPlayerReady) {
      console.warn('⚠️ Player not ready');
      return;
    }

    try {
      await TrackPlayer.reset();
      
      const playerTrack = {
        id: track.id,
        url: track.url,
        title: track.title,
        artist: track.artist || 'Unknown Artist',
        artwork: track.artwork,
        duration: track.duration,
      };

      await TrackPlayer.add(playerTrack);
      await TrackPlayer.play();
      setCurrentTrack(playerTrack);
      setQueue([playerTrack]);
      
      console.log('▶️ Playing:', track.title);
    } catch (error) {
      console.error('❌ Error playing track:', error);
      toast.show('Failed to play track', { type: 'danger' });
    }
  };

  const togglePlayPause = async () => {
    if (!isPlayerReady) return;
    
    try {
      const state = await TrackPlayer.getState();
      if (state === State.Playing) {
        await TrackPlayer.pause();
        console.log('⏸️ Paused');
      } else if (state === State.Paused || state === State.Ready) {
        await TrackPlayer.play();
        console.log('▶️ Resumed');
      }
    } catch (error) {
      console.error('❌ Error toggling play/pause:', error);
    }
  };

  const stopTrack = async () => {
    if (!isPlayerReady) return;
    
    try {
      await TrackPlayer.stop();
      await TrackPlayer.reset();
      setCurrentTrack(null);
      setQueue([]);
      console.log('⏹️ Stopped playback');
    } catch (error) {
      console.error('❌ Error stopping playback:', error);
    }
  };

  const seekTo = async (position) => {
    if (!isPlayerReady) return;
    
    try {
      await TrackPlayer.seekTo(position);
    } catch (error) {
      console.error('❌ Error seeking:', error);
    }
  };

  const toggleLoop = async () => {
    const newLooping = !isLooping;
    setIsLooping(newLooping);
    
    try {
      await TrackPlayer.setRepeatMode(
        newLooping ? RepeatMode.Track : RepeatMode.Off
      );
      console.log('🔄 Loop mode:', newLooping ? 'ON' : 'OFF');
    } catch (error) {
      console.error('❌ Error setting repeat mode:', error);
    }
  };

  const toggleMute = async () => {
    if (!isPlayerReady) return;
    
    const newMuted = !isMuted;
    try {
      await TrackPlayer.setVolume(newMuted ? 0.0 : 1.0);
      setIsMuted(newMuted);
      console.log('🔇 Mute:', newMuted ? 'ON' : 'OFF');
    } catch (error) {
      console.error('❌ Error toggling mute:', error);
    }
  };

  const setVolume = async (volume) => {
    if (!isPlayerReady) return;
    
    const safeVolume = Math.max(0, Math.min(1, volume));
    try {
      await TrackPlayer.setVolume(safeVolume);
      setIsMuted(safeVolume === 0);
    } catch (error) {
      console.error('❌ Error setting volume:', error);
    }
  };

  const skipToNext = async () => {
    if (!isPlayerReady) return;
    
    try {
      await TrackPlayer.skipToNext();
      console.log('⏭️ Skipped to next');
    } catch (error) {
      console.error('❌ Error skipping to next:', error);
      // If no next track, could show toast
      if (error.code === 'no_next_track') {
        toast.show('No next track available', { type: 'warning' });
      }
    }
  };

  const skipToPrevious = async () => {
    if (!isPlayerReady) return;
    
    try {
      await TrackPlayer.skipToPrevious();
      console.log('⏮️ Skipped to previous');
    } catch (error) {
      console.error('❌ Error skipping to previous:', error);
      // If no previous track, could show toast
      if (error.code === 'no_previous_track') {
        toast.show('No previous track available', { type: 'warning' });
      }
    }
  };

  const loadQueue = async (trackList) => {
    if (!isPlayerReady || !Array.isArray(trackList) || trackList.length === 0) {
      console.warn('⚠️ Cannot load queue: player not ready or empty track list');
      return;
    }

    try {
      await TrackPlayer.reset();

      const mappedTracks = await MapApiTrackToPlayerTrack(trackList);
      await TrackPlayer.add(mappedTracks);
      
      setQueue(mappedTracks);
      
      // Optionally set first track as current (without playing)
      if (mappedTracks.length > 0) {
        setCurrentTrack(mappedTracks[0]);
      }
      
      console.log(`🎶 Queue loaded with ${mappedTracks.length} tracks`);
    } catch (error) {
      console.error('❌ Error loading queue:', error);
      toast.show('Failed to load playlist', { type: 'danger' });
    }
  };

  const playQueue = async (trackList, startIndex = 0) => {
    if (!isPlayerReady) return;

    try {
      await loadQueue(trackList);
      
      if (startIndex > 0 && startIndex < trackList.length) {
        await TrackPlayer.skip(startIndex);
      }
      
      await TrackPlayer.play();
      console.log(`▶️ Playing queue from index ${startIndex}`);
    } catch (error) {
      console.error('❌ Error playing queue:', error);
      toast.show('Failed to play playlist', { type: 'danger' });
    }
  };

  const getQueueList = async () => {
    if (!isPlayerReady) return [];
    
    try {
      const queueFromPlayer = await TrackPlayer.getQueue();
      setQueue(queueFromPlayer);
      return queueFromPlayer;
    } catch (error) {
      console.error('❌ Error getting queue:', error);
      return [];
    }
  };

  const playTrackById = async (id) => {
    if (!isPlayerReady || !id) return;

    try {
      const currentQueue = await TrackPlayer.getQueue();
      const index = currentQueue.findIndex((track) => track.id === id);

      if (index === -1) {
        console.warn(`⚠️ Track with id "${id}" not found in queue`);
        toast.show('Track not found in queue', { type: 'warning' });
        return;
      }

      await TrackPlayer.skip(index);
      await TrackPlayer.play();
      
      console.log(`▶️ Playing track by ID: ${currentQueue[index]?.title}`);
    } catch (error) {
      console.error('❌ Error playing track by ID:', error);
      toast.show('Failed to play selected track', { type: 'danger' });
    }
  };

  const clearQueue = async () => {
    if (!isPlayerReady) return;
    
    try {
      await TrackPlayer.reset();
      setCurrentTrack(null);
      setQueue([]);
      console.log('🧹 Queue cleared successfully');
    } catch (error) {
      console.error('❌ Error clearing queue:', error);
    }
  };

  const getPlayerState = async () => {
    if (!isPlayerReady) return null;
    
    try {
      return await TrackPlayer.getState();
    } catch (error) {
      console.error('❌ Error getting player state:', error);
      return null;
    }
  };

  // Add method to get current track info
  const getCurrentTrackInfo = async () => {
    if (!isPlayerReady) return null;
    
    try {
      const activeIndex = await TrackPlayer.getActiveTrackIndex();
      if (activeIndex !== undefined && activeIndex !== null) {
        return await TrackPlayer.getTrack(activeIndex);
      }
      return null;
    } catch (error) {
      console.error('❌ Error getting current track info:', error);
      return null;
    }
  };

  // --- Context value ---
  const contextValue = useMemo(
    () => ({
      // State
      currentTrack,
      playbackState,
      isPlaying: playbackState.state === State.Playing,
      isPaused: playbackState.state === State.Paused,
      isLoading: playbackState.state === State.Loading || playbackState.state === State.Buffering,
      isPlayerReady,
      isMuted,
      isLooping,
      position,
      duration,
      queue,

      // Controls
      loadQueue,
      playQueue,
      getQueueList,
      playTrack,
      playTrackById,
      togglePlayPause,
      stopTrack,
      clearQueue,
      seekTo,
      toggleLoop,
      toggleMute,
      setVolume,
      skipToNext,
      skipToPrevious,
      getPlayerState,
      getCurrentTrackInfo,
    }),
    [
      currentTrack,
      playbackState,
      isPlayerReady,
      isMuted,
      isLooping,
      position,
      duration,
      queue,
    ]
  );

  return (
    <AudioContext.Provider value={contextValue}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};