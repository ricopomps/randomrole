import { useOptionsStore } from "@/stores/options-store";
import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";

interface HeaderProps {
  title: string;
  handleSubmit: () => void;
}

export default function Header({ title, handleSubmit }: HeaderProps) {
  const { activateAll, deactivateAll } = useOptionsStore();
  return (
    <View className="flex-row items-center justify-between border-b border-slate-700 pb-5 mx-5">
      <Text className="text-white text-xl font-heading mt-2">{title}</Text>

      <View className="flex-row justify-between items-center gap-3">
        <TouchableOpacity
          className="relative"
          activeOpacity={0.7}
          onPress={activateAll}
        >
          <Feather name="eye" color={colors.white} size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          className="relative"
          activeOpacity={0.7}
          onPress={deactivateAll}
        >
          <Feather name="eye-off" color={colors.white} size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          className="relative"
          activeOpacity={0.7}
          onPress={handleSubmit}
        >
          <Feather name="plus-circle" color={colors.white} size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
