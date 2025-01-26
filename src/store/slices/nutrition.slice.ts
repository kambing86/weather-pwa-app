import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import questions from "features/nutrition/questions";
import localforage from "localforage";

const NUTRITION_KEY = "nutrition";

export interface NutritionEntry {
  name: string;
  age: string;
  gender: string;
  version: number;
  answers: number[];
  date: string;
}

export async function getHistory() {
  let history: NutritionEntry[] = [];
  try {
    const saved = await localforage.getItem<string>(NUTRITION_KEY);
    if (saved != null) {
      history = JSON.parse(saved) as NutritionEntry[];
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
  return history;
}

async function saveHistory(history: NutritionEntry[]) {
  try {
    await localforage.setItem(NUTRITION_KEY, JSON.stringify(history));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

interface State {
  ready: boolean;
  history: NutritionEntry[];
  current?: NutritionEntry;
}

const initialState: State = {
  ready: false,
  history: [],
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
        version: 1,
        answers: new Array(questions.length).fill(0) as number[],
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
      state.current.answers[index] = value ? 1 : 0;
    },
    saveToHistory(state, action: PayloadAction<number>) {
      if (state.current == null) return;
      state.current.date = new Date().toISOString();
      const index = action.payload;
      if (Number.isNaN(index) || state.history.at(index) == null)
        state.history.push(state.current);
      else state.history[index] = state.current;
      state.current = undefined;
      void saveHistory(state.history);
    },
    loadHistory(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (Number.isNaN(index) || state.history.at(index) == null)
        nutritionSlice.caseReducers.newEntry(state);
      else state.current = state.history.at(action.payload);
    },
    setHistory(state, action: PayloadAction<NutritionEntry[]>) {
      state.history = action.payload;
      state.ready = true;
    },
    removeHistory(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (!Number.isNaN(index) && state.history.at(index) != null) {
        state.history.splice(index, 1);
      }
      void saveHistory(state.history);
    },
  },
});

export default nutritionSlice;
