import * as optionInMemory from "@/stores/helpers/option-in-memory";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type OptionProp = {
  id: string;
  text: string;
  active: boolean;
};

export type OptionSelectorProp = {
  id: string;
  title: string;
  active: boolean;
  data: OptionProp[];
};

type StateProps = {
  options: OptionSelectorProp[];
  add: (optionText: string, optionSelectorId: string) => void;
  remove: (optionId: string, optionSelectorId: string) => void;
  addSelector: (title: string) => void;
  removeSelector: (optionSelectorToRemoveId: string) => void;
  clear: () => void;
};

export const useOptionsStore = create(
  persist<StateProps>(
    (set) => ({
      options: [],
      add: (optionText: string, optionSelectorId: string) =>
        set((state) => ({
          options: optionInMemory.add(
            state.options,
            optionText,
            optionSelectorId
          ),
        })),
      remove: (optionId: string, optionSelectorId: string) =>
        set((state) => ({
          options: optionInMemory.remove(
            state.options,
            optionId,
            optionSelectorId
          ),
        })),
      addSelector: (title: string) =>
        set((state) => ({
          options: optionInMemory.addSelector(state.options, title),
        })),
      removeSelector: (optionSelectorToRemoveId: string) =>
        set((state) => ({
          options: optionInMemory.removeSelector(
            state.options,
            optionSelectorToRemoveId
          ),
        })),
      clear: () =>
        set(() => ({
          options: optionInMemory.clear(),
        })),
    }),
    {
      name: "randomrole:options",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
