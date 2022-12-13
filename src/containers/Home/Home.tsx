import React, {useCallback, useEffect, useRef, useState} from 'react';
import {MealsType, MealType} from "../../types";
import MealCard from "../../components/MealCard/MealCard";
import axiosApi from "../../axiosApi";
import Spinner from "../../components/Spinner/Spinner";

// interface Props {
//   meals: MealType[];
// }

const Home: React.FC = () => {
  // const navigate = useNavigate();


  const [meals, setMeals] = useState<MealType[]>([]);
  const [mealId, setMealId] = useState<string>('');
  const [loading, setLoading] = useState(false);
  // const [deleting, setDeleting] = useState(false);

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
      // setDeleting(true);
      await axiosApi.delete('/meals/' + id + '.json');
      setMeals([]);
      await fetchMeals().catch(console.error);
    } finally {
      // setDeleting(false);
      // navigate('/')
    }
  };

  const getCalories = () => {
    return meals.reduce((acc, elem) => {
      return acc + parseInt(elem.amount);
    }, 0);
  };


  useEffect(() => {
    void fetchMeals();
  }, [fetchMeals]);


  return (
    <div>
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