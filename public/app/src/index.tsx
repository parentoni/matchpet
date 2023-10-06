import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/index.css';
import { RouterProvider } from 'react-router-dom';
import router from './Routes';
import { SpeciesContextProvider } from './utils/context/SpeciesContext';
import { CategoriesContextProvider } from './utils/context/CategoriesContext';
import { AuthProvider } from './utils/context/AuthContext';
import {ChakraProvider} from '@chakra-ui/react'
import { FiltersContext, FiltersContextProvider } from './utils/context/FiltersContext';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <FiltersContextProvider>
    <ChakraProvider>
      <AuthProvider>
        <CategoriesContextProvider>
          <SpeciesContextProvider>
            <RouterProvider router={router}/>
          </SpeciesContextProvider>
        </CategoriesContextProvider>
      </AuthProvider>
    </ChakraProvider>
  </FiltersContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
