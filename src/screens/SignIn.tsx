import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { AuthNavigatorRoutesProps } from "../routes/auth.routes";

import { useAuth } from "../hooks/useAuth";

import { Snackbar, Text } from "react-native-paper";

import theme from "../theme";
import LogoSvg from "../assets/logo.svg";

import Input from "../components/Input";
import Center from "../components/Center";
import Button from "../components/Button";
import SecondaryButton from "../components/SecondaryButton";
import { AppError } from "../utils/AppError";

type FormData = {
  email: string;
  password: string;
};

export function SignIn() {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false)

  const { signIn } = useAuth();
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  function handleNewAccount() {
    navigation.navigate("signUp");
  }

  async function handleSignIn({ email, password }: FormData) {
    try {
      setIsLoading(true);
      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possícel entrar. Tente novamente mais tarde.";
      setIsLoading(false);
      setSnackbarMessage(title);
      setSnackbarVisible(true);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.heading}>
          <LogoSvg />
        </View>

        <Center>
          <Text
            variant="headlineSmall"
            style={{
              color: theme.colors.gray100,
              fontWeight: "bold",
              marginBottom: 20,
            }}
          >
            Acesse sua conta
          </Text>

          <Controller
            control={control}
            name="email"
            rules={{
              required: "Informe o e-mail",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "E-mail inválido",
              },
            }}
            render={({ field: { onChange } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
              />
            )}
          />
          <Text style={{ color: theme.colors.gray300, marginTop: -10 }}>
            {errors.email?.message}
          </Text>

          <Controller
            control={control}
            name="password"
            rules={{
              required: "Informe a senha",
              minLength: {
                value: 6,
                message: "A senha deve ter pelo menos 6 caracteres",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignIn)}
                returnKeyType="send"
              />
            )}
          />
          <Text style={{ color: theme.colors.gray300, marginTop: -10 }}>
            {errors.password?.message}
          </Text>

          <Button title="Acessar" onPress={handleSubmit(handleSignIn)} isLoading={isLoading} />
        </Center>

        <Center style={{ paddingBottom: 14 }}>
          <Text
            style={{
              color: theme.colors.white,
              marginBottom: 10,
              fontSize: theme.fontSizes.md,
              fontWeight: "100",
            }}
          >
            Ainda não tem acesso?
          </Text>
          <SecondaryButton title="Criar conta" onPress={handleNewAccount} />
        </Center>
      </ScrollView>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
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
          {" "}
          {snackbarMessage}{" "}
        </Text>
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray700,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "contain",
    position: "absolute",
  },
  heading: {
    marginTop: 100,
    alignItems: "center",
  },
});
