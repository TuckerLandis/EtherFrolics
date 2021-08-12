import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { useDispatch } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';

// Admin Components
import AdminLandingPage from '../Admin/AdminLandingPage';
import ProviderManagementGeneral from '../Admin/ProviderManagementGeneral';
import ProviderManagementIndividual from '../Admin/ProviderManagementIndividual';

// Provider Registration Components
import GeneralInfo from '../ProviderRegistration/GeneralInfo';
import GeneralInfoAddress from '../ProviderRegistration/GeneralInfoAddress';
import WorkHistory from '../ProviderRegistration/WorkHistory';
import MissionHistory from '../ProviderRegistration/MissionHistory';
import Education from '../ProviderRegistration/Education';
import MedCred from '../ProviderRegistration/MedCred';
import Insurance from '../ProviderRegistration/Insurance';

// Provider Components
import ProviderLandingPage from '../Provider/ProviderLandingPage';
import CreateMissionPage from '../Admin/CreateMissionPage';

// Mission Components
import MissionTable from '../Mission/MissionTable';
import EditMissionPage from '../Admin/EditMissionPage'
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';

/* Alegreya-sans Font imports */
import AlegreyaSansEot from "../../fonts/alegreya-sans-v14-latin-regular.eot";
import AlegreyaSansSvg from "../../fonts/alegreya-sans-v14-latin-regular.svg";
import AlegreyaSansTtf from "../../fonts/alegreya-sans-v14-latin-regular.ttf";
import AlegreyaSansWoff from "../../fonts/alegreya-sans-v14-latin-regular.woff";
import AlegreyaSansWoff2 from "../../fonts/alegreya-sans-v14-latin-regular.woff2"
/**/

import './App.css';

  const alegreyaSans = {
    fontFamily: 'Alegreya-Sans',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 400,
    src: `
      local('Alegreya-Sans'),
      url(${AlegreyaSansEot}) format('embedded-opentype'),
      url(${AlegreyaSansSvg}) format('svg')
      url(${AlegreyaSansTtf}) format('truetype')
      url(${AlegreyaSansWoff}) format('woff')
      url(${AlegreyaSansWoff2}) format('woff2')
    `,
  }

  /*Material-UI Theme Config.*/
  const theme = createTheme({
    typography: {
      fontFamily: ['Alegreya-Sans', 'Arial', 'Georgia', 'system-ui'].join(','),
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '@font-face': [alegreyaSans],
        },
      },
    },
    palette: {
        primary: {
        main: '#7fbf7f'
      },
      secondary: {
        main: '#7fbfbf'
      }
    },
  });
  /*Material-UI Theme Config.*/

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

            {/* For protected routes, the view could show one of several things on the same route.
              Visiting localhost:3000 will show the appropriate user landing page depending on their authorization level, and if the user is logged in.
              If the user is not logged in, the ProtectedRoute will show the EtherFrolics login page. */}

            {/* When a value is supplied for the authRedirect prop the user will
              be redirected to the path supplied when logged in, otherwise they will
              be taken to the component and path supplied. */}
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LoginPage at /login
              exact
              path="/login"
              authRedirect="/providerlandingpage"
              adminRedirect="/adminlandingpage"
            >
              <LoginPage />
            </ProtectedRoute>

            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows RegisterPage at "/registration"
              exact
              path="/registration"
              authRedirect="/providerlandingpage"
            >
              <RegisterPage />
            </ProtectedRoute>

            {/* Admin Views */}

            <ProtectedRoute
              exact
              path="/adminlandingpage"
              // authRedirect="/providerlandingpage"
              >
              <AdminLandingPage />
            </ProtectedRoute>

            <ProtectedRoute
              exact
              path="/providermgmt"
              // authRedirect="/providerlandingpage"
              >
              <ProviderManagementGeneral />
            </ProtectedRoute>

            <ProtectedRoute
              exact
              path="/providermgmt/:id"
              // authRedirect="/providerlandingpage"
              >
              <ProviderManagementIndividual />
            </ProtectedRoute>

            {/* Provider Views */}

            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LandingPage at "/home"
              path="/providerlandingpage"
              // adminRedirect="/adminlandingpage"
            >
              <ProviderLandingPage />
            </ProtectedRoute>

            {/* PROVIDER REGISTRATION */}

            <ProtectedRoute
              exact
              path="/generalInfo">
              <GeneralInfo/>
            </ProtectedRoute>

            <ProtectedRoute
              exact
              path="/generalInfoAddress">
              <GeneralInfoAddress/>
            </ProtectedRoute>

            <ProtectedRoute
              exact
              path="/workhistory">
              <WorkHistory/>
            </ProtectedRoute>

            <ProtectedRoute
              exact
              path="/missionhistory">
              <MissionHistory/>
            </ProtectedRoute>

            <ProtectedRoute
              exact
              path="/education">
              <Education/>
            </ProtectedRoute>

            <ProtectedRoute
              exact
              path="/medcred">
              <MedCred/>
            </ProtectedRoute>

            <ProtectedRoute
              exact
              path="/insurance">
              <Insurance/>
            </ProtectedRoute>

            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to “/providerlandingpage"
              // - if logged in as admin, redirects to "/adminlandingpage"
              // - else shows LandingPage at “/home”
              path="/home"
              authRedirect="/providerlandingpage"
              adminRedirect="/adminlandingpage"
            >
              <LandingPage theme={theme} />
            </ProtectedRoute>

              {/* Mission Views */}

            <ProtectedRoute

            exact path="/createmissionpage"
            >
              <CreateMissionPage />
              </ProtectedRoute>

            <ProtectedRoute
            exact
            path="/editmission">
              <EditMissionPage />
            </ProtectedRoute>
            

            <ProtectedRoute
              exact
              path="/missions">
              <MissionTable />
            </ProtectedRoute>

            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <h1>404</h1>
            </Route>
          </Switch>
          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
