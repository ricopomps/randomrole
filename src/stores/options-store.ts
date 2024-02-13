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
  activateOption: (optionId: string, optionSelectorId: string) => void;
  deactivateOption: (optionId: string, optionSelectorId: string) => void;
  activateOptionSelector: (optionSelectorId: string) => void;
  deactivateOptionSelector: (optionSelectorId: string) => void;
  selectRandomRole: () => OptionProp | void;
  activateAll: () => void;
  deactivateAll: () => void;
};

export const useOptionsStore = create(
  persist<StateProps>(
    (set, get) => ({
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
      activateOption: (optionId: string, optionSelectorId: string) =>
        set((state) => ({
          options: optionInMemory.activateOption(
            state.options,
            optionId,
            optionSelectorId
          ),
        })),
      deactivateOption: (optionId: string, optionSelectorId: string) =>
        set((state) => ({
          options: optionInMemory.deactivateOption(
            state.options,
            optionId,
            optionSelectorId
          ),
        })),
      activateOptionSelector: (optionSelectorId: string) =>
        set((state) => ({
          options: optionInMemory.activateOptionSelector(
            state.options,
            optionSelectorId
          ),
        })),
      deactivateOptionSelector: (optionSelectorId: string) =>
        set((state) => ({
          options: optionInMemory.deactivateOptionSelector(
            state.options,
            optionSelectorId
          ),
        })),
      selectRandomRole: () => {
        const options = get().options;
        return optionInMemory.selectRandomRole(options);
      },
      activateAll: () =>
        set((state) => ({
          options: optionInMemory.activateAll(state.options),
        })),
      deactivateAll: () =>
        set((state) => ({
          options: optionInMemory.deactivateAll(state.options),
        })),
    }),
    {
      name: "randomrole:options",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
