import { OptionProp, useOptionsStore } from "@/stores/options-store";
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
  const { remove } = useOptionsStore();

  function handleRemove() {
    Alert.alert("Remover", `Deseja remover a opção '${text}'?`, [
      { text: "Cancelar" },
      { text: "Remover", onPress: () => remove(id, optionSelectorId) },
    ]);
  }

  return (
    <View className="flex-row justify-between items-center mb-3">
      <Text className="text-white">{text}</Text>
      <TouchableOpacity
        className="relative"
        activeOpacity={0.7}
        onPress={handleRemove}
      >
        <Feather name="minus-circle" color={colors.white} size={24} />
      </TouchableOpacity>
    </View>
  );
}
