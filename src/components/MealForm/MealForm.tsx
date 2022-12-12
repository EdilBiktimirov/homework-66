import React, {FormEvent, useState} from 'react';
import {MealsType, MealTypeMutation} from "../../types";
import axiosApi from "../../axiosApi";
import {useParams} from "react-router-dom";
import {isElement} from "react-dom/test-utils";

interface Props {
  isEdit?: boolean;
}

const MEALS: string[] = ['breakfast', 'snack', 'lunch', 'dinner'];

const MealForm:React.FC<Props> = ({isEdit}) => {
  const {id} = useParams();


  const [meal, setMeal] = useState<MealTypeMutation>({
    name: '',
    text: '',
    amount: '',
  });

  const onMealChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;

    setMeal(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (isEdit) {
      const response = await axiosApi.get<MealsType | null>('/meals/' + id + '.json');
      console.log(response.data);
    }

    try {
      await axiosApi.post('/meals.json', meal)
    } finally {

    }

  }


  return (
    <form onSubmit={onFormSubmit}>
      <select
        className="form-select my-2 w-75"
        id={"page"}
        name={"name"}
        value={meal.name}
        onChange={onMealChange}
      >
        <option disabled value=''>Select meal</option>
        {MEALS.map((elem) => (
          <option value={elem} key={Math.random()}>{elem}</option>
        ))}
      </select>

      <input
        className="form-control my-2 w-75"
        name={'text'}
        type="text"
        value={meal.text}
        onChange={onMealChange}
      />

      <input
        className="form-control my-2 w-25"
        name={'amount'}
        type="number"
        value={meal.amount}
        onChange={onMealChange}
        />

      <button type="submit" className="btn btn-primary">Save</button>
    </form>
  );
};

export default MealForm;