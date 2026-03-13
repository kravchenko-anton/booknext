import { useTypedNavigation } from '@/hooks'
import { ArrowLeft, ListOrdered, Settings } from '@/icons'
import type { ReadingProgressType } from '@/screens/reader/functions/useReadingProgress'
import type { ThemePackType } from '@/store/reader/theme-pack'
import { Title } from '@/ui'
import { AnimatedView } from '@/ui/animated-components'
import { hexToRgbA } from '@/utils'
import type { FunctionType } from '@/utils/types'
import Slider from '@react-native-community/slider'
import type { FC } from 'react'
import { View } from 'react-native'
import { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface ReaderMenuProperties {
  visible: boolean;
  bookTitle: string;
  onChapterIconPress: FunctionType;
  onSelectThemeIconPress: FunctionType;
  colorScheme: ThemePackType;
  bookSlug: string;
  readingProgress: ReadingProgressType;
  onProgressChange: (value: number) => void;
}
// Переиминовать на readerMenu
const ReaderMenu: FC<ReaderMenuProperties> = ({
  visible = false,
  onChapterIconPress,
  bookTitle,
  colorScheme,
  readingProgress,
  onProgressChange,
  onSelectThemeIconPress,
}) => {
  const { navigate } = useTypedNavigation();
  const { top } = useSafeAreaInsets();
  const fadeAnimation = useAnimatedStyle(() => ({
    opacity: withTiming(Boolean(visible) ? 1 : 0, { duration: 200 }),
    pointerEvents: Boolean(visible) ? "auto" : "none",
  }));
  return (
    <View className="absolute h-full  w-full">
      <AnimatedView
        className=" absolute z-50 mb-0 mt-0 w-full flex-1 justify-center border-b-2"
        style={[
          fadeAnimation,
          {
            top,
            backgroundColor: colorScheme.colorPalette.background.darker,
            borderBottomColor: colorScheme.colorPalette.background.lighter,
          },
        ]}
      >
        <View className="mt-0 w-full flex-row items-center justify-between px-4 pb-2.5 pt-2.5">
          <View className=" flex-row items-center">
            <ArrowLeft
              width={28}
              height={28}
              color={colorScheme.colorPalette.text}
              onPress={() => navigate("Library")}
            />
          </View>
          <View className="flex-row items-center gap-6">
            <ListOrdered
              width={28}
              height={28}
              color={colorScheme.colorPalette.text}
              onPress={onChapterIconPress}
            />
            <Settings
              width={28}
              height={28}
              color={colorScheme.colorPalette.text}
              onPress={onSelectThemeIconPress}
            />
          </View>
        </View>
      </AnimatedView>

      <AnimatedView
        className="absolute z-50 w-full flex-1 justify-center border-t-2 pb-6 pt-2"
        style={[
          fadeAnimation,
          {
            bottom: 0,
            backgroundColor: colorScheme.colorPalette.background.darker,
            borderTopColor: colorScheme.colorPalette.background.lighter,
          },
        ]}
      >
        <Title
          center
          className="mb-1"
          size={"sm"}
          weight="medium"
          color={colorScheme.colorPalette.text}
        >
          {readingProgress.progress.toFixed(2)}%
        </Title>
        <Slider
          minimumValue={0}
          maximumValue={1}
          step={0.001}
          minimumTrackTintColor={colorScheme.colorPalette.primary}
          thumbTintColor={colorScheme.colorPalette.primary}
          maximumTrackTintColor={colorScheme.colorPalette.primary}
          value={readingProgress.progress / 100}
          onSlidingComplete={onProgressChange}
        />
        {/*TODO: сделать при переходах запись в стор и возможность вернутся позже к конкретному месту*/}
        <View className="mt-1">
          <View className="flex-row items-center justify-between px-4 ">
            <Title size={"sm"} color={colorScheme.colorPalette.text}>
              {(readingProgress.chapter.title || bookTitle).slice(0, 35) +
                (readingProgress.chapter.title?.length > 35 ? "..." : "")}
            </Title>
            <Title size={"sm"} color={colorScheme.colorPalette.text}>
              {(100 - readingProgress.chapter.progress).toFixed(2)}% left
            </Title>
          </View>
        </View>
      </AnimatedView>

      <View
        style={{
          backgroundColor: hexToRgbA(
            colorScheme.colorPalette.background.darker,
            0.7,
          ),
          position: "absolute",
          bottom: 0,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          paddingVertical: 1.5,
        }}
      >
        <Title size="sm" color={colorScheme.colorPalette.text}>
          {
            readingProgress.progress.toFixed(2)
          }%
        </Title>
      </View>
    </View>
  );
};

export default ReaderMenu;
