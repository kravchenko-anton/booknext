import { Book, Google, Mail } from '@/icons'
import { LoginIllustration } from '@/illustrations/login'
import { useAuthorize } from '@/screens/auth/useAuthorize'
import { useAuthStore } from '@/store/auth/auth-store'
import { useLibraryStore } from '@/store/reader/library-store'
import { useReadingProgressStore } from '@/store/reader/progress-store'
import { useReactionStore } from '@/store/reader/reaction-store'
import { Button, ScrollLayout, Title } from '@/ui'
import { Color } from '@/utils/colors'
import { appName } from '@/utils/constants/index'
import { errorToast } from '@/utils/toast'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import * as Sentry from '@sentry/react-native'
import { useQueryClient } from '@tanstack/react-query'
import { type FC, useEffect, useLayoutEffect } from 'react'
import { Linking, View } from 'react-native'

const Welcome: FC = () => {
  const { googleLogin } = useAuthStore((state) => ({
    googleLogin: state.googleLogin,
  }));
  const clearHistory = useReadingProgressStore.getState().clearHistory
  const clearReactions = useReactionStore.getState().clearReactions
  const clearLibrary = useLibraryStore.getState().clearLibrary
  const queryClient = useQueryClient();
  const {
    isLoading: authLoading,
    onCreateAccount,
    onContinueWithMail,
  } = useAuthorize();

  useLayoutEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "390949311214-hqfqvic7p47pt3elpne00es58k99nonh.apps.googleusercontent.com",
    });
    // clear all cache from tanstack query and from zustand
  }, []);
  // on load clear all cache
  useEffect(() => {
    queryClient.clear();
    clearHistory();
    clearReactions();
    clearLibrary();
    console.log("clear all cache")
  }, [clearHistory, clearLibrary, clearReactions, queryClient]);
  
  
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (!userInfo.data?.idToken) return errorToast("Something went wrong with Google");
      googleLogin({
        socialId: userInfo.data?.idToken,
      });
    } catch (error) {
      console.log("error",JSON.stringify(error));
      Sentry.captureException(error);
      errorToast("Something went wrong with Google");
    }
  }
console.log(process.env.SERVER_URL, "process.env.SERVER_URL")
  return (
    <ScrollLayout>
      <View className="mb-4 mt-[20%]">
        <LoginIllustration
          width={200}
          height={200}
          className="mx-auto w-full p-0"
        />
      </View>
      <View className="mx-4">
        <Title
          center
          numberOfLines={2}
          size="xxl"
          color={Color.white}
          weight="medium"
          className="mb-6"
        >
          Welcome to{" "}
          <Title
            numberOfLines={2}
            size="xxl"
            color={Color.primary}
            weight="bold"
          >
            {appName}
          </Title>
          ,{"\n"}best books for you!
        </Title>
        <Button
          size="md"
          isLoading={authLoading === "google"}
          className="mb-3 py-2"
          icon={Google}
          variant="muted"
          onPress={signIn}
        >
          Continue with Google
        </Button>
        <Button
          size="md"
          variant="muted"
          isLoading={authLoading === "mail-login"}
          className="mb-2 py-2"
          icon={Mail}
          onPress={onContinueWithMail}
        >
          Continue with Email
        </Button>
        <View className="border-bordered flex-row items-center justify-center border-b-2 border-b-2">
          <Title
            center
            weight="bold"
            size="md"
            className="bg-background overflow-50 -mb-[11px] mt-2 w-[50px]"
          >
            Or
          </Title>
        </View>
        <View className="mt-4">
          <Button
            size="md"
            className="mb-2 py-2"
            variant="foreground"
            icon={Book}
            onPress={() => onCreateAccount()}
          >
            Create account
          </Button>
        </View>
        <Title
          onPress={() => Linking.openURL("mailto:anton.kravchenko.developer@gmail.com")}
          className="mt-2 items-center" color={Color.gray}>
          Contact us <Title color={Color.white} weight="bold">here</Title>
        </Title>
      </View>
    </ScrollLayout>
  );
};

export default Welcome;
