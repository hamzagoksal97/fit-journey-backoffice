import MainLayout from '../components/layout';
import AuthGuard from '../utils/AuthGuard';
import HomePage from '../views/home';
import ListTenantsPage from '../views/tenants/listTenants';
import AddTenantPage from '../views/tenants/addTenant';
import { OperationClaims } from '../constants/operationClaims';
import RouteGuard from './RouteGuard';
import ViewTenantPage from '../views/tenants/viewTenant';



const MainRoutes = {
  path: '/',
  element: (
    <AuthGuard>
      <MainLayout />
    </AuthGuard>
  ),
  children: [
    {
      path: '/Home',
      element: <HomePage />
    },
    {
      path: '/Tenants',
      element: (
        <RouteGuard claimsRequired={[OperationClaims.Tenant.List]}>
          <ListTenantsPage />
        </RouteGuard>
      )
    },
    {
      path: '/AddTenant',
      element: (
        <RouteGuard claimsRequired={[OperationClaims.Tenant.Create]}>
          <AddTenantPage />
        </RouteGuard>
      )
    },
    {
      path: '/ViewTenant/:id',
      element: (
        <RouteGuard claimsRequired={[OperationClaims.Tenant.View]}>
          <ViewTenantPage />
        </RouteGuard>
      )
    }


  ]
};

export default MainRoutes;