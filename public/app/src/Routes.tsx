import { createBrowserRouter } from "react-router-dom";
import { App } from "./Base";
import { SpecificAnimal } from "./pages/user/SpecificAnimal";
import { AllAnimals } from "./pages/user/AllAnimals";
import { Login } from "./pages/auth/Login";
import { ManagerBase } from "./elements/ManagerBase";
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

const router = createBrowserRouter([
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
        path: '/organizations/:username',
        element: <AllPartnerAnimals />
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
    path: '/partner',
    element: <ManagerBase />,
    children: [
      {
        index: true,
        element: <PartnerAnimalManage />
      },
      {
        element: <PartnerEditAnimal />,
        path: 'animal/:id'
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
])

export default router