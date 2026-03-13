import type { ThemePackType } from "@/store/reader/theme-pack";
import { Title } from "@/ui";
import { Color } from "@/utils/colors";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import type { FC, RefObject } from "react";
import { View } from "react-native";

export interface TranslatorProperties {
  sheetRef: RefObject<BottomSheetModal> | null;
  colorScheme: ThemePackType;
}

export const GtpWindow: FC<TranslatorProperties> = ({
  sheetRef,
  colorScheme,
}) => (
  <>
    <BottomSheetModal
      detached
      handleIndicatorStyle={{
        backgroundColor: colorScheme.colorPalette.text,
        display: "none",
      }}
      ref={sheetRef}
      snapPoints={["30%", "60%"]}
      style={{
        borderColor: Color.bordered,
        borderWidth: 1,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 16,
      }}
      backgroundStyle={{
        backgroundColor: colorScheme.colorPalette.background.darker,
      }}
    >
      {(data) => {
        const text = data?.data;
        return (
          <>
            <View
              style={{
                height: 22,
                width: 100,
                backgroundColor: colorScheme.colorPalette.secondary,
                borderRadius: 20,
                marginTop: -45,
                paddingBottom: 5,
              }}
            >
              <Title size="sm" className="text-center">
                Gentleman
              </Title>
            </View>
            <BottomSheetScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              style={{
                paddingTop: 20,
              }}
            >
              <Title
                size="md"
                className="mb-20"
                numberOfLines={Number.MAX_SAFE_INTEGER}
              >
                {text}
              </Title>
            </BottomSheetScrollView>
          </>
        );
      }}
    </BottomSheetModal>
  </>
);
