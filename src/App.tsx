import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "./containers/Home/Home";
import CreateEditMeal from "./containers/CreateEditMeal/CreateEditMeal";
import Layout from "./components/Layout/Layout";

function App() {

  return (
    <Layout>
      <Routes>
        <Route path={'/'} element={(
          <Home/>
        )}/>
        <Route path={'/add-meal'} element={(
          <CreateEditMeal/>
        )}/>
        <Route path={'meals/:id/edit'} element={(
          <CreateEditMeal isEdit/>
        )}/>
        <Route path={'*'} element={<h3>Not found</h3>}/>
      </Routes>
    </Layout>
  );
}

export default App;
