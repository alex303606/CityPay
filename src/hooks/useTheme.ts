import {useAppDispatch, useAppSelector} from './store';
import {useCallback} from 'react';
import {ITheme, Themes, themes} from '../themes';
import {changeTheme, selectedTheme} from '@store';

export const useTheme = () => {
  const dispatch = useAppDispatch();
  const changeThemeHandler = useCallback(
    (theme: Themes) => {
      dispatch(changeTheme(theme));
    },
    [dispatch],
  );

  const selected = useAppSelector(selectedTheme);
  const theme: ITheme = themes[selected];

  return {
    changeTheme: changeThemeHandler,
    theme,
  };
};
