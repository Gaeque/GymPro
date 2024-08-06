import React from "react";
import {
  Image,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  StyleSheet,
  Text
} from "react-native";

import { Entypo } from "@expo/vector-icons"
import theme from "../theme";
import { exerciseDTO } from "../dtos/exerciseDTO";
import { api } from "../services/api";
import { historyDTO } from "../dtos/HistoryDTO";

type Props = TouchableOpacityProps & {
  data: exerciseDTO;
};


const ExerciseCard = ({ data, ...rest }: Props) => {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <View style={styles.content}>
        <Image
          source={{ uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}` }}
          style={styles.styleImage}
        />
        <View style={styles.textContainer}>
          <Text style={styles.styleText}>{data.name}</Text>
          <Text style={styles.subText}>{data.repetitions} repetições</Text>
        </View>
        <View style={styles.iconContainer}>
          <Entypo name="chevron-thin-right" color={"#7C7C8A"} size={24} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.gray500,
    borderRadius: 8,
    marginBottom: 10,
    
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    
  },
  styleImage: {
    width: 90,
    height: 90,
    marginRight: 12,
    resizeMode: "contain",
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  styleText: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.lg,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subText: {
    color: theme.colors.gray300,
  },
  iconContainer: {
    paddingRight: 12,
  },
});

export default ExerciseCard;
