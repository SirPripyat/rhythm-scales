import { Routes as ReactRouterRoutes, Route } from 'react-router';
import { BuildScalePage, ScalePage } from '@/pages';

export const Routes = () => {
  return (
    <ReactRouterRoutes>
      <Route path={'/'} element={<ScalePage />} />
      <Route path={'/build-scale'} element={<BuildScalePage />} />
    </ReactRouterRoutes>
  );
};
