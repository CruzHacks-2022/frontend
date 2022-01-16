import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ImageContext from './hooks/imageContext';
import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';

import DetailsScreen from './screens/DetailsScreen';

const Pic = {
  uri: '',
  isLoading: false,
}

export default function App() {
  const isLoadingComplete = useCachedResources();
  const [uri, setUri] = useState(Pic.uri)
  const [isLoading, setIsLoading] = useState(Pic.isLoading)

  const store = {
    uri: [uri, setUri],
    isLoading: [isLoading, setIsLoading]
  }


  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ImageContext.Provider value={store}>
        <SafeAreaProvider>
          {/* <Navigation />
          <StatusBar /> */}
          <DetailsScreen />
        </SafeAreaProvider>
      </ImageContext.Provider>
    );
  }
}
