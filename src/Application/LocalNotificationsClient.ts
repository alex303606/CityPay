import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import notifee, {
  AndroidColor,
  AndroidImportance,
  AndroidVisibility,
  AuthorizationStatus,
  EventType,
  Notification,
} from '@notifee/react-native';
import {ILocalNotificationsClient, INotificationHandlersService} from './types';
import {AndroidCategory} from '@notifee/react-native/src/types/NotificationAndroid';

export type BaseNotificationWithData = {data?: Record<string, any>};

export type NotificationOpenedListener = (
  notification: BaseNotificationWithData,
) => void;

export class LocalNotificationsClient implements ILocalNotificationsClient {
  unsubscribe!: () => void;
  defaultChannelId!: string;
  notificationHandlersService!: INotificationHandlersService;
  listeners: NotificationOpenedListener[] = [];

  constructor(notificationHandlersService: INotificationHandlersService) {
    this.notificationHandlersService = notificationHandlersService;
  }

  init = async () => {
    this.defaultChannelId = await notifee.createChannel({
      id: 'important',
      name: 'Important Notifications',
      importance: AndroidImportance.HIGH,
      visibility: AndroidVisibility.PUBLIC,
    });

    notifee.onBackgroundEvent(async ({type, detail}) => {
      const {notification} = detail;
      console.log('Notification received: background', type, detail);
      if (notification) {
        this.handleNotification(notification);
      }
    });

    const onNotificationOpenedAppUnsubscribe =
      messaging().onNotificationOpenedApp((remoteMessage: Notification) => {
        this.handleNotification(remoteMessage);
      });

    const onForegroundEventUnsubscribe = notifee.onForegroundEvent(
      ({type, detail}) => {
        switch (type) {
          case EventType.DISMISSED:
            console.log('User dismissed notification', detail.notification);
            break;
          case EventType.PRESS:
            console.log('User pressed notification', detail.notification);
            this.handleNotification(detail.notification as Notification);
            break;
        }
      },
    );

    this.unsubscribe = () => {
      onNotificationOpenedAppUnsubscribe();
      onForegroundEventUnsubscribe();
    };
  };

  destroy = () => {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  };

  checkInitialNotification = async () => {
    const initialNotification = await messaging().getInitialNotification();
    if (initialNotification) {
      this.handleNotification(initialNotification);
    }
  };

  async checkPermissions() {
    const settings = await notifee.requestPermission();

    if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
      console.log('Permission settings:', settings);
      return true;
    } else {
      console.log('User declined permissions');
      return false;
    }
  }

  displayNotification = async (
    remoteMessage: FirebaseMessagingTypes.RemoteMessage,
  ) => {
    const hasPermissions = await this.checkPermissions();
    if (remoteMessage.notification && hasPermissions) {
      await notifee.displayNotification({
        id: remoteMessage.messageId,
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        data: remoteMessage.data,
        android: {
          channelId: this.defaultChannelId,
          importance: AndroidImportance.HIGH,
          visibility: AndroidVisibility.PUBLIC,
          autoCancel: false,
          category: AndroidCategory.MESSAGE,
          color: AndroidColor.RED,
          pressAction: {
            id: 'default',
          },
        },
      });
    }
  };

  private handleNotification = (notification: Notification) => {
    const {data} = notification;
    console.log('Notification received: foreground', data);
  };
}
