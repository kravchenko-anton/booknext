import type { ReactionType } from '@/store/reader/reaction-store'
import type { ThemePackType } from '@/store/reader/theme-pack'
import { windowWidth } from '@/utils/dimensions'
import { doublePress } from '@/utils/handleDoublePress'
import type { FunctionType } from '@/utils/types'
import { forwardRef } from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import WebView, { type WebViewMessageEvent } from 'react-native-webview'

export interface ReaderViewerProperties {
  readerUiVisible: boolean;
  handleDoublePress: FunctionType;
  file: string;
  defaultProperties: {
    scrollPosition: number;
    theme: string;
    reactions: ReactionType[]
  };
  colorScheme: ThemePackType;
  onMessage: (event: WebViewMessageEvent) => Promise<void>;
}

const ReaderViewer = forwardRef(
  (properties: ReaderViewerProperties, reference: any) => {
    const {
      defaultProperties,
      file,
      handleDoublePress,
      colorScheme,
      onMessage,
    } = properties;

    if (!defaultProperties) return <View className="flex-1" />;
    return (
      <View className="m-0 h-screen w-screen flex-1 items-center justify-center p-0">
        <TouchableWithoutFeedback onPress={doublePress(handleDoublePress)}>
          <WebView
            scrollEnabled
            javaScriptEnabled
            mixedContentMode="compatibility"
            ref={reference}
            androidHardwareAccelerationDisabled={false}
            originWhitelist={["*"]}
            showsVerticalScrollIndicator={false}
            className="bottom-0 left-0 right-0 top-0 z-10 m-0 p-0"
            menuItems={[]}
            decelerationRate="normal"
            //TODO: prevent fast scroll in webview
            renderLoading={() => (
              <View
                className="h-screen w-screen"
                style={{
                  backgroundColor: colorScheme.colorPalette.background.normal,
                }}
              />
            )}
            source={{
              baseUrl: "",
              html: file,
            }}
            style={{
              width: windowWidth,
              backgroundColor: colorScheme.colorPalette.background.normal,
            }}
            onMessage={onMessage}
          />
        </TouchableWithoutFeedback>
      </View>
    );
  },
);
export default ReaderViewer;
