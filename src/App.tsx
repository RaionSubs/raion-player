import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Loading from "./components/loading/loading";
import MetaTags from "./components/meta/metaTags";
import { initNewLanguage } from "./helpers/initNewLanguage";
import { useTranslation } from 'react-i18next';
import Aos from "aos";
import "aos/dist/aos.css";
import { ReactTypes } from "./types/reactPages";

const IndexPage = lazy(() => import("./pages/index/index"));
const PlayerPage = lazy(() => import("./pages/player/player"));
const ErrorPage = lazy(() => import("./pages/error/error"));


export default function App(): ReactTypes {

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    initNewLanguage(localStorage.getItem("language") || "en");
  }, []);

  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Router>
        <HelmetProvider>
          <Suspense fallback={<Loading isCenter={true} />}>
            <MetaTags />
            <Routes>
              <Route
                path="/"
                element={<IndexPage />}
              />
              <Route
                path="/player/:Id"
                element={<PlayerPage />}
              />
              <Route path="*" element={<ErrorPage redirect={true} button={true} statusCode={404} message={t("error.404")} />} />
            </Routes>
          </Suspense>
        </HelmetProvider>
      </Router>
    </React.Fragment>
  );

};
