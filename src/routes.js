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
// {
//     exact: true,
//     path: '/table',
//     component: lazy(() => import('./views/user/usertab'))
// },
            {
                exact: true,
                path: '/manageorganization',
                component: lazy(() => import('./views/organization/index'))
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
                path: '/route',
                component: lazy(() => import('./views/route/routetab'))
            },
            {
                exact: true,
                path: '/bus',
                component: lazy(() => import('./views/bus/bustab'))
            },
            // {
            //     exact: true,
            //     path: '/bus',
            //     component: lazy(() => import('./views/bus/buslists'))
            // },
            {
                exact: true,
                path: '/user',
                component: lazy(() => import('./views/user/usertab'))
            },
            {
                exact: true,
                path: '/agent',
                component: lazy(() => import('./views/manageagent/agenttab'))
            },
            {
                exact: true,
                path: '/schedule',
                component: lazy(() => import('./views/schedule/scheduletab'))
            },
            {
                exact: true,
                path: '/managelocalcash',
                component: lazy(() => import('./views/managelocalcash/managecashtab'))
            },
            {
                exact: true,
                path: '/manageagentcash',
                component: lazy(() => import('./views/manageagentcash/managecashtab'))
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
