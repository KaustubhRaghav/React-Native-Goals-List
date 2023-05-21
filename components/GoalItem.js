import { View, Text, StyleSheet, Pressable, Platform } from "react-native";

const GoalItem = ({
  data,
  sno,
  handleEditGoal,
  handleDeleteGoal,
  markGoalAsComplete,
}) => {
  return (
    <View style={styles.goalItem}>
      <Pressable
        android_ripple={{ color: "lightgray", borderless: true }}
        onPress={() => markGoalAsComplete(data.id)}
        style={({ pressed }) =>
          pressed && Platform.OS === "ios" && styles.pressedItem
        }
      >
        <View style={styles.goalContent}>
          <Text
            style={[
              styles.goalText,
              {
                textDecorationLine: data.isCompleted ? "line-through" : "none",
              },
            ]}
          >
            {sno}. {data.text}
          </Text>
          <View style={styles.buttonContainer}>
            <Pressable
              style={[
                styles.editButton,
                data.isCompleted && styles.disabledButton,
              ]}
              onPress={() => handleEditGoal(data.id)}
              disabled={data.isCompleted}
            >
              <Text style={styles.buttonText}>Edit</Text>
            </Pressable>
            <Pressable
              style={[
                styles.deleteButton,
                data.isCompleted && styles.disabledButton,
              ]}
              onPress={() => handleDeleteGoal(data.id)}
              disabled={data.isCompleted}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  goalContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  goalText: {
    color: "black",
    padding: 8,
    flex: 1,
    flexWrap: "wrap",
  },
  pressedItem: {
    opacity: 0.5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  editButton: {
    backgroundColor: "forestgreen",
    borderRadius: 6,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: "red",
    borderRadius: 6,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "gray",
  },
});

export default GoalItem;
