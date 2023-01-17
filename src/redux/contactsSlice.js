import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

const contactsInitialState = {
  contacts: [],
  isLoading: false,
  error: null,
};

const extraActions = [fetchContacts, addContact, deleteContact];
const getActions = type => isAnyOf(...extraActions.map(action => action[type]));
const fetchContactsFulfilledReducer = (state, action) => {
  state.contacts = action.payload;
};
const addContactsFulfilledReducer = (state, action) => {
  state.contacts.push(action.payload);
};

const deleteContactsFulfilledReducer = (state, action) => {
  const index = state.contacts.findIndex(
    contact => contact.id === action.payload
  );
  state.contacts.splice(index, 1);
};

const anyPendingReducer = state => {
  state.isLoading = true;
};

const anyFulfilledReducer = state => {
  state.isLoading = false;
  state.error = null;
};
const anyRejectedReducer = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  extraReducers: builder => {
    console.log(builder);
    builder
      .addCase(fetchContacts.fulfilled, fetchContactsFulfilledReducer)
      .addCase(addContact.fulfilled, addContactsFulfilledReducer)
      .addCase(deleteContact.fulfilled, deleteContactsFulfilledReducer)
      .addMatcher(getActions('pending'), anyPendingReducer)
      .addMatcher(getActions('rejected'), anyRejectedReducer)
      .addMatcher(getActions('fulfilled'), anyFulfilledReducer);
  },
});

export const contactsReducer = contactsSlice.reducer;
