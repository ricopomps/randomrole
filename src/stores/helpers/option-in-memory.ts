import uuid from "react-native-uuid";
import { OptionProp, OptionSelectorProp } from "../options-store";

export function add(
  options: OptionSelectorProp[],
  newOptionText: string,
  optionSelectorId: string
) {
  const optionSelector = options.find(
    (optionSelector) => optionSelector.id === optionSelectorId
  );
  if (!optionSelector) throw new Error("Option selector id invalid");

  const newOption: OptionProp = {
    active: true,
    text: newOptionText,
    id: uuid.v4().toString(),
  };

  optionSelector.data = [...optionSelector.data, newOption];
  return options;
}

export function remove(
  options: OptionSelectorProp[],
  optionToRemoveId: string,
  optionSelectorId: string
) {
  const optionSelector = options.find(
    (optionSelector) => optionSelector.id === optionSelectorId
  );
  if (!optionSelector) throw new Error("Option selector id invalid");

  optionSelector.data = optionSelector.data.filter(
    (option) => option.id !== optionToRemoveId
  );

  return options;
}

export function addSelector(options: OptionSelectorProp[], title: string) {
  const newOptionSelector: OptionSelectorProp = {
    id: uuid.v4().toString(),
    title,
    active: true,
    data: [],
  };

  return [...options, newOptionSelector];
}

export function removeSelector(
  options: OptionSelectorProp[],
  optionSelectorToRemoveId: string
) {
  return options.filter(
    (optionSelector) => optionSelector.id !== optionSelectorToRemoveId
  );
}

export function clear() {
  return [];
}
