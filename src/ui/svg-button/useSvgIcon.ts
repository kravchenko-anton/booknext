import { getFileUrl } from "@/utils/get-file-url";
import { storage } from "@/utils/mmkv";
import { useLayoutEffect, useState } from "react";

export const storedSvgPath = "svg-icon";

export const useSvgIcon = (svgUri: string, emoji: string) => {
  const [svgContent, setSvgContent] = useState<{
    type: "emoji" | "svg";
    content: string;
  } | null>(null);
  useLayoutEffect(() => {
    const getSvgFromStorage = async () => {
      const svg = storage.getString(storedSvgPath + svgUri);
      if (svg) {
        setSvgContent({
          type: "svg",
          content: svg,
        });
      }
      if (!svg) {
        const fetchedSvg = await fetch(getFileUrl(svgUri))
          .then((response) => {
            if (response.status === 200) return response.text();
            throw new Error("Failed to fetch svg");
          })
          .catch(() =>
            setSvgContent({
              type: "emoji",
              content: emoji,
            }),
          );
        if (!fetchedSvg) return;
        storage.set(storedSvgPath + svgUri, fetchedSvg);
        setSvgContent({
          type: "svg",
          content: fetchedSvg,
        });
      }
    };
    getSvgFromStorage();
  }, [svgUri]);

  return svgContent;
};
