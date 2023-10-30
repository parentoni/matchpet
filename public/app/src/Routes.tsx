import { createBrowserRouter } from "react-router-dom";
import { App } from "./Base";
import { SpecificAnimal } from "./pages/user/SpecificAnimal";
import { AllAnimals } from "./pages/user/AllAnimals";
import { Login } from "./pages/user/Login";
import { ManagerBase } from "./elements/ManagerBase";
import { PartnerAnimalManage } from "./pages/partner/PartnerAnimalManage";
import { Testing } from "./pages/testing/Testing";
import { FourOFour } from "./pages/error/fourOFour";
import { PartnerEditAnimal } from "./pages/partner/PartnerEditAnimal";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <AllAnimals />
      },
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
    path:'/animal/:animalId',
    element: <SpecificAnimal />
  },
  {
    path: '/auth/login',
    element: <Login />
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