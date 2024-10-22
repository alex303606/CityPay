import {Dimensions, StatusBar} from 'react-native';
import {initialWindowMetrics} from 'react-native-safe-area-context';

export const STATUSBAR_HEIGHT = StatusBar.currentHeight ?? 0;
export const DEVICE_HAS_NOTCH = STATUSBAR_HEIGHT > 24;
export const TAB_BAR_HEIGHT = 60;
/**
 * It is more than zero when status bar is translucent
 */
export const WINDOW_TOP_INSET = initialWindowMetrics?.insets.top ?? 0;
export const HEADER_HEIGHT = 56 + WINDOW_TOP_INSET;
const screenHeightFallback = DEVICE_HAS_NOTCH
  ? Dimensions.get('window').height
  : Dimensions.get('window').height - STATUSBAR_HEIGHT;

export const WINDOW_HEIGHT =
  (initialWindowMetrics?.frame.height || screenHeightFallback) +
  WINDOW_TOP_INSET;

// Find the difference between activity height and real height for notched devices
export const TOP_INSET = DEVICE_HAS_NOTCH
  ? WINDOW_HEIGHT - Dimensions.get('window').height
  : STATUSBAR_HEIGHT;

export const WINDOW_WIDTH =
  initialWindowMetrics?.frame.width || Dimensions.get('window').width;

export const SCREEN_HEIGHT =
  WINDOW_HEIGHT - TAB_BAR_HEIGHT - STATUSBAR_HEIGHT - HEADER_HEIGHT;
