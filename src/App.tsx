import MainLayout from './components/layouts/MainLayout';
import LoginComponent from './views/login/page';
import RegisterComponent from './views/register/page';
import { AppRoutes } from './utils/AppRoutes';
import { Route, Routes } from 'react-router-dom';
import HomeComponent from './views/home/page';
import UserSettingsComponent from './views/settings/page';
import CollectionsComponent from './views/collections/page';
import UserProfileComponent from './views/profile/page';
import AuthComponent from './views/auth/page';
import ImageComponent from './views/image/page';
import CollectionComponent from './views/collection/page';

const getMainLayout = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path={AppRoutes.HOME} element={<HomeComponent />} />
        <Route path={AppRoutes.REGISTER} element={<RegisterComponent />} />
        <Route path={AppRoutes.LOGIN} element={<LoginComponent />} />
        <Route path={AppRoutes.AUTH} element={<AuthComponent />} />
        <Route path={AppRoutes.PROFILE} element={<UserProfileComponent />} />
        <Route path={AppRoutes.SETTINGS} element={<UserSettingsComponent />} />
        <Route path={AppRoutes.PHOTOS} element={<ImageComponent />} />
        <Route path={AppRoutes.COLLECTION} element={<CollectionComponent />} />
        <Route
          path={AppRoutes.COLLECTIONS}
          element={<CollectionsComponent />}
        />
        <Route path={AppRoutes.ANY} element={<HomeComponent />} />
      </Routes>
    </MainLayout>
  );
};

export default function App() {
  return <>{getMainLayout()}</>;
}
