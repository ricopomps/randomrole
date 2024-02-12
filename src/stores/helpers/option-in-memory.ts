import { OptionProp } from "../options-store";

export function add(options: OptionProp[], newOption: OptionProp) {
  return [...options, newOption];
}

export function remove(options: OptionProp[], productToRemoveId: string) {
  return options.filter((option) => option.id !== productToRemoveId);
}
