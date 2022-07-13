import React, { Suspense, Fragment, lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import Loader from './Components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';
import AuthGuard from './Components/Auth/AuthGuard';
import { BASE_URL } from './config/constant';

export const renderRoutes = (routes = []) => (
    <Suspense fallback={<Loader />}>
        <Switch>
            {routes.map((route, i) => {
                const Guard = route.guard || Fragment;
                const Layout = route.layout || Fragment;
                const Component = route.component;

                return (
                    <Route
                        key={i}
                        path={route.path}
                        exact={route.exact}
                        render={(props) => (
                            <Guard>
                                <Layout>{route.routes ? renderRoutes(route.routes) : <Component {...props} />}</Layout>
                            </Guard>
                        )}
                    />
                );
            })}
        </Switch>
    </Suspense>
);

const routes = [
    
    {
        exact: true,
        path: '/organization',
        component: lazy(() => import('./views/auth/signin/Orgainzation'))
    },
    {
        exact: true,
        path: '/signin',
        component: lazy(() => import('./views/auth/signin/SignIn'))
    },
    {
        exact: true,
        path: '/forgotpassword',
        component: lazy(() => import('./views/auth/reset/Forgotpassword'))
    },
    {
        exact: true,
        path: '/checkemail',
        component: lazy(() => import('./views/auth/reset/CheckEmail'))
    },

    {
        exact: true,
        path: '/resetpassword/:token',
        component: lazy(() => import('./views/auth/reset/Resetpassword'))
    },
    {
        path: '*',
        layout: AdminLayout,
        guard: AuthGuard,
        routes: [
//test
{
    exact: true,
    path: '/table',
    component: lazy(() => import('./Components/tickethistory/tickethistory'))
},

            {
                exact: true,
                path: '/dashboard',
                component: lazy(() => import('./views/dashboard/DashDefault'))
            },
            {
                exact: true,
                path: '/changepassword',
                component: lazy(() => import('./views/auth/reset/Changepassword'))
            },

            {
                exact: true,
                path: '/ticketsale',
                component: lazy(() => import('./Components/cashierPage'))
            },
            
            {
                exact: true,
                path: '/addroute',
                component: lazy(() => import('./views/route/routeform'))
            },
            {
                exact: true,
                path: '/addbus',
                component: lazy(() => import('./views/bus/busform'))
            },
            {
                exact: true,
                path: '/bus',
                component: lazy(() => import('./views/bus/buslist'))
            },
            {
                exact: true,
                path: '/user',
                component: lazy(() => import('./views/user/userform'))
            },
            {
                exact: true,
                path: '/schedule',
                component: lazy(() => import('./views/schedule/scheduleform'))
            },
            {
                exact: true,
                path: '/city',
                component: lazy(() => import('./views/city/city'))
            },
            {
                path: '*',
                exact: true,
                component: () => <Redirect to={BASE_URL} />
            }
        ]
    }
];

export default routes;
