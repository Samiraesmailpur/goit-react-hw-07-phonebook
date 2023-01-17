import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LabelBtn, InputFilter } from './Filter.styled';
import { updateFilter } from '../../redux/filterSlice';
import { getFilter } from '../../redux/selectors';

const Filter = () => {
  const state = useSelector(getFilter);
  const dispatch = useDispatch();

  const changeFilter = e => {
    dispatch(updateFilter(e.currentTarget.value));
  };

  return (
    <LabelBtn>
      Find contacts by name
      <InputFilter type="text" value={state.filters} onChange={changeFilter} />
    </LabelBtn>
  );
};

export default Filter;
