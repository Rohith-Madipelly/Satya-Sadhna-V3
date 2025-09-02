// In App.js in a new project
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './src/app';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import TrackPlayer from 'react-native-track-player';
import { playbackService } from './services/PlaybackService';
import { AudioProvider } from './src/contextAPI/AudioContext';
import { useFonts } from 'expo-font';

export default function App() {
  // Register the playback service
  TrackPlayer.registerPlaybackService(() => playbackService);
  return (
    <Provider store={store}>
      <AudioProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </AudioProvider>
    </Provider>
  );
}