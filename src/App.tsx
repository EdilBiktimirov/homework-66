import React from 'react';
import {Link, Route, Routes} from "react-router-dom";
import Home from "./containers/Home/Home";
import CreateEditMeal from "./containers/CreateEditMeal/CreateEditMeal";

function App() {
  // const location = useLocation();





  return (
    <div className="App">
      <Link to={'/'}>Calories tracker</Link>
      <Link to={'/add-meal'}>Add new Meal</Link>
      <Routes>
        <Route path={'/'} element={(
          <Home/>
        )}/>
        {/*<Route path={'/meals'} element={(*/}
        {/*  <Home meals={meals}/>*/}
        {/*)}/>*/}
        <Route path={'/add-meal'} element={(
          <CreateEditMeal/>
        )}/>
        <Route path={'meals/:id/edit'} element={(
          <CreateEditMeal isEdit/>
        )}/>

        <Route path={'*'} element={<h3>Not found</h3>}/>
      </Routes>

    </div>
  );
}

export default App;
