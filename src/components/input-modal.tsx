import { useState } from "react";
import { Alert, Modal, Pressable, Text, View } from "react-native";
import Input from "./input";

interface InputModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onAccept: (input: string) => void;
}

export default function InputModal({
  open,
  title,
  onClose,
  onAccept,
}: InputModalProps) {
  const [input, setInput] = useState("");
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        onClose();
      }}
    >
      <View className="flex-1 justify-center items-center p-8">
        <View className="bg-[#072630] rounded-lg px-3 py-4 shadow-lg border border-slate-700 w-full gap-3">
          <Text className="mb-4 text-center text-white">{title}</Text>
          <Input
            placeholder="Digite a opção"
            onChangeText={setInput}
            blurOnSubmit
            onSubmitEditing={() => onAccept(input)}
            returnKeyType="next"
          />
          <Pressable
            className="bg-blue-500 rounded-full p-3"
            onPress={() => onAccept(input)}
          >
            <Text className="text-white font-bold text-center">Adicionar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
