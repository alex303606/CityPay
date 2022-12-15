import {EScreens, RootStackParamList} from '@navigators';
import {NavigationContainerRef, ParamListBase} from '@react-navigation/native';
import React, {MutableRefObject} from 'react';
import {INavigationService} from './types';

export class NavigationService implements INavigationService {
  navigationRef = React.createRef<NavigationContainerRef<RootStackParamList>>();
  isReadyRef = React.createRef<boolean>() as MutableRefObject<boolean>;

  navigate = (name: EScreens, params: ParamListBase) => {
    if (this.navigationRef.current && this.isReadyRef.current) {
      //@ts-expect-error
      this.navigationRef.current.navigate(name, params);
    }
  };
}
