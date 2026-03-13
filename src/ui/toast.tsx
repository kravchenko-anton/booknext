import { OkHandEmoji, ThumbDownEmoji } from "@/icons/emoji";
import { fontSettings } from "@/ui/title/settings";
import { Color } from "@/utils/colors";
import type { FC } from "react";
import RnToast, { BaseToast } from "react-native-toast-message";

const options = () => ({
  style: {
    backgroundColor: Color.muted,
    alignItems: "center" as const,
    borderRadius: 10,
    height: 40,
    width: 260,
    borderColor: Color.bordered,

    borderWidth: 1.5,
    borderLeftWidth: 1.5,
    shadowColor: Color.transparent,
  },
  text1Style: {
    color: Color.white,
    marginLeft: -25,
    width: 210,
    fontSize: 14,
    fontFamily: fontSettings.regular,
  },
});

const Toast: FC = () => (
  <RnToast
    config={{
      success: (properties) => (
        <BaseToast
          text1NumberOfLines={2}
          renderLeadingIcon={() => (
            <OkHandEmoji className="ml-2 mr-2" width={20} height={20} />
          )}
          {...properties}
          {...options()}
        />
      ),
      error: (properties) => (
        <BaseToast
          text1NumberOfLines={2}
          renderLeadingIcon={() => (
            <ThumbDownEmoji className="ml-2 mr-2" width={20} height={20} />
          )}
          {...properties}
          {...options()}
        />
      ),
    }}
  />
);

export default Toast;
