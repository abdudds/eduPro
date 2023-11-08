import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    course:null,
};

export const tutorSlice = createSlice({
  name: 'name',
  initialState,
  reducers: {
    UpdateCourse: (state, action) => {
      state.course = action.payload
    },
  },
});

export const { UpdateCourse } = tutorSlice.actions;

export default tutorSlice.reducer;
