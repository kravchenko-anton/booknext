import { authRoutes } from '@/navigation/auth-routes'
import BottomMenu from '@/navigation/bottom-menu/bottom-menu'
import { fullScreenModalRoutes, modalRoutes } from '@/navigation/modal-routes'
import type { TypeRootStackParameterListType } from '@/navigation/navigation-types'
import { routes } from '@/navigation/user-routes'
import { getRefreshToken } from '@/store/auth/auth-helper'
import { useAuthStore } from '@/store/auth/auth-store'
import { useLibraryStore } from '@/store/reader/library-store'
import { useReadingProgressStore } from '@/store/reader/progress-store'
import { useReactionStore } from '@/store/reader/reaction-store'
import { Loader } from '@/ui'
import { Color } from '@/utils/colors'
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native'
import * as SplashScreen from 'expo-splash-screen'
import { type FC, useEffect, useState } from 'react'
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context'
import { GestureDetectorProvider } from 'react-native-screens/gesture-handler'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'

const authRequiredRoutes = new Set(routes.map((route) => route.name));
const Stack = createNativeStackNavigator<TypeRootStackParameterListType>();

const noBottomMenuRoutes = new Set([
  "Reader",
  "BookImpression",
  "Search",
  "CreateNote",
  "Note",
]);

const Navigation: FC = () => {
  const [latestHistory] = useState(useReadingProgressStore.getState().getInitialHistory()); // eslint-disable-line
  const syncHistory = useReadingProgressStore.getState().syncHistory
 const syncReaction = useReactionStore.getState().syncReactions
  const syncLibrary = useLibraryStore.getState().syncLibrary
  const { user, logout } = useAuthStore((state) => ({
    user: state.user,
    logout: state.logout,
  }));

  const [currentRoute, setCurrentRoute] = useState<
    keyof TypeRootStackParameterListType | undefined
  >(user ? ( "Featured") : "Welcome");

  const navReference =
    useNavigationContainerRef<TypeRootStackParameterListType>();

  const checkRefreshToken = async (
    route: keyof TypeRootStackParameterListType,
  ) => {
    if (!route || !authRequiredRoutes.has(route)) return;
    const refreshToken = await getRefreshToken();
    if (!refreshToken && user) logout();
  };

  useEffect(() => {
    const listener = navReference.addListener("state", () => {
      const route = navReference.getCurrentRoute()
        ?.name as keyof TypeRootStackParameterListType;

      setCurrentRoute(route);
      checkRefreshToken(route);
    });

    return () => navReference.removeListener("state", listener);
  }, []);
  useEffect(() => {
    if (!user) return
    const sync = async () => {
      await syncHistory()
      await syncReaction()
      await syncLibrary();
    }
    sync()
  }, [user])
  return (
    <SafeAreaProvider
      initialMetrics={initialWindowMetrics}
      style={{
        backgroundColor: Color.background,
      }}
    >
      <GestureDetectorProvider>
        <NavigationContainer
          ref={navReference}
          fallback={<Loader />}
          onReady={async () => {
            if (user && latestHistory?.bookId && latestHistory.endProgress > 0 && latestHistory.endProgress < 99) {
              navReference.navigate("Reader", {
                id: latestHistory.bookId,
              })}
            await new Promise((resolve) => setTimeout(resolve, 2000));
             await SplashScreen.hideAsync();
          }}
        >
          <Stack.Navigator
            screenOptions={{
              stackAnimation: "fade",
              headerShown: false,
              statusBarColor: Color.background,
              statusBarTranslucent: false,
              statusBarAnimation: "fade",
              statusBarHidden: false,
              statusBarStyle: "light",
            }}
          >
            {user
              ? routes.map(({ options, ...route }) => (
                  <Stack.Screen
                    key={route.name}
                    options={{
                      contentStyle: {
                        backgroundColor: Color.background,
                      },
                      ...options,
                      navigationBarColor: Color.background,
                    }}
                    {...route}
                  />
                ))
              : authRoutes.map(({ options, ...route }) => (
                  <Stack.Screen
                    key={route.name}
                    options={{
                      contentStyle: {
                        backgroundColor: Color.background,
                      },
                      ...options,
                      navigationBarColor: Color.background,
                    }}
                    {...route}
                  />
                ))}
            {modalRoutes.map(({ options, ...route }) => (
              <Stack.Screen
                key={route.name}
                options={{
                  stackPresentation: "containedTransparentModal",
                  ...options,
                }}
                {...route}
              />
            ))}
            {fullScreenModalRoutes.map(({ options, ...route }) => (
              <Stack.Screen
                key={route.name}
                options={{
                  stackPresentation: "fullScreenModal",
                  stackAnimation: "flip",
                  navigationBarColor: Color.background,
                  contentStyle: {
                    backgroundColor: Color.background,
                  },
                  ...options,
                }}
                {...route}
              />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
        {user && currentRoute && !noBottomMenuRoutes.has(currentRoute) ? (
          <BottomMenu nav={navReference.navigate} currentRoute={currentRoute} />
        ) : null}
      </GestureDetectorProvider>
    </SafeAreaProvider>
  );
};

export default Navigation;
