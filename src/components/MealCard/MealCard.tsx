import React from 'react';
import {Link} from "react-router-dom";

import ButtonSpinner from "../Spinner/ButtonSpinner";

interface Props {
  title: string;
  text: string;
  amount: string;
  id: string;
  onDeleteClick: React.MouseEventHandler;
  isLoading?: boolean
}

const MealCard: React.FC<Props> = ({
                                     title,
                                     text,
                                     amount,
                                     id,
                                     onDeleteClick,
                                     isLoading = false
                                   }) => {

  return (
    <div className="card d-flex justify-content-between">
      <div>
        <p>{title}</p>
        <p>{text}</p>
      </div>
      <div>
        <span>{amount}</span>
        <Link to={'meals/' + id + '/edit'} className="btn btn-success" aria-disabled={isLoading}>Edit</Link>
        <button className="btn btn-danger" onClick={onDeleteClick} disabled={isLoading}>
          {isLoading && <ButtonSpinner/>}
          Delete</button>
      </div>
    </div>
  );
};

export default MealCard;