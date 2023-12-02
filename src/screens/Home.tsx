import { useCallback, useEffect, useState } from "react";

import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { VStack, HStack, FlatList, Text, Heading, useToast } from "native-base";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { api } from "@services/api";
import { ExerciseDTO } from "@dtos/ExerciseDTO";

import { AppError } from "@utils/AppError";

import Group from "@components/Group";
import HomeHeader from "@components/HomeHeader";
import ExerciseCard from "@components/ExerciseCard";
import { Loading } from "@components/Loading";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [groups, setGrops] = useState<string[]>([]);
  const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
  const [groupSelected, setGroupSelected] = useState("antebraço");

  const toast = useToast();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const handleOpenExerciseDetails = (exerciseId: string) => {
    navigation.navigate("exercise", { exerciseId });
  };

  const fetchGroups = async () => {
    try {
      const response = await api.get("/groups");
      setGrops(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível carregar os grupos musculares.";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  };

  const fetchExercisesByGroup = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/exercises/bygroup/${groupSelected}`);
      setExercises(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível carregar os exercícios.";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchExercisesByGroup();
    }, [groupSelected])
  );

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            onPress={() => setGroupSelected(item)}
            name={item}
            isActive={
              groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()
            }
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        minH={10}
        maxH={10}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <VStack px={8} flex={1}>
          <HStack justifyContent="space-between" mb={5}>
            <Heading color="gray.200" fontSize="md" fontFamily="heading">
              Exercícios
            </Heading>
            <Text color="gray.200" fontSize="sm">
              {exercises.length}
            </Text>
          </HStack>

          <FlatList
            data={exercises}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ExerciseCard
                data={item}
                onPress={() => handleOpenExerciseDetails(item.id)}
              />
            )}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{ paddingBottom: 20 }}
          />
        </VStack>
      )}
    </VStack>
  );
};

export default Home;
