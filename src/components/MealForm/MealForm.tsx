import React, {FormEvent, useState} from 'react';
import {MealTypeMutation} from "../../types";
import axiosApi from "../../axiosApi";
import {useNavigate, useParams} from "react-router-dom";

import ButtonSpinner from "../Spinner/ButtonSpinner";

interface Props {
  existingMeal?: MealTypeMutation;
}

const MEALS: string[] = ['breakfast', 'snack', 'lunch', 'dinner'];

const MealForm: React.FC<Props> = ({existingMeal}) => {
  const [creating, setCreating] = useState(false);


  const {id} = useParams();
  const navigate = useNavigate();
  const initialState = existingMeal ? {
    ...existingMeal
  } : {
    name: '',
    text: '',
    amount: '',
  }
  const [meal, setMeal] = useState<MealTypeMutation>(initialState);

  const onMealChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;

    setMeal(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (id) {
      try {
        setCreating(true);
        await axiosApi.put('/meals/' + id + '.json', meal)
      } finally {
        setCreating(false);
      }

    } else {
      try {
        setCreating(true);
        await axiosApi.post('/meals.json', meal);

      } finally {
        setCreating(false);
        navigate('/');
      }
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

      <button type="submit" className="btn btn-primary" disabled={creating}>
        {creating && <ButtonSpinner/>}
        Save</button>
    </form>
  );
};

export default MealForm;