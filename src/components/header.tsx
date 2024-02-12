import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";

interface HeaderProps {
  title: string;
  handleSubmit: () => void;
  cartQuantityItems?: number;
}

export default function Header({
  title,
  handleSubmit,
  cartQuantityItems = 0,
}: HeaderProps) {
  return (
    <View className="flex-row items-center justify-between border-b border-slate-700 pb-5 mx-5">
      <Text className="text-white text-xl font-heading mt-2">{title}</Text>

      <TouchableOpacity
        className="relative"
        activeOpacity={0.7}
        onPress={handleSubmit}
      >
        <Feather name="plus-circle" color={colors.white} size={24} />
      </TouchableOpacity>
    </View>
  );
}
