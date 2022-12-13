import React, {useCallback, useEffect, useState} from 'react';
import axiosApi from "../../axiosApi";
import MealCard from "../../components/MealCard/MealCard";
import Spinner from "../../components/Spinner/Spinner";
import type {MealsType, MealType} from "../../types";

const Home: React.FC = () => {
  const [meals, setMeals] = useState<MealType[]>([]);
  const [mealId, setMealId] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const fetchMeals = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosApi.get<MealsType | null>('/meals.json');
      const responseMeals = response.data;

      if (responseMeals !== null) {
        const newMeals = Object.keys(responseMeals).map((elem) => {
          const meal = responseMeals[elem];
          meal.id = elem;
          return meal;
        });
        setMeals(newMeals);
      }
    } finally {
      setLoading(false);
    }
  }, [])

  const deleteMeal = async (id: string) => {
    try {
      setMealId(id);
      await axiosApi.delete('/meals/' + id + '.json');
      setMeals([]);
      await fetchMeals().catch(console.error);
    } catch (e) {
      console.log(e);
    }
  };

  const getCalories = () => {
    return meals.reduce((acc, elem) => {
      return acc + parseInt(elem.amount);
    }, 0);
  };

  useEffect(() => {
    fetchMeals().catch(console.error);
  }, [fetchMeals]);

  return (
    <div className="p-2">
      <p>{'Total calories: ' + getCalories()}</p>
      {loading ? <Spinner/> : meals.map((elem) => (
        <MealCard
          title={elem.name}
          text={elem.text}
          amount={elem.amount}
          key={elem.id}
          id={elem.id}
          onDeleteClick={() => deleteMeal(elem.id)}
          isLoading={mealId === elem.id}
        />
      ))}
    </div>
  );
};

export default Home;