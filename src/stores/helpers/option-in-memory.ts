import uuid from "react-native-uuid";
import { OptionProp } from "../options-store";

export function add(options: OptionProp[], newOptionText: string) {
  const newOption: OptionProp = {
    active: true,
    text: newOptionText,
    id: uuid.v4().toString(),
  };
  return [...options, newOption];
}

export function remove(options: OptionProp[], productToRemoveId: string) {
  return options.filter((option) => option.id !== productToRemoveId);
}
