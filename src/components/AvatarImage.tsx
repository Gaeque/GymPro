import React from "react";
import { Avatar } from "react-native-paper";

import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";

interface AvatarImageProps {
  size?: number;
}

const defaultUserImage = require("../../src/assets/userPhotoDefault.png");

const AvatarImage: React.FC<AvatarImageProps> = ({ size }) => {
  const { user } = useAuth();

  return (
    <Avatar.Image
      size={size}
      source={
        user.avatar
          ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
          : defaultUserImage
      }
    />
  );
};

export default AvatarImage;
