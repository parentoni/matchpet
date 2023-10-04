import { createBrowserRouter } from "react-router-dom";
import { App } from "./Base";
import { SpecificAnimal } from "./pages/SpecificAnimal";
import { AllAnimals } from "./pages/AllAnimals";
import { Login } from "./pages/Login";

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
    path:'/animal/:animalId',
    element: <SpecificAnimal />
  },
  {
    path: '/auth/login',
    element: <Login />
  }
])

export default router