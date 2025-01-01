import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import questions from "features/nutrition/questions";

const NUTRITION_KEY = "nutrition";

export interface NutritionEntry {
  name: string;
  age: string;
  gender: string;
  answers: boolean[];
  date: string;
}

function getHistory() {
  let history: NutritionEntry[] = [];
  try {
    const saved = localStorage.getItem(NUTRITION_KEY);
    if (saved != null) {
      history = JSON.parse(saved) as NutritionEntry[];
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
  return history;
}

// function saveHistory(history: NutritionEntry[]) {
//   try {
//     localStorage.setItem(NUTRITION_KEY, JSON.stringify(history));
//   } catch (error) {
//     // eslint-disable-next-line no-console
//     console.error(error);
//   }
// }

interface State {
  history: NutritionEntry[];
  current?: NutritionEntry;
}

const initialState: State = {
  history: getHistory(),
};

const nutritionSlice = createSlice({
  name: "nutrition",
  initialState,
  reducers: {
    newEntry(state) {
      state.current = {
        name: "",
        age: "",
        gender: "",
        answers: new Array(questions.length).fill(false) as boolean[],
        date: new Date().toISOString(),
      };
    },
    changeName(state, action: PayloadAction<string>) {
      if (state.current == null) return;
      state.current.name = action.payload;
    },
    changeAge(state, action: PayloadAction<string>) {
      if (state.current == null) return;
      state.current.age = action.payload;
    },
    changeGender(state, action: PayloadAction<string>) {
      if (state.current == null) return;
      state.current.gender = action.payload;
    },
    setAnswer(state, action: PayloadAction<{ index: number; value: boolean }>) {
      if (state.current == null) return;
      const { index, value } = action.payload;
      state.current.answers[index] = value;
    },
    saveToHistory(state, action: PayloadAction<number>) {
      if (state.current == null) return;
      state.current.date = new Date().toISOString();
      const index = action.payload;
      if (Number.isNaN(index) || state.history.at(index) == null)
        state.history.push(state.current);
      else state.history[index] = state.current;
      state.current = undefined;
      // saveHistory(state.history);
    },
    loadHistory(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (Number.isNaN(index) || state.history.at(index) == null)
        nutritionSlice.caseReducers.newEntry(state);
      else state.current = state.history.at(action.payload);
    },
  },
});

export default nutritionSlice;
