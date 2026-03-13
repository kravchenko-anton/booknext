import { useTypedNavigation } from '@/hooks'
import { type BookToAddType, useLibraryStore } from '@/store/reader/library-store'
import { successToast } from '@/utils/toast'
import * as Sentry from '@sentry/react-native'

export const useFinishBook = (onFinishComplete: () => void) => {
  const { navigate } = useTypedNavigation();
  const {finishReading} = useLibraryStore()
  const onFinish =  (book: BookToAddType) => {
     finishReading(book)
      onFinishComplete();
      Sentry.metrics.increment("finish-reading");
      successToast("Successfully finished");
      navigate("Library");
  };

  return {
    onFinish,
  };
};
