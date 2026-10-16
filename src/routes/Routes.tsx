import { Routes as ReactRouterRoutes, Route } from 'react-router';
import { BuildScalePage, PracticePage, ScalePage } from '@/pages';

export const Routes = () => {
  return (
    <ReactRouterRoutes>
      <Route path={'/'} element={<ScalePage />} />
      <Route path={'/practice'} element={<PracticePage />} />
      <Route path={'/practice/build-scale'} element={<BuildScalePage />} />
    </ReactRouterRoutes>
  );
};
