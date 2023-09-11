import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { Listing } from "./Listing";
import { SpecificAnimal } from "./SpecificAnimal";

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