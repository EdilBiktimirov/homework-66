import React, {useCallback, useEffect, useState} from 'react';
import MealCard from "./components/MealCard/MealCard";
import MealForm from "./components/MealForm/MealForm";
import {MealsType, MealType} from "./types";
import axiosApi from "./axiosApi";
import {Link, Route, Routes} from "react-router-dom";
import Home from "./containers/Home/Home";

function App() {

  const [meals, setMeals] = useState<MealType[]>([]);

  const fetchMeals = useCallback(async () => {
    const response = await axiosApi.get<MealsType| null>('/meals.json');
    const responseMeals = response.data;
    console.log(response.data)

    if (responseMeals!== null) {
      const newMeals = Object.keys(responseMeals).map((elem) => {
          const meal = responseMeals[elem];
          meal.id = elem;
          return meal;
      });

      setMeals(newMeals);
      // console.log(meals);
    }

  }, [])

  useEffect(() => {
    void fetchMeals();
  }, [fetchMeals]);


  return (
    <div className="App">
      <Link to={'/'}>Calories tracker</Link>
      <Routes>
        <Route path={'/'} element={(
          <Home meals={meals}/>
        )}/>
        <Route path={'meals/:id/edit'} element={(
          <MealForm isEdit/>
        )}/>
      </Routes>

    </div>
  );
}

export default App;
