import { PixelRatio } from "react-native";
import Platform from "Platform";
import Dimensions from "Dimensions";

export const util = {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    platform: Platform.OS,
    borderWidth: 1 / PixelRatio.get(),
    ratio: Dimensions.get("window").width / 375,
    scale: function (value = 0) {
        return value * util.ratio;
    }
};