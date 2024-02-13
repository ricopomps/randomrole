import { Alert } from "react-native";
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

export function activateOption(
  options: OptionSelectorProp[],
  optionId: string,
  optionSelectorId: string
) {
  const optionSelector = options.find(
    (optionSelector) => optionSelector.id === optionSelectorId
  );
  if (!optionSelector) throw new Error("Option selector id invalid");

  const option = optionSelector.data.find((option) => option.id === optionId);
  if (!option) throw new Error("Option id invalid");

  option.active = true;

  if (!optionSelector.active) optionSelector.active = true;

  return options;
}

export function deactivateOption(
  options: OptionSelectorProp[],
  optionId: string,
  optionSelectorId: string
) {
  const optionSelector = options.find(
    (optionSelector) => optionSelector.id === optionSelectorId
  );
  if (!optionSelector) throw new Error("Option selector id invalid");

  const option = optionSelector.data.find((option) => option.id === optionId);
  if (!option) throw new Error("Option id invalid");

  option.active = false;

  if (optionSelector.data.every((option) => !option.active))
    optionSelector.active = false;

  return options;
}

export function activateOptionSelector(
  options: OptionSelectorProp[],
  optionSelectorId: string
) {
  const optionSelector = options.find(
    (optionSelector) => optionSelector.id === optionSelectorId
  );
  if (!optionSelector) throw new Error("Option selector id invalid");

  optionSelector.active = true;

  optionSelector.data.forEach((option) =>
    activateOption(options, option.id, optionSelectorId)
  );

  return options;
}

export function deactivateOptionSelector(
  options: OptionSelectorProp[],
  optionSelectorId: string
) {
  const optionSelector = options.find(
    (optionSelector) => optionSelector.id === optionSelectorId
  );
  if (!optionSelector) throw new Error("Option selector id invalid");

  optionSelector.active = false;

  optionSelector.data.forEach((option) =>
    deactivateOption(options, option.id, optionSelectorId)
  );

  return options;
}

export function selectRandomRole(options: OptionSelectorProp[]) {
  const availableOptionSelector = options.filter(
    (optionsSelector) => optionsSelector.active
  );

  if (availableOptionSelector.length === 0) {
    return Alert.alert(
      "Opções",
      "Adicione ou ative ao menos uma opção primeiro"
    );
  }

  const availableOptions = availableOptionSelector.flatMap(
    (option) => option.data
  );
  const activeOptions = availableOptions.filter((option) => option.active);

  if (activeOptions.length === 0) {
    return Alert.alert("Opções", "Ative ao menos uma opção primeiro");
  }

  const randomIndex = Math.floor(Math.random() * activeOptions.length);
  const selectedOption = activeOptions[randomIndex];

  return selectedOption;
}
