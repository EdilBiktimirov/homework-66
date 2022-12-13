import React, {useCallback, useEffect, useState} from 'react';
import axiosApi from "../../axiosApi";
import {MealTypeMutation} from "../../types";
import {useParams} from "react-router-dom";
import MealForm from "../../components/MealForm/MealForm";
import Spinner from "../../components/Spinner/Spinner";


interface Props {
  isEdit?: boolean;
}

const CreateEditMeal: React.FC<Props> = ({isEdit}) => {
  const {id} = useParams();

  const [editedMeal, setEditedMeal] = useState<MealTypeMutation>({
    name: '',
    text: '',
    amount: '',
  });

  // const [creating, setCreating] = useState(false);

  const [loading, setLoading] = useState(false);

  const fetchMeal = useCallback(async () => {
      if (isEdit) {
        try {
          // setCreating(true);
          setLoading(true);
          const response = await axiosApi.get<MealTypeMutation | null>('/meals/' + id + '.json');


          if (response.data) {
            setEditedMeal(response.data)
          }

        } finally {
          // setCreating(false);
          setLoading(false);
        }

      }

  }, [isEdit, id])

  useEffect(() => {
    fetchMeal().catch(console.error);
  }, [fetchMeal, id])

  return (
    <div>
      {loading ? <Spinner/>: <MealForm existingMeal={editedMeal}/>}
    </div>
  );
};

export default CreateEditMeal;