import { HStack, VStack, Text, Heading, Icon } from "native-base";
import UserPhoto from "./UserPhoto";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const HomeHeader = () => {
  return (
    <HStack
      bg="gray.600"
      paddingTop={16}
      paddingBottom={5}
      px={8}
      alignItems="center"
    >
      <UserPhoto
        source={{ uri: "https://github.com/mauriciomira1.png" }}
        size={16}
        alt="Imagem do usuário"
        mr={4}
      />
      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>
        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          Maurício
        </Heading>
      </VStack>
      <TouchableOpacity>
        <Icon as={MaterialIcons} name="logout" color="gray.200" size={7} />
      </TouchableOpacity>
    </HStack>
  );
};

export default HomeHeader;
