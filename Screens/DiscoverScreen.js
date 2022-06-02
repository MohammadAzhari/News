import React, { useContext, useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { categories, sources } from "../API/api";
import { NewsContext } from "../API/Context";
import { Entypo } from "@expo/vector-icons";
import Search from "../components/Search";
import { countries } from "../API/api";

const DiscoverScreen = () => {
  const windowWidth = Dimensions.get("window").width;
  const SLIDE_WIDTH = Math.round(windowWidth / 3.5);

  const [modalVisible, setModalVisible] = useState(false);

  const { setCategory, setSource, darkTheme, country, setCountry } =
    useContext(NewsContext);

  return (
    <View style={styles.discover}>
      <Search />
      <Text
        style={{ ...styles.subtitle, color: darkTheme ? "white" : "black" }}
      >
        Categories
      </Text>
      <Carousel
        layout={"default"}
        data={categories}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => setCategory(item.name)}
              style={styles.category}
            >
              <Image source={{ uri: item.pic }} style={styles.categoryImage} />
              <Text style={{ color: darkTheme ? "white" : "black" }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
        sliderWidth={windowWidth}
        itemWidth={SLIDE_WIDTH}
        activeSlideAlignment={"start"}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
      />
      <Text
        style={{ ...styles.subtitle, color: darkTheme ? "white" : "black" }}
      >
        Sources
      </Text>
      <View style={styles.sources}>
        {sources.map((s) => (
          <TouchableOpacity
            onPress={() => {
              setSource(s.id);
              setCategory("default");
            }}
            key={s.id}
            style={styles.sourceContainer}
          >
            <Image source={{ uri: s.pic }} style={styles.sourceImage} />
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          ...styles.country,
          backgroundColor: darkTheme ? "black" : "lightgrey",
        }}
      >
        <Text
          style={{
            ...styles.countryText,
            color: darkTheme ? "white" : "black",
          }}
        >
          Countury
        </Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            minHeight: "50%",
            top: "30%",
            backgroundColor: darkTheme ? "black" : "lightgrey",
            zIndex: 3,
          }}
        >
          <TouchableOpacity
            onPress={() => setModalVisible(!modalVisible)}
            style={{
              position: "absolute",
              zIndex: 1,
              right: 0,
              margin: 20,
            }}
          >
            <Entypo
              name="circle-with-cross"
              size={30}
              color={darkTheme ? "lightgrey" : "black"}
            />
          </TouchableOpacity>
          <View style={styles.countries}>
            {countries.map((cun, i) => (
              <TouchableOpacity
                onPress={() => setCountry(cun)}
                style={{
                  ...styles.countryList,
                  backgroundColor:
                    cun.code === country.code
                      ? "#007FFF"
                      : darkTheme
                      ? "lightgrey"
                      : "black",
                }}
                key={i}
              >
                <Text
                  style={{
                    ...styles.countryText,
                    color: darkTheme ? "black" : "white",
                  }}
                >
                  {cun.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DiscoverScreen;

const styles = StyleSheet.create({
  discover: {
    padding: 10,
    alignItems: "center",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 8,
    marginHorizontal: 5,
    borderBottomColor: "#007FFF",
    borderBottomWidth: 5,
    alignSelf: "flex-start",
    borderRadius: 10,
  },
  category: {
    height: 130,
    margin: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  categoryImage: {
    height: "60%",
    width: "100%",
    resizeMode: "contain",
  },
  name: {
    fontSize: 14,
    textTransform: "capitalize",
  },
  sources: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingVertical: 15,
  },
  sourceContainer: {
    height: 150,
    width: "40%",
    borderRadius: 10,
    margin: 15,
    backgroundColor: "#cc313d",
  },
  sourceImage: {
    height: "100%",
    borderRadius: 10,
    resizeMode: "cover",
  },
  country: {
    width: "100%",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "flex-start",
  },
  countryText: {
    marginLeft: 5,
    fontSize: 15,
  },
  countries: {
    marginTop: "20%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  countryList: {
    padding: 15,
    margin: 20,
    borderRadius: 15,
  },
});
