import { Redirect, useNavigation } from "expo-router";

export default function Home() {
  const navigation = useNavigation();

  return <Redirect href="/home" />;
}
