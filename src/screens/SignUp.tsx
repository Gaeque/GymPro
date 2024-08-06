import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { Snackbar, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { useForm, Controller, set } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import axios from "axios";
import { api } from "../services/api";

import { AppError } from "../utils/AppError";

import { AuthNavigatorRoutesProps } from "../routes/auth.routes";

import theme from "../theme";
import LogoSvg from "../assets/logo.svg";

import Input from "../components/Input";
import Center from "../components/Center";
import Button from "../components/Button";
import SecondaryButton from "../components/SecondaryButton";
import { useAuth } from "../hooks/useAuth";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

const signUpSchema = yup.object({
  name: yup.string().required("Informe o nome."),
  email: yup.string().required("Informe o e-mail.").email("E-mail inválido."),
  password: yup
    .string()
    .required("Informe a senha.")
    .min(6, "A senha deve ter pelo menos seis dígitos."),
  password_confirm: yup
    .string()
    .required("Confirme a senha")
    .oneOf([yup.ref("password"), ""], "A confirmação da senha não confere."),
});

export function SignUp() {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { signIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  function handleLogin() {
    navigation.navigate("signIn");
  }

  async function handleSignUp({ name, email, password }: FormDataProps) {
    try {
      setIsLoading(true);
      await api.post("/users", { name, email, password });
      await signIn(email, password);
    } catch (error) {
      setIsLoading(false);
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível criar a conta, tente novamente.";
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

        <Center style={{ marginTop: 30 }}>
          <Text
            variant="headlineSmall"
            style={{
              color: theme.colors.gray100,
              fontWeight: "bold",
              marginBottom: 20,
            }}
          >
            Crie sua conta
          </Text>
          <Controller
            control={control}
            name="name"
            rules={{
              required: "Informe o nome.",
            }}
            render={({ field: { onChange, value } }) => (
              <Input placeholder="Nome" onChangeText={onChange} value={value} />
            )}
          />

          <Text style={{ color: theme.colors.gray300, marginTop: -10 }}>
            {errors.name?.message}
          </Text>

          <Controller
            control={control}
            name="email"
            rules={{
              required: "Informe o email.",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "E-mail inválido",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
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
              required: "Sua senha deve ter pelo menos 6 digitos.",
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Text style={{ color: theme.colors.gray300, marginTop: -10 }}>
            {errors.password?.message}
          </Text>

          <Controller
            control={control}
            name="password_confirm"
            rules={{
              required: "Sua senha não estão iguais",
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirmar a Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
              />
            )}
          />

          <Text style={{ color: theme.colors.gray300, marginTop: -10 }}>
            {errors.password_confirm?.message}
          </Text>

          <Button
            title="Criar e Acessar"
            onPress={handleSubmit(handleSignUp)}
            isLoading={isLoading}
          />
        </Center>

        <Center style={{ paddingBottom: 14 }}>
          <SecondaryButton title="Voltar para o login" onPress={handleLogin} />
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
    marginTop: 80,
    alignItems: "center",
  },
});
