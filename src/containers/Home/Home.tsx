import React from 'react';
import {MealType} from "../../types";
import {Route} from "react-router-dom";
import MealCard from "../../components/MealCard/MealCard";

interface Props {
  meals: MealType[];
}

const Home: React.FC<Props> = ({meals}) => {
  return (
    <div>
      {meals.map((elem) => (
          <MealCard title={elem.name} text={elem.text} amount={elem.amount} key={elem.id} id={elem.id}/>
        ))}
    </div>
  );
};

export default Home;