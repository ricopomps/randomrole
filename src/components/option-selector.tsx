import { OptionSelectorProp, useOptionsStore } from "@/stores/options-store";
import { cn } from "@/utils/functions/cs";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";
import InputModal from "./input-modal";

interface OptionSelectorComponentProp {
  optionSelector: OptionSelectorProp;
}

export default function OptionSelector({
  optionSelector: { title, id, active },
}: OptionSelectorComponentProp) {
  const [openAddModal, setOpenModal] = useState(false);
  const {
    add,
    removeSelector,
    activateOptionSelector,
    deactivateOptionSelector,
  } = useOptionsStore();

  const handleAddClick = () => {
    setOpenModal(true);
  };

  const handleModalAccept = (input: string) => {
    add(input, id);
    setOpenModal(false);
  };

  const handleDeleteCliick = () => {
    Alert.alert(
      "Remover",
      `Deseja remover o seletor '${title}' e todas suas opções?`,
      [
        { text: "Cancelar" },
        { text: "Remover", onPress: () => removeSelector(id) },
      ]
    );
  };

  const handleActivate = () => {
    if (active) {
      deactivateOptionSelector(id);
    } else {
      activateOptionSelector(id);
    }
  };

  return (
    <View
      className={cn(
        "flex-row items-center justify-between border-b border-slate-700 mb-3 px-2 rounded-md",
        !active && "bg-slate-700"
      )}
    >
      <Text className="text-xl text-white font-heading mt-8 mb-3">{title}</Text>
      <View className="flex-row items-center justify-between gap-4">
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
          onPress={handleAddClick}
        >
          <Feather name="plus-circle" color={colors.white} size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          className="relative"
          activeOpacity={0.7}
          onPress={handleDeleteCliick}
        >
          <Feather name="minus-circle" color={colors.white} size={24} />
        </TouchableOpacity>
        <InputModal
          open={openAddModal}
          title="Adicionar opção"
          onClose={() => setOpenModal(false)}
          onAccept={handleModalAccept}
        />
      </View>
    </View>
  );
}
