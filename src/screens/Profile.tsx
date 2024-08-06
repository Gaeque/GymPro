import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";

import { Snackbar } from "react-native-paper";

import { yupResolver } from "@hookform/resolvers/yup";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as yup from "yup";

import Input from "../components/Input";
import Center from "../components/Center";
import theme from "../theme";
import Button from "../components/Button";
import ImageUser from "../assets/Gaeque.png";
import { useAuth } from "../hooks/useAuth";
import { useForm, Controller } from "react-hook-form";
import { AppError } from "../utils/AppError";
import { api } from "../services/api";

type FormDataProps = {
  name: string;
  email?: string;
  password?: string | null;
  old_password?: string | null;
  confirm_password?: string | null;
};

const profileSchema = yup.object({
  name: yup.string().required("Informe o nome"),
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 dígitos.")
    .nullable()
    .transform((value) => (!!value ? value : null)),
  confirm_password: yup
    .string()
    .nullable()
    .transform((value) => (!!value ? value : null))
    .oneOf([yup.ref("password"), null], "A confirmação de senha não confere.")
    .when("password", {
      is: (Field: any) => Field,
      then: (schema) =>
        schema
          .nullable()
          .nullable()
          .required("Informe a confirmação da senha")
          .transform((value) => (!!value ? value : null)),
    }),
});

export function Profile() {
  const defaultUserImage = require("../../src/assets/userPhotoDefault.png");

  const [isUpdating, setIsUpdating] = useState(false);
  const [userPhoto, setUserPhoto] = useState(ImageUser);
  const [photoIsLoading, setPhotoIsLoading] = useState(false);

  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const [snackbarVisibleOk, setSnackbarVisibleOk] = useState(false);
  const [snackbarMessageOk, setSnackbarMessageOk] = useState<string>("");

  const [snackbarVisibleError, setSnackbarVisibleError] = useState(false);
  const [snackbarMessageError, setSnackbarMessageError] = useState("");

  const { user, updateUserProfile } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
    resolver: yupResolver(profileSchema),
  });

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true);

    const photoSelected = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (!photoSelected.canceled) {
      const photoInfo = await FileSystem.getInfoAsync(
        photoSelected.assets[0].uri
      );

      if (photoInfo.exists) {
        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 2) {
          setSnackbarVisible(true);
        } else {
          setUserPhoto({ uri: photoSelected.assets[0].uri });
        }
      }
    }

    const fileExtension = photoSelected.assets?.[0].uri.split(".").pop();

    const photoFile = {
      name: `${user.name}.${fileExtension}`.toLocaleLowerCase(),
      uri: photoSelected.assets?.[0].uri,
      type: `${photoSelected.assets?.[0].type}/${fileExtension}`,
    } as any;

    console.log(photoFile);

    const userPhotoUploadForm = new FormData();

    userPhotoUploadForm.append("avatar", photoFile);

    const avatarUpdtedResponse = await api.patch(
      "/users/avatar",
      userPhotoUploadForm,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const userUpdated = user;
    userUpdated.avatar = avatarUpdtedResponse.data.avatar;
    await updateUserProfile(userUpdated);
  }

  async function handleProfileUpdate(data: FormDataProps) {
    try {
      setIsUpdating(true);
      const userUpdated = user;
      userUpdated.name = data.name;
      await api.put("/users", data);
      await updateUserProfile(userUpdated);
      setSnackbarMessageOk("Perfil atualizado.");
      setSnackbarVisibleOk(true);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível atualizar os dados. Tente novamente mais tarde.";
      setSnackbarMessageError(title);
      setSnackbarVisibleError(true);
    } finally {
      setIsUpdating(false);
    }
  }

  const showSnackbar = () => setSnackbarVisible(false);

  return (
    <View>
      <ScrollView>
        <Center style={{ marginTop: 28 }}>
          <Image
            style={styles.styleImage}
            source={
              user.avatar
                ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
                : defaultUserImage
            }
          />
          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text
              style={{
                color: theme.colors.cyano,
                marginTop: 10,
                fontSize: theme.fontSizes.md,
              }}
            >
              Alterar Foto
            </Text>
          </TouchableOpacity>
        </Center>
        <Center style={{ marginTop: 40 }}>
          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <Input placeholder="Nome" onChangeText={onChange} value={value} />
            )}
          />

          <Text style={{ color: theme.colors.gray300, marginTop: -10 }}>
            {errors.name?.message}
          </Text>

          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <Input
                value={value}
                disabled={true}
                onChangeText={onChange}
                textColor={theme.colors.gray200}
              />
            )}
          />

          <Text style={{ color: theme.colors.gray300, marginTop: -10 }}>
            {errors.email?.message}
          </Text>

          <Text
            style={{
              color: theme.colors.cyano2,
              marginLeft: -230,
              marginBottom: 10,
              marginTop: 10,
            }}
          >
            Alterar Senha
          </Text>

          <Controller
            control={control}
            name="old_password"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Senha antiga"
                secureTextEntry
                value={value || ""}
                onChangeText={onChange}
              />
            )}
          />

          <Text style={{ color: theme.colors.gray300, marginTop: -10 }}>
            {errors.old_password?.message}
          </Text>

          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Nova Senha"
                secureTextEntry
                value={value || ""}
                onChangeText={onChange}
              />
            )}
          />

          <Text style={{ color: theme.colors.gray300, marginTop: -10 }}>
            {errors.password?.message}
          </Text>

          <Controller
            control={control}
            name="confirm_password"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Confirme a nova senha"
                secureTextEntry
                value={value || ""}
                onChangeText={onChange}
              />
            )}
          />

          <Text style={{ color: theme.colors.gray300, marginTop: -10 }}>
            {errors.confirm_password?.message}
          </Text>

          <View
            style={{ width: "100%", alignItems: "center", marginBottom: 20 }}
          >
            <Button
              title="Atualizar"
              onPress={handleSubmit(handleProfileUpdate)}
              isLoading={isUpdating}
            />
          </View>
        </Center>
      </ScrollView>

      <Snackbar
        visible={snackbarVisibleOk}
        onDismiss={() => setSnackbarVisibleOk(false)}
        duration={3000}
        style={{ backgroundColor: theme.colors.gray400, marginBottom: 40 }}
        wrapperStyle={{ alignItems: "center" }}
      >
        <Text
          style={{
            color: theme.colors.white,
            fontSize: theme.fontSizes.lg,
            textAlign: "center",
          }}
        >
          {" "}
          {snackbarMessageOk}
        </Text>
      </Snackbar>

      <Snackbar
        visible={snackbarVisibleError}
        onDismiss={() => setSnackbarVisibleError(false)}
        duration={2000}
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

      <Snackbar
        visible={snackbarVisible}
        onDismiss={showSnackbar}
        duration={5000}
        action={{
          label: "Fechar",
          onPress: () => {
            setSnackbarVisible(false);
          },
        }}
        style={{ backgroundColor: theme.colors.gray500 }}
      >
        <Text style={{ color: theme.colors.white }}>
          Esta imagem é muito grande. Escolha uma de até 5MB.
        </Text>
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  styleImage: {
    width: 130,
    height: 130,
    borderRadius: 100,
  },
});
