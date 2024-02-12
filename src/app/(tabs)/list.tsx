import Header from "@/components/header";
import Input from "@/components/input";
import Option from "@/components/option";
import { useOptionsStore } from "@/stores/options-store";
import { useState } from "react";
import { Alert, SectionList, Text, View } from "react-native";

export default function List() {
  const [newOption, setNewOption] = useState("");
  const { options, add } = useOptionsStore();

  function handleSubmit() {
    if (newOption.trim().length === 0) {
      return Alert.alert("Pedido", "Informe os dados da opção");
    }
    add(newOption);
    setNewOption("");
  }

  return (
    <View className="flex-1 bg-[#072630] p-4">
      <Header title="Adicionar opção" handleSubmit={handleSubmit} />
      <Input
        placeholder="Digite a opção"
        onChangeText={setNewOption}
        value={newOption}
        blurOnSubmit
      />
      <SectionList
        sections={[{ data: options, title: "Opções" }]}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => <Option option={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-xl text-white font-heading mt-8 mb-3">
            {title}
          </Text>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}
