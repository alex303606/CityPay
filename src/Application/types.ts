import {EScreens, RootStackParamList} from '@navigators';
import {NavigationContainerRef, ParamListBase} from '@react-navigation/native';
import {MutableRefObject, RefObject} from 'react';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';

export interface INavigationService {
  navigationRef: RefObject<NavigationContainerRef<RootStackParamList>>;
  isReadyRef: MutableRefObject<boolean>;
  navigate: (name: EScreens, params: ParamListBase) => void;
}

export interface IRemoteNotificationsClient {
  getToken: () => Promise<string>;
}

export interface ILocalNotificationsClient {
  displayNotification: (
    remoteMessage: FirebaseMessagingTypes.RemoteMessage,
    channelId?: string,
  ) => Promise<void>;
  checkInitialNotification: () => Promise<void>;
}

export interface INotificationHandlersService {
  getHandler: (
    type: string,
  ) => ((data: FirebaseMessagingTypes.RemoteMessage['data']) => void) | null;
}

export interface INetInfoState {
  isConnected: boolean | undefined;
  isInternetReachable: boolean | null | undefined;
}

export type NetInfoSubscription = () => void;

export type NetInfoChangeHandler = (state: INetInfoState) => void;

export interface INetInfo {
  fetch: (requestedInterface?: string) => Promise<INetInfoState>;
  addEventListener(listener: NetInfoChangeHandler): NetInfoSubscription;
}

export interface IPermissions {
  runLocationFeature: (params: IPermissionParams) => void;
}

export interface IPermissionParams {
  successCallback: () => void;
  onPermissionForbidden?: () => void;
  onPermissionGranted?: () => void;
  afterPermission?: () => void;
}

export interface PresentationDependencies {
  netInfo: INetInfo;
  navigationService: INavigationService;
  permissions: IPermissions;
  localNotificationClient: ILocalNotificationsClient;
  remoteNotificationClient: IRemoteNotificationsClient;
}

export interface IPermissionParams {
  successCallback: () => void;
  onPermissionForbidden?: () => void;
  onPermissionGranted?: () => void;
  afterPermission?: () => void;
}

export interface IPermissions {
  runLocationFeature: (params: IPermissionParams) => void;
}
