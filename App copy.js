// In App.js in a new project
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './src/app';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </Provider>
  );
}