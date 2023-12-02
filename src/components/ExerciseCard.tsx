import { HStack, Heading, Image, Text, VStack, Icon } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import { api } from "@services/api";

import { ExerciseDTO } from "@dtos/ExerciseDTO";

import { Entypo } from "@expo/vector-icons";

type Props = TouchableOpacityProps & {
  data: ExerciseDTO;
};

const ExerciseCard = ({ data, ...rest }: Props) => {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        alignItems="center"
        bg="gray.500"
        p={2}
        pr={4}
        rounded="md"
        mb={3}
      >
        <Image
          source={{
            uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}`,
          }}
          alt={data.name}
          w={16}
          h={16}
          rounded="md"
          mr={4}
          resizeMode="cover"
        />
        <VStack flex={1}>
          <Heading color="white" fontSize="lg" fontFamily="heading">
            {data.name}
          </Heading>
          <Text color="gray.200" fontSize="sm" mt={1} numberOfLines={2}>
            {data.series} séries x {data.repetitions} repetições
          </Text>
        </VStack>
        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
      </HStack>
    </TouchableOpacity>
  );
};

export default ExerciseCard;
