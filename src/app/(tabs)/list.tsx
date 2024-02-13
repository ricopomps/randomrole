import Header from "@/components/header";
import Input from "@/components/input";
import Option from "@/components/option";
import OptionSelector from "@/components/option-selector";
import { useOptionsStore } from "@/stores/options-store";
import { useState } from "react";
import { Alert, SectionList, View } from "react-native";

export default function List() {
  const [input, setInput] = useState("");
  const { options, add, clear, addSelector } = useOptionsStore();

  function handleSubmit() {
    if (input.trim().length === 0) {
      return Alert.alert("Pedido", "Informe os dados da opção");
    }
    addSelector(input);
    setInput("");
  }

  return (
    <View className="flex-1 bg-[#072630] p-4">
      <Header title="Adicionar opção" handleSubmit={handleSubmit} />
      <Input
        placeholder="Digite a opção"
        onChangeText={setInput}
        value={input}
        blurOnSubmit
        onSubmitEditing={handleSubmit}
        returnKeyType="next"
        className="mb-3"
      />
      <SectionList
        sections={options}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({ item, section }) => (
          <Option option={item} optionSelectorId={section.id} />
        )}
        renderSectionHeader={({ section }) => (
          <OptionSelector optionSelector={section} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}
