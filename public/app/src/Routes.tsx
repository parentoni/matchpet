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
    path: '/test',
    element: <Testing />
  },
  {
    path: '*',
    element: <FourOFour />
  }
])

export default router