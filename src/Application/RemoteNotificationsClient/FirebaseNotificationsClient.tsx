import messaging from '@react-native-firebase/messaging';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';

export interface ILocalNotificationsClient {
  displayNotification: (
    remoteMessage: FirebaseMessagingTypes.RemoteMessage,
    channelId?: string,
  ) => Promise<void>;
  checkInitialNotification: () => Promise<void>;
}

export interface IRemoteNotificationsClient {
  getToken: () => Promise<string>;
}

export class FirebaseNotificationsClient implements IRemoteNotificationsClient {
  unsubscribe!: () => void;
  localNotificationClient!: ILocalNotificationsClient;

  constructor(localNotificationClient: ILocalNotificationsClient) {
    this.localNotificationClient = localNotificationClient;
    const onMessageUnsubscribe = messaging().onMessage(remoteMessage => {
      if (remoteMessage.notification) {
        console.log(remoteMessage);
        this.localNotificationClient.displayNotification(remoteMessage);
      }
    });

    this.unsubscribe = () => {
      onMessageUnsubscribe();
    };
  }

  destroy = () => {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  };

  getToken = async () => {
    await messaging().registerDeviceForRemoteMessages();
    return messaging().getToken();
  };
}
