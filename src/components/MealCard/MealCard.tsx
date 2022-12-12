import React from 'react';
import {Link, useParams} from "react-router-dom";

interface Props {
  title: string;
  text: string;
  amount: string;
  id: string;
}

const MealCard: React.FC<Props> = ({title, text, amount, id}) => {

  return (
    <div className="card d-flex justify-content-between">
      <div>
        <p>{title}</p>
        <p>{text}</p>
      </div>
    <div>
      <span>{amount}</span>
      <Link to={'meals/' + id + '/edit'}>Edit</Link>
      <button>Delete</button>
    </div>

    </div>
  );
};

export default MealCard;