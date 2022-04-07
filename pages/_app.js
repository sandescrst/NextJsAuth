
import { SessionProvider } from "next-auth/react";
import "../styles/globals.scss"
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Layout from "./components/layout";

import {Switch, Route} from "react-router-dom"


export default function MyApp({
  Component, 
  pageProps: { session, ...pageProps },
 }) {
  return ( 
    <Layout>
      <SessionProvider session={session}>
        <Navbar/>
        <Sidebar/>
        <Component {...pageProps} />
      </SessionProvider>
    </Layout>

  );
}
