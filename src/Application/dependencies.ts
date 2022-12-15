import React from 'react';
import {PresentationDependencies} from './types';
import {
  IUIDependenciesServiceLocator,
  UIDependenciesServiceLocator,
} from './IUIDependenciesServiceLocator';

export const DependenciesContext = React.createContext<
  IUIDependenciesServiceLocator<PresentationDependencies>
>(UIDependenciesServiceLocator.init(null as PresentationDependencies | null));
