import React from "react";
import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';
import App from 'frontend'
import "tailwindcss/tailwind.css";
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';


function Index({ pageProps }) {
  return (
    <RecoilRoot>
      <App {...pageProps} />
      <ToastContainer />
    </RecoilRoot>
  )
}

export default Index
