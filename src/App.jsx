import React, { useContext, useState, useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import LeftBar from './components/leftBar/LeftBar';
import RightBar from './components/rightBar/RightBar';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import './style.scss';
import { DarkModeContext } from './context/darkModeContext';
import { AuthContext } from './context/authContext';
import * as Components from './components/signin/Components.jsx';
import './components/signin/stule.css';
import './components/signin/styles.css';
import image1 from './components/signin/images/image1.jpg';
import image2 from './components/signin/images/image2.jpg';
import image3 from './components/signin/images/image3.jpg';
import image4 from './components/signin/images/image4.jpg';
import image5 from './components/signin/images/image5.jpg';
import image6 from './components/signin/images/image6.jpg';
import image7 from './components/signin/images/image7.jpg';
import image8 from './components/signin/images/image8.jpg';
import image9 from './components/signin/images/image9.jpg';
import image10 from './components/signin/images/image10.jpg';
import image11 from './components/signin/images/image11.jpg';
import image12 from './components/signin/images/image12.jpg';
import image13 from './components/signin/images/image13.jpg';
import image14 from './components/signin/images/image14.jpg';
import image15 from './components/signin/images/image15.jpg';
import { getHome } from './components/utils/ApiFunctions.js'; // Corrected import path

function Login() {
  const [signIn, toggle] = useState(true);
  const [newHome, setNewHome] = useState("");

  const images = [
    image1, image2, image3, image4, image5,
    image6, image7, image8, image9,
    image10, image11, image12, image13, image14, image15,
  ];

  useEffect(() => {
    getHome().then((data) => {
      setNewHome(data);
    }).catch((error) => {
      console.error(error.message);
    });
  }, []);

  return (
    <>
      <Components.Container>
        <Components.SignUpContainer signinIn={signIn}>
          <Components.Form>
            <Components.Title>Create Account</Components.Title>
            <Components.Input type='text' placeholder='Full Name' />
            <Components.Input type='text' placeholder='UserName' />
            <Components.Input type='email' placeholder='Email' />
            <Components.Input type='password' placeholder='Password' />
            <Components.Button>Sign Up</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>

        <Components.SignInContainer signinIn={signIn}>
          <Components.Form>
            <Components.Title>Sign in</Components.Title>
            <Components.Input type='text' placeholder='Username' />
            <Components.Input type='password' placeholder='Password' />
            <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
            <Components.Button>Sigin In</Components.Button>
          </Components.Form>
        </Components.SignInContainer>

        <Components.OverlayContainer signinIn={signIn}>
          <Components.Overlay signinIn={signIn}>
            <Components.LeftOverlayPanel signinIn={signIn}>
              <Components.Title>Welcome Back!</Components.Title>
              <Components.Paragraph>
                To keep connected with us please login with your personal info
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(true)}>
                Sign In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>

            <Components.RightOverlayPanel signinIn={signIn}>
              <Components.Title>Hello, Friend!</Components.Title>
              <Components.Paragraph>
                Enter Your personal details and start journey with us
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(false)}>
                Sigin Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>

      <div className="image-container">
        {images.map((image, index) => (
          <img
            key={index}
            className="image"
            src={image}
            alt={`Inclined Image ${index + 1}`}
          />
        ))}
      </div>

      <div>
        <h1>{newHome}</h1>
      </div>
    </>
  );
}

function App() {
  const { currentUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);

  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar />
        <div style={{ display: 'flex' }}>
          <LeftBar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/register" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/profile/:id',
          element: <Profile />,
        },
      ],
    },
    {
      path: '/register',
      element: <Login />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
