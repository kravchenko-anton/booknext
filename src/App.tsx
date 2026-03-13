import Navigation from '@/navigation/navigation'
import Toast from '@/ui/toast'
import { Color } from '@/utils/colors'
import { clientStorage } from '@/utils/mmkv-wrapper'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import NetInfo from '@react-native-community/netinfo'
import * as Sentry from '@sentry/react-native'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { onlineManager, QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import * as Updates from 'expo-updates'
import { StatusBar } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import 'react-native-svg'
import 'react-native-url-polyfill/auto'
import '../env-config'

SplashScreen.preventAutoHideAsync();

async function onFetchUpdateAsync() {
  try {
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    }
  } catch (error) {
    console.log(`Error fetching latest Expo update: ${error}`);
  }
}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: "offlineFirst",
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60, // 1 hour
      gcTime: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
  },
});

onlineManager.setEventListener((setOnline) =>
  NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  }),
  
);

Sentry.init({
  dsn: process.env.SENTRY_DNC,
  tracesSampleRate: 1,
  integrations: [Sentry.metrics.metricsAggregatorIntegration()],
});

export const clientPersister = createSyncStoragePersister({
  storage: clientStorage,
});

const App = () => {
  useFonts({
    "FiraSans-Bold": require("../assets/fonts/FiraSans-Bold.ttf"),
    "FiraSans-Light": require("../assets/fonts/FiraSans-Light.ttf"),
    "FiraSans-Regular": require("../assets/fonts/FiraSans-Regular.ttf"),
    "OpenSans-Bold": require("../assets/fonts/OpenSans-Bold.ttf"),
    "OpenSans-Italic": require("../assets/fonts/OpenSans-Italic.ttf"),
    "OpenSans-Regular": require("../assets/fonts/OpenSans-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Italic": require("../assets/fonts/Poppins-Italic.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "PTSerif-Bold": require("../assets/fonts/PTSerif-Bold.ttf"),
    "PTSerif-Italic": require("../assets/fonts/PTSerif-Italic.ttf"),
    "PTSerif-Regular": require("../assets/fonts/PTSerif-Regular.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Italic": require("../assets/fonts/Roboto-Italic.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "SpaceGrotesk-Regular": require("../assets/fonts/SpaceGrotesk-Regular.ttf"),
    "SpaceGrotesk-Light": require("../assets/fonts/SpaceGrotesk-Light.ttf"),
    "SpaceGrotesk-Bold": require("../assets/fonts/SpaceGrotesk-Bold.ttf"),
    "SpaceGrotesk-SemiBold": require("../assets/fonts/SpaceGrotesk-SemiBold.ttf"),
    "SpaceGrotesk-Medium": require("../assets/fonts/SpaceGrotesk-Medium.ttf"),
  });
  
  onFetchUpdateAsync();
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: clientPersister }}
    >
      <GestureHandlerRootView
        style={{
          flex: 1,
          backgroundColor: Color.background,
        }}
      >
        <BottomSheetModalProvider>
          <Navigation />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
      <Toast />
      <StatusBar backgroundColor={Color.background} />
    </PersistQueryClientProvider>
  );
};
export default Sentry.wrap(App);
