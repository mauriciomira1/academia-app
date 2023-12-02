import { TouchableOpacity } from "react-native";

import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import {
  HStack,
  Heading,
  Icon,
  VStack,
  Text,
  Image,
  Box,
  ScrollView,
  useToast,
} from "native-base";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { Feather } from "@expo/vector-icons";

import { api } from "@services/api";

import BodySvg from "@assets/body.svg";
import SeriesSvg from "@assets/series.svg";
import RepetitionsSvg from "@assets/repetitions.svg";

import { AppError } from "@utils/AppError";

import Button from "@components/Button";
import { useCallback, useEffect, useState } from "react";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { Loading } from "@components/Loading";

type RoutesParamsProps = {
  exerciseId: string;
};

const Exercise = () => {
  const [exercise, setExercise] = useState<ExerciseDTO>();
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const toast = useToast();

  const route = useRoute();

  const { exerciseId } = route.params as RoutesParamsProps;

  const handleGoBack = () => {
    navigation.goBack();
  };

  const fetchExerciseDetails = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/exercises/${exerciseId}`);
      setExercise(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível carregar os detalhes do exercício.";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  };

  /*   useEffect(() => {
    fetchExerciseDetails();
  }),
    [exerciseId]; */

  useFocusEffect(
    useCallback(() => {
      fetchExerciseDetails();
    }, [exerciseId])
  );

  return (
    <VStack flex={1}>
      <VStack px={8} bg="gray.600" pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
        </TouchableOpacity>

        <HStack
          justifyContent="space-between"
          mt={4}
          mb={8}
          alignItems="center"
        >
          <Heading
            color="gray.100"
            fontSize="lg"
            fontFamily="heading"
            flexShrink={1}
          >
            {exercise?.name}
          </Heading>

          <HStack>
            <BodySvg />
            <Text color="gray.200" ml={1} textTransform="capitalize">
              {exercise?.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView>
          <VStack p={8}>
            <Box rounded="lg" mb={3} overflow="hidden">
              <Image
                w="full"
                h={80}
                source={{
                  uri: `${api.defaults.baseURL}/exercise/demo/${exercise?.demo}`,
                }}
                alt="Nome do exercício"
                resizeMode="cover"
              />
            </Box>
            {
              <Box bg="gray.600" p={4} rounded="lg">
                <HStack justifyContent="space-around" mb={5} mt={1}>
                  <HStack>
                    <SeriesSvg />
                    <Text color="gray.200" ml={2}>
                      {exercise?.series} séries
                    </Text>
                  </HStack>

                  <HStack>
                    <RepetitionsSvg />
                    <Text color="gray.200" ml={2}>
                      {exercise?.repetitions} repetições
                    </Text>
                  </HStack>
                </HStack>

                <Button title="Marcar como realizado" />
              </Box>
            }
          </VStack>
        </ScrollView>
      )}
    </VStack>
  );
};

export default Exercise;
