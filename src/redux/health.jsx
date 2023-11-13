import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playerHealth: 100,
  enemyHealth: 100,
};

export const fightersHealthReducer = createSlice({
  name: "health",
  initialState,
  reducers: {
    affectPlayerHealth: (state, action) => {
      state.playerHealth += action.payload;
    },
    affectEnemyHealth: (state, action) => {
      state.enemyHealth += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { affectPlayerHealth, affectEnemyHealth } =
  fightersHealthReducer.actions;

export default fightersHealthReducer.reducer;
