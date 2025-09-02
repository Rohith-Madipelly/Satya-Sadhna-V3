import TrackPlayer, { AppKilledPlaybackBehavior, Capability, RepeatMode } from 'react-native-track-player';

class TrackPlayerService {
  async setupPlayer() {
    let isSetup = false;
    try {
      // Check if player is already setup
      const currentTrack = await TrackPlayer.getActiveTrackIndex();
      isSetup = true;
    } catch {
      // Player not setup, continue with setup
    }

    if (!isSetup) {
      try {
        await TrackPlayer.setupPlayer({
          maxCacheSize: 1024 * 10, // 10 MB
        });
        await TrackPlayer.updateOptions({
          android: {
            // appKilledPlaybackBehavior: 'StopPlaybackAndRemoveNotification',
            // This is the default behavior
            appKilledPlaybackBehavior: AppKilledPlaybackBehavior.PausePlayback
          },

          capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
            Capability.SeekTo,
          ],
          compactCapabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
          ],
          progressUpdateEventInterval: 1,
        });
      } catch (error) {
        console.log('Error setting up player:', error);
      }
    }
  }

  async addTracks(tracks) {
    try {
      await TrackPlayer.add(tracks);
      console.log('Tracks added successfully');
    } catch (error) {
      console.log('Error adding tracks:', error);
    }
  }

  async play() {
    try {
      await TrackPlayer.play();
    } catch (error) {
      console.log('Error playing:', error);
    }
  }

  async pause() {
    try {
      await TrackPlayer.pause();
    } catch (error) {
      console.log('Error pausing:', error);
    }
  }

  async skipToNext() {
    try {
      await TrackPlayer.skipToNext();
    } catch (error) {
      console.log('Error skipping to next:', error);
    }
  }

  async skipToPrevious() {
    try {
      await TrackPlayer.skipToPrevious();
    } catch (error) {
      console.log('Error skipping to previous:', error);
    }
  }

  async seekTo(position) {
    try {
      await TrackPlayer.seekTo(position);
    } catch (error) {
      console.log('Error seeking:', error);
    }
  }

  async reset() {
    try {
      await TrackPlayer.reset();
    } catch (error) {
      console.log('Error resetting player:', error);
    }
  }

  async destroy() {
    try {
      await TrackPlayer.destroy();
    } catch (error) {
      console.log('Error destroying player:', error);
    }
  }
}

export default new TrackPlayerService();