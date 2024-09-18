export const baseColors = {
  transparent: "transparent",
} as const;

export const lightColors = {
  ...baseColors,

  monochrome900: "#1D2230",
  monochrome800: "#303950",
  monochrome700: "#43506F",
  monochrome600: "#56678F",
  monochrome500: "#7081A9",
  monochrome400: "#8F9DBC",
  monochrome300: "#AFB9CF",
  monochrome200: "#CFD5E2",
  monochrome100: "#DFE3EC",
  monochrome50: "#EFF1F6",
  monochrome25: "#F9F9FB",
  monochrome0: "#FFFFFF",

  accent900: "#0D173F",
  accent800: "#16276A",
  accent700: "#1F3694",
  accent600: "#2745BE",
  accent500: "#415FD7",
  accent400: "#6B82E0",
  accent300: "#95A6E9",
  accent200: "#C0CAF2",
  accent100: "#D5DBF6",
  accent50: "#EAEDFB",

  success900: "#03490A",
  success800: "#057A11",
  success700: "#07AB18",
  success600: "#0ADB1F",
  success500: "#23F539",
  success400: "#54F765",
  success300: "#85FA91",
  success200: "#B6FCBD",
  success100: "#CEFDD3",
  success50: "#E7FEE9",

  warning900: "#4C3200",
  warning800: "#7F5400",
  warning700: "#B27600",
  warning600: "#E59700",
  warning500: "#FFB119",
  warning400: "#FFC24C",
  warning300: "#FFD47F",
  warning200: "#FFE5B2",
  warning100: "#FFEECC",
  warning50: "#FFF6E5",

  error900: "#48040C",
  error800: "#790714",
  error700: "#A9091D",
  error600: "#D90C25",
  error500: "#F3263E",
  error400: "#F55669",
  error300: "#F88694",
  error200: "#FBB7BF",
  error100: "#FCCFD4",
  error50: "#FEE7EA",

  link900: "#082844",
  link800: "#0E4372",
  link700: "#135E9F",
  link600: "#1879CD",
  link500: "#3292E6",
  link400: "#60AAEC",
  link300: "#8DC2F1",
  link200: "#BBDBF7",
  link100: "#D1E7FA",
  link50: "#E8F3FC",

  // Put light colors here
} as const;

export const darkColors = {
  ...baseColors,
  // Put dark colors here
  monochrome900: "#DEE2ED",
  monochrome800: "#BFC7D9",
  monochrome700: "#A0ACC5",
  monochrome600: "#808FB3",
  monochrome500: "#60749F",
  monochrome400: "#4D5C7F",
  monochrome300: "#394560",
  monochrome200: "#262E40",
  monochrome100: "#1D2230",
  monochrome50: "#131720",
  monochrome25: "#0F1219",
  monochrome0: "#0B0D13",

  accent900: "#D5DBF6",
  accent800: "#ABB8ED",
  accent700: "#8094E5",
  accent600: "#5671DC",
  accent500: "#2C4ED3",
  accent400: "#233EA9",
  accent300: "#1A2E7F",
  accent200: "#121F54",
  accent100: "#0D173F",
  accent50: "#090F2A",

  success900: "#CEFDD3",
  success800: "#9DFBA7",
  success700: "#6CF97B",
  success600: "#3CF64F",
  success500: "#0BF423",
  success400: "#09C31C",
  success300: "#079215",
  success200: "#04620E",
  success100: "#03490A",
  success50: "#023107",

  warning900: "#FFEECC",
  warning800: "#FFDC99",
  warning700: "#FFCB66",
  warning600: "#FFBA33",
  warning500: "#FFA800",
  warning400: "#CC8700",
  warning300: "#996500",
  warning200: "#664400",
  warning100: "#4D3300",
  warning50: "#332200",

  error900: "#FCCFD4",
  error800: "#FA9EA9",
  error700: "#F76E7F",
  error600: "#F43E54",
  error500: "#F20D28",
  error400: "#C10B20",
  error300: "#910819",
  error200: "#610511",
  error100: "#48040C",
  error50: "#300308",

  link900: "#D2E7F9",
  link800: "#A3CFF5",
  link700: "#76B6EF",
  link600: "#499EE9",
  link500: "#1B85E4",
  link400: "#166BB6",
  link300: "#105089",
  link200: "#0B365B",
  link100: "#082844",
  link50: "#051B2E",
} as const;
