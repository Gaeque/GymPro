import React, { useCallback, useState } from "react";
import { SectionList, Text, View } from "react-native";
import theme from "../theme";
import ScreenHeader from "../components/ScreenHeader";
import HistoryCard from "../components/HistoryCard";
import { AppError } from "../utils/AppError";
import { api } from "../services/api";
import { useFocusEffect } from "@react-navigation/native";
import { HistoryByDayDTO } from "../dtos/historyByDayDTO";
import Loading from "../components/Loading";

export function History() {
  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([]);

  async function fetchHistory() {
    try {
      setIsLoading(true);
      const response = await api.get("/history");
      setExercises(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os detalhes do exercício";
      console.log(title);
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader title="Histórico de Exercícios" />

      {isLoading ? (
        <Loading />
      ) : (
        <SectionList
          sections={exercises}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HistoryCard data={item} />}
          renderSectionHeader={({ section }) => (
            <View>
              <Text
                style={{
                  color: theme.colors.gray200,
                  fontSize: theme.fontSizes.md,
                  marginTop: 10,
                  marginBottom: 9,
                  marginLeft: 28,
                }}
              >
                {section.title}
              </Text>
            </View>
          )}
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: theme.colors.gray100,
                  textAlign: "center",
                  fontSize: theme.fontSizes.md,
                }}
              >
                Não há exercícios registrados ainda. {"\n"}
                Vamos fazer exercícios hoje?
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
