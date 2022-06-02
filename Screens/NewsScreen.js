import React, { useContext, useState } from "react";
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { NewsContext } from "../API/Context";
import SingleNews from "../components/SingleNews";

const NewsScreen = () => {
  const {
    news: { articles },
    darkTheme,
  } = useContext(NewsContext);

  const windowHeight = Dimensions.get("window").height;

  return (
    <View style={styles.carousel}>
      {articles && (
        <Carousel
          firstItem={articles.slice(0, 10).length - 1}
          layout={"stack"}
          data={articles.slice(0, 10)}
          sliderHeight={300}
          itemHeight={windowHeight}
          vertical={true}
          renderItem={({ item, index }) => (
            <SingleNews item={item} index={index} darkTheme={darkTheme} />
          )}
        />
      )}
    </View>
  );
};

export default NewsScreen;

const styles = StyleSheet.create({
  carousel: {
    flex: 1,
    backgroundColor: "black",
  },
});
