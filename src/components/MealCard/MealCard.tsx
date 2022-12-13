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
    <div className="card d-flex justify-content-between p-2 flex-row mb-2 shadow-sm align-items-center">
      <div>
        <p className='fw-bold'>{title}</p>
        <p className="fst-italic">{text}</p>
        <span className="fw-lighter">calories: {amount}</span>
      </div>
      <div className='w-25 d-flex flex-column'>
        <Link
          to={'meals/' + id + '/edit'}
          className="btn btn-outline-dark mb-2"
          aria-disabled={isLoading}>Edit</Link>
        <button
          className="btn btn-outline-danger"
          onClick={onDeleteClick}
          disabled={isLoading}>
          {isLoading && <ButtonSpinner/>}
          Delete
        </button>
      </div>
    </div>
  );
};

export default MealCard;