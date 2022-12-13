import React, {useCallback, useEffect, useState} from 'react';
import axiosApi from "../../axiosApi";
import {useParams} from "react-router-dom";
import MealForm from "../../components/MealForm/MealForm";
import Spinner from "../../components/Spinner/Spinner";
import type {MealTypeMutation} from "../../types";

interface Props {
  isEdit?: boolean;
}

const CreateEditMeal: React.FC<Props> = ({isEdit}) => {
  const {id} = useParams();

  const [loading, setLoading] = useState(false);
  const [editedMeal, setEditedMeal] = useState<MealTypeMutation>({
    name: '',
    text: '',
    amount: '',
  });

  const fetchMeal = useCallback(async () => {
      if (isEdit) {
        try {
          setLoading(true);
          const response = await axiosApi.get<MealTypeMutation | null>('/meals/' + id + '.json');

          if (response.data) {
            setEditedMeal(response.data)
          }
        } finally {
          setLoading(false);
        }
      }
  }, [isEdit, id])

  useEffect(() => {
    fetchMeal().catch(console.error);
  }, [fetchMeal, id]);

  return (
    <div>
      {loading ? <Spinner/>: <MealForm existingMeal={editedMeal}/>}
    </div>
  );
};

export default CreateEditMeal;