import { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Keyboard,
  Text,
  Button,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [goals, setGoals] = useState([]);
  const [currGoal, setCurrGoal] = useState("");
  const [editCurrGoalId, setEditCurrGoalId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const goalInputHandler = (inputTxt) => {
    setCurrGoal(inputTxt);
  };

  const addGoalHandler = () => {
    setGoals((prevState) => {
      if (editCurrGoalId) {
        return prevState.map((goal) => {
          if (goal.id === editCurrGoalId) {
            return { ...goal, text: currGoal };
          } else return goal;
        });
      } else {
        return [
          ...prevState,
          { id: Math.random(), text: currGoal, isCompleted: false },
        ];
      }
    });
    setCurrGoal("");
    setEditCurrGoalId(null);
    Keyboard.dismiss();
    setIsModalOpen(false);
  };

  const editGoalHandler = (goalId) => {
    let goalToBeEdited = goals.find((goal) => goal.id === goalId);
    setEditCurrGoalId(goalToBeEdited.id);
    setCurrGoal(goalToBeEdited.text);
    setIsModalOpen(true);
  };

  const deleteGoalHandler = (goalId) => {
    setGoals((prevState) => {
      return prevState.filter((goal) => goal.id !== goalId);
    });
  };

  const handleAddNewGoalBtn = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setCurrGoal("");
    setIsModalOpen(false);
  };

  const markGoalAsComplete = (goalId) => {
    setGoals((prevState) => {
      return prevState.map((goal) => {
        if (goal.id === goalId) {
          return { ...goal, isCompleted: true };
        } else {
          return goal;
        }
      });
    });
  };

  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.appContainer} color="#5e0acc">
        <Button title="Add New Goal" onPress={handleAddNewGoalBtn} />
        <GoalInput
          currInput={currGoal}
          handleGoalInput={goalInputHandler}
          handleAddGoal={addGoalHandler}
          showModal={isModalOpen}
          closeModal={handleCloseModal}
        />
        <View style={styles.goalsContainer}>
          {goals.length === 0 ? (
            <View style={styles.noGoalsTextContainer}>
              <Text>No goals added yet!!</Text>
            </View>
          ) : (
            <FlatList
              data={goals}
              renderItem={({ item, index }) => (
                <GoalItem
                  data={item}
                  sno={index + 1}
                  handleEditGoal={editGoalHandler}
                  handleDeleteGoal={deleteGoalHandler}
                  markGoalAsComplete={markGoalAsComplete}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 50,
    paddingHorizontal: 16,
    flex: 1,
  },
  goalsContainer: {
    flex: 1,
    marginTop: 15,
  },
  noGoalsTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
