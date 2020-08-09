import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import PageHeader from "../components/PageHeader";

import { useFocusEffect } from "@react-navigation/native";

import TeacherItem, { Teacher } from "../components/TeacherItem";
import AsyncStorage from "@react-native-community/async-storage";

import styles from "./styles";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  function loadFavortes() {
    AsyncStorage.getItem("favorites").then((response) => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);

        setFavorites(favoritedTeachers);
      }
    });
  }

  useFocusEffect(() => {
    loadFavortes();
  });

  return (
    <View style={styles.container}>
      <PageHeader title="Meus proffys favoritos" />
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
      >
        {favorites.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} favorited />;
        })}
      </ScrollView>
    </View>
  );
}

export default Favorites;
