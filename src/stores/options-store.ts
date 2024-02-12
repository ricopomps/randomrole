import * as optionInMemory from "@/stores/helpers/option-in-memory";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type OptionProp = {
  id: string;
  text: string;
  active: boolean;
};

type StateProps = {
  options: OptionProp[];
  add: (option: OptionProp) => void;
  remove: (optionId: string) => void;
};

export const useOptionsStore = create(
  persist<StateProps>(
    (set) => ({
      options: [],
      add: (option: OptionProp) =>
        set((state) => ({
          options: optionInMemory.add(state.options, option),
        })),
      remove: (optionId: string) =>
        set((state) => ({
          options: optionInMemory.remove(state.options, optionId),
        })),
    }),
    {
      name: "randomrole:options",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
