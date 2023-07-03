import NavBar from "@/components/NavBar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React, { Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <NavBar />
      <Component {...pageProps} />
    </React.StrictMode>
  );
}
