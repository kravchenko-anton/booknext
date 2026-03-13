import { ReaderFont } from '@/store/reader/customization-store'
import { Platform } from 'react-native'

export const injectFont = () => {
  const fonts = ReaderFont.map((font) => font.fontFamily);
  const fontWeights = ["Bold", "Regular", "Light"];
  const fontFaces = fonts.map((font) =>
    fontWeights
      .map((fontWeight) => {
        const url = Platform.select({
          ios: `file:///assets/fonts/${font}-${fontWeight}.ttf`,
          android: `file:///android_asset/fonts/${font}-${fontWeight}.ttf`,
        });
        return `
					@font-face {
			    font-family: '${font}-${fontWeight}';
			    src:url('${url}') format('truetype')
					}
			`;
      })
      .join(""),
  );
  return fontFaces.join("");
};
