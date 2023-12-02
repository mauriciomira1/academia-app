import { useCallback, useState } from "react";

import { useFocusEffect } from "@react-navigation/native";

import { Heading, VStack, SectionList, Text, useToast } from "native-base";

import { AppError } from "@utils/AppError";
import { api } from "@services/api";

import { HistoryByDayDTO } from "@dtos/HistoryByDayDTO";

import HistoryCard from "@components/HistoryCard";
import ScreenHeader from "@components/ScreenHeader";

const History = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([]);

  const toast = useToast();

  const fetchHistory = async () => {
    try {
      const response = await api.get("/history");

      setExercises(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível carregar o histórico.";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [])
  );

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      <SectionList
        sections={exercises}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <HistoryCard data={item} />}
        renderSectionHeader={({ section }) => (
          <Heading
            color="gray.100"
            fontFamily="heading"
            fontSize="md"
            mt={10}
            mb={3}
          >
            {section.title}
          </Heading>
        )}
        px={6}
        contentContainerStyle={
          exercises.length === 0 && { flex: 1, justifyContent: "center" }
        }
        ListEmptyComponent={() => (
          <Text color="white" fontSize="sm" textAlign="center">
            Não há exercícios registrados ainda. {"\n"}Vamos fazer exercícios
            hoje?
          </Text>
        )}
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  );
};

export default History;
