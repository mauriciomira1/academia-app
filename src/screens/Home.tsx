import { useState } from "react";

import { VStack, HStack, FlatList, Text, Heading } from "native-base";

import Group from "@components/Group";
import HomeHeader from "@components/HomeHeader";
import ExerciseCard from "@components/ExerciseCard";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

const Home = () => {
  const [groups, setGrops] = useState(["Costas", "Bíceps", "Tríceps", "Ombro"]);
  const [exercises, setExercises] = useState([
    "Puxada frontal",
    "Remada curvada",
    "Remada unilateral",
    "Levantamento terra",
  ]);
  const [groupSelected, setGroupSelected] = useState("costas");

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const handleOpenExerciseDetails = () => {
    navigation.navigate("exercise");
  };

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
      <VStack px={8} flex={1}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md">
            Exercícios
          </Heading>
          <Text color="gray.200" fontSize="sm">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <ExerciseCard onPress={handleOpenExerciseDetails} />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  );
};

export default Home;
