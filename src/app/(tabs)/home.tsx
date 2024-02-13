import { OptionProp, useOptionsStore } from "@/stores/options-store";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [timeoutRef, setTimoutRef] = useState<NodeJS.Timeout | null>(null);
  const [selectedRole, setSelectedRole] = useState<OptionProp | null>(null);
  const { options, selectRandomRole } = useOptionsStore();

  const startTimeout = () => {
    setLoading(true);
    setTimoutRef(
      setTimeout(() => {
        setLoading(false);
      }, 3000)
    );
  };

  const cancelLoading = () => {
    if (timeoutRef) clearTimeout(timeoutRef);
    setLoading(false);
  };

  const handleSelectRandomRole = () => {
    if (options.length === 0) {
      return Alert.alert("Opções", "Adicione ao menos uma opção primeiro");
    }
    startTimeout();
    const randomRole = selectRandomRole();
    setSelectedRole(randomRole ?? null);
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#072630]">
      {!loading && selectedRole && (
        <>
          <Text className="text-white text-3xl pt-8">Random Role:</Text>
          <Text className="text-white text-2xl">{selectedRole.text}</Text>
        </>
      )}
      <TouchableOpacity
        activeOpacity={loading ? 0.8 : 1}
        onPress={loading ? cancelLoading : handleSelectRandomRole}
        className="h-fit w-full z-10 flex-1 justify-center items-center rounded-lg"
      >
        <Image
          source={require("@/assets/logo.png")}
          className="h-[60%] w-full z-10 rounded-lg"
        />
        {loading && (
          <ActivityIndicator
            size={400}
            className="absolute h-full w-full top-0 left-0 right-0 bottom-0 flex items-center justify-center"
            color="#ffffff"
          />
        )}
      </TouchableOpacity>
    </View>
  );
}
