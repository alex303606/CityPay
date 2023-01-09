import {FlatListProps} from 'react-native';
import {FC} from 'react';

export type FlatListType = <T>(
  props: FlatListProps<T>,
) => ReturnType<FC<FlatListProps<T>>>;
