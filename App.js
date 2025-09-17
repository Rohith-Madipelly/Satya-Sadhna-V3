// In App.js in a new project
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './src/app';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

import { AudioProvider } from './src/contextAPI/AudioContext';
import Metrics from './src/utills/ResposivesUtils/Metrics';
import { ToastProvider } from 'react-native-toast-notifications';

export default function App() {

  return (
    <Provider store={store}>

      <AudioProvider>
        <ToastProvider
          placement="bottom"
          duration={5000}
          animationType='slide-in'
          animationDuration={250}
          successColor="green"
          dangerColor="red"
          warningColor="orange"
          offset={50} // offset for both top and bottom toasts
          offsetTop={1}
          offsetBottom={Metrics.rfv(70)}
          swipeEnabled={true}
        >
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
        </ToastProvider>
      </AudioProvider>
    </Provider>
  );
}