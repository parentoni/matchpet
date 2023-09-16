import { createBrowserRouter } from "react-router-dom";
import { App } from "./Base";
import { Listing } from "./pages/Listing";
import { SpecificAnimal } from "./pages/SpecificAnimal";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'animal/:animalId',
        element: <SpecificAnimal />
      }
    ]
  }
])

export default router