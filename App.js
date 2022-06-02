import React, { useContext } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import Context, { NewsContext } from "./API/Context";
import InshortTabs from "./components/InshortTabs";

function App() {
  const { darkTheme } = useContext(NewsContext);

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: darkTheme ? "#282C35" : "white",
      }}
    >
      <InshortTabs />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});

export default () => {
  return (
    <Context>
      <App />
    </Context>
  );
};
