import TrackPlayer, { Event } from 'react-native-track-player';

export const playbackService = async () => {
  console.log('🎧 Playback service started');

  // Remote control events
  TrackPlayer.addEventListener(Event.RemotePlay, async () => {
    try {
      await TrackPlayer.play();
      console.log('🎮 Remote play');
    } catch (error) {
      console.error('❌ Remote play error:', error);
    }
  });

  TrackPlayer.addEventListener(Event.RemotePause, async () => {
    try {
      await TrackPlayer.pause();
      console.log('🎮 Remote pause');
    } catch (error) {
      console.error('❌ Remote pause error:', error);
    }
  });

  TrackPlayer.addEventListener(Event.RemoteNext, async () => {
    try {
      await TrackPlayer.skipToNext();
      console.log('🎮 Remote next');
    } catch (error) {
      console.error('❌ Remote next error:', error);
    }
  });

  TrackPlayer.addEventListener(Event.RemotePrevious, async () => {
    try {
      await TrackPlayer.skipToPrevious();
      console.log('🎮 Remote previous');
    } catch (error) {
      console.error('❌ Remote previous error:', error);
    }
  });

  TrackPlayer.addEventListener(Event.RemoteStop, async () => {
    try {
      await TrackPlayer.stop();
      await TrackPlayer.reset();
      console.log('🛑 Remote stop: player stopped and reset');
    } catch (error) {
      console.error('❌ Error handling RemoteStop:', error);
    }
  });

  TrackPlayer.addEventListener(Event.RemoteSeek, async ({ position }) => {
    try {
      await TrackPlayer.seekTo(position);
      console.log('🎮 Remote seek to:', position);
    } catch (error) {
      console.error('❌ Remote seek error:', error);
    }
  });

  TrackPlayer.addEventListener(Event.RemoteJumpForward, async ({ interval }) => {
    try {
      const currentPosition = await TrackPlayer.getPosition();
      const newPosition = currentPosition + interval;
      await TrackPlayer.seekTo(newPosition);
      console.log('🎮 Remote jump forward:', interval);
    } catch (error) {
      console.error('❌ Remote jump forward error:', error);
    }
  });

  TrackPlayer.addEventListener(Event.RemoteJumpBackward, async ({ interval }) => {
    try {
      const currentPosition = await TrackPlayer.getPosition();
      const newPosition = Math.max(0, currentPosition - interval);
      await TrackPlayer.seekTo(newPosition);
      console.log('🎮 Remote jump backward:', interval);
    } catch (error) {
      console.error('❌ Remote jump backward error:', error);
    }
  });

  // Handle playback errors
  TrackPlayer.addEventListener(Event.PlaybackError, async (event) => {
    console.error('❌ Playback error in service:', event);
  });

  // Handle track changes for logging
  TrackPlayer.addEventListener(Event.PlaybackTrackChanged, async (event) => {
    if (event.nextTrack !== undefined && event.nextTrack !== null) {
      try {
        const track = await TrackPlayer.getTrack(event.nextTrack);
        console.log('🎵 Service: Track changed to:', track?.title);
      } catch (error) {
        console.error('❌ Service: Error getting track info:', error);
      }
    }
  });
};