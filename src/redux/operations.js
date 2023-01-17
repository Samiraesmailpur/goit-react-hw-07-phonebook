import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'https://63c3eb7ca9085635752e45d9.mockapi.io/contacts';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const contacts = await fetch(`${BASE_URL}`);
      return await contacts.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.massage);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      const contacts = await fetch(`${BASE_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(contact),
      });
      return await contacts.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.massage);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      const contacts = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
      return await contacts.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.massage);
    }
  }
);
