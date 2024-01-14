import ReactDOM from 'react-dom/client';
import './assets/index.css';
import  { RouterApp } from './Routes';
import { SpeciesContextProvider } from './utils/context/SpeciesContext';
import { CategoriesContextProvider } from './utils/context/CategoriesContext';
import { AuthProvider } from './utils/context/AuthContext';
import {ChakraProvider, StyleFunctionProps, extendTheme} from '@chakra-ui/react'
import { FiltersContextProvider } from './utils/context/FiltersContext';
import { OrganizationsProvider } from './utils/context/OrganizationsContext';
import ReactGA from 'react-ga4'
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
  );
  
  const overrides = extendTheme({
    styles: {
      global: (props: StyleFunctionProps) => ({
        body: {
          fontFamily: '"Roboto", "Noto", sans-serif"'
        },
      }),
    },
  })

  
//Google analytics 4 initialization
//
ReactGA.initialize("G-2KJE25C9EN")
root.render(
  <FiltersContextProvider>
    <OrganizationsProvider>
      <ChakraProvider theme={overrides}>
        <AuthProvider>
          <CategoriesContextProvider>
            <SpeciesContextProvider>
              <RouterApp />
            </SpeciesContextProvider>
          </CategoriesContextProvider>
        </AuthProvider>
      </ChakraProvider>
    </OrganizationsProvider>
  </FiltersContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
