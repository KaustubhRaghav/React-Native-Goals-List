import { useRef } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  Image,
} from "react-native";

const GoalInput = ({
  currInput,
  handleGoalInput,
  handleAddGoal,
  showModal,
  closeModal,
}) => {
  const goalInputEle = useRef(null);

  const focusGoalInputEle = () => {
    setTimeout(() => goalInputEle.current.focus(), 50);
  };

  return (
    <Modal
      visible={showModal}
      animationType="slide"
      onRequestClose={closeModal}
      transparent
      onShow={focusGoalInputEle}
    >
      <View style={styles.modalContainer}>
        <View style={styles.inputContainer}>
          <Image
            source={require("../assets/images/goal.png")}
            style={styles.image}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Your course goal"
            onChangeText={handleGoalInput}
            value={currInput}
            ref={goalInputEle}
            selectionColor="darkgray"
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Add Goal"
                onPress={handleAddGoal}
                disabled={currInput.length === 0}
                color="forestgreen"
              />
            </View>
            <View style={styles.button}>
              <Button title="Cancel" onPress={closeModal} color="red" />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "flex-end",
    flex: 1,
  },
  inputContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 35,
    paddingBottom: 35,
    paddingTop: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation: 30,
    height: 200,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 6,
    width: "100%",
    padding: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    width: 100,
    marginHorizontal: 8,
  },
  image: {
    width: 50,
    height: 50,
    margin: 10,
  },
});

export default GoalInput;
