import {useContext} from 'react';
import {DependenciesContext} from '../Application/dependencies';

export const useDependencies = () => useContext(DependenciesContext);
