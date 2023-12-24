import { createBrowserRouter, matchRoutes, useLocation } from "react-router-dom";
import { App } from "./Base";
import { SpecificAnimal } from "./pages/user/SpecificAnimal";
import { AllAnimals } from "./pages/user/AllAnimals";
import { Login } from "./pages/auth/Login";
import { PartnerAnimalManage } from "./pages/partner/PartnerAnimalManage";
import { Testing } from "./pages/testing/Testing";
import { FourOFour } from "./pages/error/fourOFour";
import { PartnerEditAnimal } from "./pages/partner/PartnerEditAnimal";
import { AllPartnerAnimals } from "./pages/user/AllPartnerAnimals";
import { RegisterPage } from "./pages/auth/Register";
import { HeroPage } from "./pages/hero/Hero";
import { AnimalSelect } from "./pages/hero/AnimalSelect";
import { Thanks } from "./pages/auth/Thanks";
import { Verify } from "./pages/auth/Verify";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import { ForgotPasswordSuccess } from "./pages/auth/ForgotPassrodSuccess";
import { ResetPassword } from "./pages/auth/ResetPassword";
import { ResetPasswordSuccess } from "./pages/auth/ResetPasswordSuccess";
import { IWantDonate } from "./pages/hero/IWantDonate";
import { PartnerConfig } from "./pages/partner/PartnerConfig";
import { ManagerSidebar } from "./elements/ManagerBase";
import { matchPath } from 'react-router';
import { UNSAFE_RouteContext } from 'react-router-dom'
import { useContext } from "react";

export function usePathPattern() {
  let lastRouteContext = useContext(UNSAFE_RouteContext)
  while (lastRouteContext.outlet) lastRouteContext = lastRouteContext.outlet.props.routeContext
  return lastRouteContext.matches
    .map(({ route: { path } }) => path)
    .filter(Boolean)
    .join('/')
    .replaceAll(/\/\*?\//g, '/')
}
const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HeroPage />
      },
      {
        path: '/animals',
        element: <AllAnimals />
      },
      {
        path: '/select',
        element: <AnimalSelect />
      }, 
      {
        path: '/i-want-to-donate', 
        element: <IWantDonate />
      }
    ]
  },
  {
    path: '/organizations/:username',
    element: <AllPartnerAnimals />
  },
  {
    path: '/partner',
    element: <ManagerSidebar />,
    children: [
      {
        index: true,
        element: <PartnerAnimalManage />
      },
      {
        element: <PartnerEditAnimal />,
        path: 'animal/:id'
      },
      {
        element: <PartnerConfig />,
        path: 'config'
      },
      {
        element: <></>,
        path: 'help'
      }
    ]
  },


  {
    path:'/animals/:animalId',
    element: <SpecificAnimal />
  },
  {
    path: '/auth/login',
    element: <Login />
  },
  {
    path: '/auth/register',
    element: <RegisterPage />
  },
  {
    path: 'auth/register/success',
    element: <Thanks />
  },
  {
    path: '/auth/register/verify',
    element: <Verify />
  },
  {
    path :'/auth/password',
    element: <ForgotPassword />
  },
  {
    path :'/auth/password/success',
    element: <ForgotPasswordSuccess />
  },
  {
    path :'/auth/new-password',
    element: <ResetPassword />
  },
  {
    path :'/auth/new-password/success',
    element: <ResetPasswordSuccess />
  },
  {
    path: '/test',
    element: <Testing />
  },
  {
    path: '*',
    element: <FourOFour />
  }
]

const router = createBrowserRouter(routes)

export default router