import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages";
import { CompanyProvider } from "./context";

function MainRoutes(): JSX.Element {
  return (
    <React.Fragment>
      <ToastContainer />
      <BrowserRouter>
        <CompanyProvider>
          <Routes>
            <Route path="/" element={<Home />}></Route>
          </Routes>
        </CompanyProvider>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default MainRoutes;
