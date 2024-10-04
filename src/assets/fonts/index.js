import { Font } from "@react-pdf/renderer";

import font from "assets/fonts/MalgunGothicRegular.ttf";
import nanum from "assets/fonts/NanumGothic.ttf";
import nanumBold from "assets/fonts/NanumGothicBold.ttf";

Font.register({
  family: "MalgunGothic",
  fonts: [{ src: font }, { src: font, fontWeight: 700 }],
});

Font.register({
  family: "NanumGothic",
  fonts: [{ src: nanum }, { src: nanumBold, fontWeight: 700 }],
});
