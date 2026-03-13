import { errorCatch } from '@/utils/catch-error'
import * as Haptics from 'expo-haptics'
import Toast from 'react-native-toast-message'

export const errorToast = (error: unknown) => {
  Toast.show({
    type: "error",
    text1: errorCatch(error),
    position: "bottom",
    bottomOffset: 70,
    swipeable: true,
  });
};

export const successToast = (message: string) => {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  Toast.show({
    type: "success",
    text1: message,
    position: "bottom",
    bottomOffset: 70,
    swipeable: true,
  });
};
