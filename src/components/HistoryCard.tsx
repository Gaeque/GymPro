import React from "react";
import { StyleSheet, Text, View } from "react-native";
import theme from "../theme";
import { historyDTO } from "../dtos/HistoryDTO";

type Props = {
  data: historyDTO;
}

const HistoryCard = ({data}: Props) => {
  return (
    <View style={styles.styleContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.categoryText}>
          {data.group}
        </Text>
        <Text style={styles.exerciseText}>
          {data.name}
        </Text>
      </View>
      <Text style={styles.timeText}>
        {data.hour}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  styleContainer: {
    backgroundColor: theme.colors.gray600,
    paddingTop: 18,
    paddingBottom: 18,
    paddingHorizontal: 40,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 

  },
  textContainer: {
    flex: 1, 
  },
  categoryText: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.lg,
    textTransform: "capitalize",
    marginBottom: 5, 
    
  },
  exerciseText: {
    color: theme.colors.gray200,
    fontSize: theme.fontSizes.md,
    
  },
  timeText: {
    color: theme.colors.gray300,
    fontSize: theme.fontSizes.md,
  },
});

export default HistoryCard;
