import { OptionProp, useOptionsStore } from "@/stores/options-store";
import { cn } from "@/utils/functions/cs";
import { Feather } from "@expo/vector-icons";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";

interface OptionComponentProp {
  option: OptionProp;
  optionSelectorId: string;
}

export default function Option({
  option: { text, active, id },
  optionSelectorId,
}: OptionComponentProp) {
  const { remove, activateOption, deactivateOption } = useOptionsStore();

  const handleRemove = () => {
    Alert.alert("Remover", `Deseja remover a opção '${text}'?`, [
      { text: "Cancelar" },
      { text: "Remover", onPress: () => remove(id, optionSelectorId) },
    ]);
  };

  const handleActivate = () => {
    if (active) {
      deactivateOption(id, optionSelectorId);
    } else {
      activateOption(id, optionSelectorId);
    }
  };

  return (
    <View
      className={cn(
        "flex-row rounded-md px-4 py-1.5 justify-between items-center mb-3",
        !active && "bg-slate-700"
      )}
    >
      <Text className="text-white">{text}</Text>
      <View className="flex-row justify-between items-center gap-3">
        <TouchableOpacity
          className="relative"
          activeOpacity={0.7}
          onPress={handleActivate}
        >
          <Feather
            name={active ? "eye" : "eye-off"}
            color={colors.white}
            size={24}
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="relative"
          activeOpacity={0.7}
          onPress={handleRemove}
        >
          <Feather name="minus-circle" color={colors.white} size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
