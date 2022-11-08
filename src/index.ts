import {init as initPresentation} from './App';
import {getInfrastructureContainer} from './Application/InfrastructureContainer';
import {PresentationDependencies} from './Application/types';

export const init = async () => {
  const {infrastructureContainer, onDestroy} =
    await getInfrastructureContainer();

  const presentation: PresentationDependencies = {
    ...infrastructureContainer,
  };
  return {mainComponent: initPresentation(presentation), onDestroy};
};
