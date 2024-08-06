import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../routes/app.routes";
import { api } from "../services/api";
import theme from "../theme";
import Center from "../components/Center";
import BodySvg from "../assets/body.svg";
import SeriesSvg from "../assets/series.svg";
import RepeticoesSvg from "../assets/repetitions.svg";
import Button from "../components/Button";
import { Snackbar } from "react-native-paper";
import { exerciseDTO } from "../dtos/exerciseDTO";
import { AppError } from "../utils/AppError";
import Loading from "../components/Loading";

type RouteParamsProps = {
  exerciseId: string;
};

export function Exercise() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const [exercise, setExercises] = useState<exerciseDTO>({} as exerciseDTO);
  const [isLoading, setIsLoading] = useState(true);
  const [sendingRegister, setSendingRegister] = useState(false);

  const [snackbarVisibleOk, setSnackbarVisibleOk] = useState(false);
  const [snackbarMessageOk, setSnackbarMessageOk] = useState<string>("");

  const [snackbarVisibleError, setSnackbarVisibleError] = useState(false);
  const [snackbarMessageError, setSnackbarMessageError] = useState("");

  const route = useRoute();
  const { exerciseId } = route.params as RouteParamsProps;

  function handleGoBack() {
    navigation.goBack();
  }

  async function fetchExerciseDetails() {
    try {
      setIsLoading(true);
      const response = await api.get(`/exercises/${exerciseId}`);
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

  async function handleExerciseHistoryRegister() {
    try {
      setSendingRegister(true);
      await api.post("/history", { exercise_id: exerciseId });
      setSnackbarMessageOk("Exercício realizado!!");
      setSnackbarVisibleOk(true);
      setTimeout(() => {
        setSnackbarVisibleOk(false);
        navigation.navigate("history");
      },); 
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível registrar exercício.";
      setSnackbarMessageError(title);
      setSnackbarVisibleError(true);
    } finally {
      setSendingRegister(false);
    }
  }

  useEffect(() => {
    fetchExerciseDetails();
  }, [exerciseId]);

  return (
    <View>
      <View
        style={{
          paddingTop: 40,
          padding: 24,
          backgroundColor: theme.colors.gray500,
        }}
      >
        <TouchableOpacity onPress={handleGoBack}>
          <Feather name="arrow-left" color={theme.colors.cyano} size={28} />
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            paddingHorizontal: 4,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: theme.colors.white,
              fontFamily: theme.fonts.regular.body,
              fontSize: theme.fontSizes.md,
              flex: 1,
            }}
          >
            {exercise.name}
          </Text>
          <BodySvg style={{ marginRight: 10 }} />
          <Text
            style={{
              color: theme.colors.gray200,
              fontSize: theme.fontSizes.md,
            }}
          >
            {exercise.group}
          </Text>
        </View>
      </View>

      <View>
        {isLoading ? (
          <Loading />
        ) : (
          <Center style={{ marginTop: 20 }}>
            <Image
              source={{
                uri: `${api.defaults.baseURL}/exercise/demo/${exercise?.demo}`,
              }}
              style={{
                width: 340,
                height: 340,
                borderRadius: 20,
                marginBottom: 20,
              }}
            />
            <View style={{ width: "100%", alignItems: "center" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  gap: 14,
                  alignItems: "center",
                }}
              >
                <SeriesSvg />
                <Text style={{ color: theme.colors.white }}>
                  {exercise.series} Séries
                </Text>
                <RepeticoesSvg />
                <Text style={{ color: theme.colors.white }}>
                  {exercise.repetitions} Repetições
                </Text>
              </View>

              <Button
                title="Marcar como realizado"
                isLoading={sendingRegister}
                onPress={handleExerciseHistoryRegister}
              />
            </View>
          </Center>
        )}
      </View>

      <Snackbar
        visible={snackbarVisibleOk}
        onDismiss={() => setSnackbarVisibleOk(false)}
        duration={3000}
      >
        {snackbarMessageOk}
      </Snackbar>

      <Snackbar
        visible={snackbarVisibleError}
        onDismiss={() => setSnackbarVisibleError(false)}
        duration={3000}
        style={{ backgroundColor: theme.colors.gray400, marginBottom: 40 }}
        wrapperStyle={{ alignItems: "center" }}
      >
        <Text
          style={{
            color: theme.colors.white,
            fontSize: theme.fontSizes.md,
            textAlign: "center",
          }}
        >
          {snackbarMessageError}
        </Text>
      </Snackbar>
    </View>
  );
}

const style = StyleSheet.create({
  styleContainer: {
    backgroundColor: theme.colors.gray500,
    paddingHorizontal: 80,
    paddingVertical: 20,
  },
  styleGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  styleText: {
    color: theme.colors.white,
  },
  styleButton: {
    width: 400,
    justifyContent: "center",
    alignItems: "center",
  },
});
