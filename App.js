import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import Instabug from 'instabug-reactnative';

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  text: {
    fontSize: 30,
    fontWeight: "bold"
  }
});

class App extends React.Component {
  state = { number: null };

  constructor(props) {
    super(props);

    Instabug.startWithToken('f8648c646e5ba10121bb6d2f0fa3a0b1', [Instabug.invocationEvent.shake]);
  }

  componentDidMount() {
    this.getNumber();
  }

  getNumber = () => {
    fetch("https://pond-relative.glitch.me/number")
      .then(res => res.json())
      .then(res => {
        this.setState({
          number: res.number
        });
      })
      .catch((error) => {
        Instabug.reportJSException(error);
        alert("an error occurred!");
      });
  };

  incrementNumber = () => {
    this.setState(state => {
      return {
        number: state.number + 1,
      }
    })
  };

  decrementNumber = () => {
    this.setState(state => {
      return {
        number: state.number - 1,
      }
    })
  };

  causeCrash = () => {
    alert(this.state.data.number);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{__DEV__.toString()}</Text>
        <Text style={styles.text}>{this.state.number}</Text>
        <Button title="Increment Number" onPress={this.incrementNumber} />
        <Button title="Decrement Number" onPress={this.decrementNumber} />
        <Button title="Get New Number" onPress={this.getNumber} />
        <Button title="Make it crash" onPress={this.causeCrash} />
      </View>
    );
  }
}

export default App;
