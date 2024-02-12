import { Slot } from "expo-router";
import { SafeAreaView } from "react-native";

import Loading from "@/components/loading";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <SafeAreaView className="flex-1 bg-[#072630] ">
      <Slot />
    </SafeAreaView>
  );
}
