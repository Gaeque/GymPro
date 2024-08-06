import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../routes/app.routes";
import { api } from "../services/api";
import HomeHeader from "../components/HomeHeader";
import theme from "../theme";
import Group from "../components/Group";
import ExerciseCard from "../components/ExerciseCard";
import { AppError } from "../utils/AppError";
import { exerciseDTO } from "../dtos/exerciseDTO";
import Loading from "../components/Loading";

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);
  const [exercises, setExercises] = useState<exerciseDTO[]>([]);
  const [groupSelected, setGroupSelected] = useState("Peito");

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleOpenExerciseDetails(exerciseId: string) {
    navigation.navigate("exercise", {exerciseId});
  }

  async function fetchGroups() {
    try {
      const response = await api.get("/groups");
      setGroups(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os grupos musculares";
      console.log(title);
    }
  }

  async function fetchExercisesByGroup(groupName: string) {
    try {
      setIsLoading(true);
      const response = await api.get(`/exercises/bygroup/${groupName}`);
      setExercises(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os exercícios";
      console.log(title);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    fetchExercisesByGroup(groupSelected);
  }, [groupSelected]);

  useFocusEffect(
    React.useCallback(() => {
      fetchExercisesByGroup(groupSelected);
    }, [groupSelected])
  );

  return (
    <View>
      <View style={styles.styleHeader}>
        <HomeHeader />
      </View>
      <FlatList
        style={{ height: 64 }}
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => (
          <Group
            key={item}
            name={item}
            isActive={groupSelected === item}
            onPress={() => setGroupSelected(item)}
            isFirst={index === 0}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
{
        isLoading ? <Loading /> :

      <View style={styles.containerExercicios}>
        <View style={styles.styleListExercicios}>
          <Text style={styles.textTitle}>Exercícios</Text>
          <Text style={styles.textCount}>{exercises.length}</Text>
        </View>
        <FlatList
          data={exercises}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ExerciseCard 
              onPress={() => handleOpenExerciseDetails(item.id)}
              data={item}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  styleHeader: {
    backgroundColor: theme.colors.gray600,
    paddingTop: 48,
    paddingBottom: 16,
    paddingLeft: 20,
  },
  containerExercicios: {
    padding: 28,
    height: 680,
    overflow: "scroll"
  },
  styleListExercicios: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  textTitle: {
    color: theme.colors.gray200,
    fontSize: theme.fontSizes.md,
    fontFamily: theme.fonts.regular.body,
  },
  textCount: {
    color: theme.colors.gray200,
    fontSize: theme.fontSizes.sm,
  },
});
