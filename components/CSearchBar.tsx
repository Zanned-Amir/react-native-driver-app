import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

type SearchBarProps = {
  placeholder?: string;
  onSearch?: (text: string) => void;
  style?: object;
  onSearchPress?: (searchText: string) => void;
  onFilterPress?: () => void;
  onSearchTextChange?: (text: string) => void;
  onSearchFocus?: () => void;
  searchText?: string;
  searchMode?: boolean;
};

const SearchBar = ({
  placeholder = "Search...",
  onSearch,
  style,
  onSearchPress = () => {},
  onFilterPress = () => {},
  onSearchTextChange = () => {},
  onSearchFocus = () => {},
  searchText = "",
  searchMode = false,
}: SearchBarProps) => {
  const [localSearchText, setLocalSearchText] = useState(searchText);

  // Sync with parent component
  useEffect(() => {
    setLocalSearchText(searchText);
  }, [searchText]);

  const handleSearch = () => {
    onSearchPress(localSearchText);
    if (onSearch) {
      onSearch(localSearchText);
    }
  };

  const handleTextChange = (text: string) => {
    setLocalSearchText(text);
    onSearchTextChange(text); // Real-time search
    if (onSearch) {
      onSearch(text);
    }
  };

  const handleFocus = () => {
    onSearchFocus();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.searchInput, searchMode && styles.searchInputActive]}
        placeholder={placeholder}
        value={localSearchText}
        onChangeText={handleTextChange}
        onFocus={handleFocus}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
        autoFocus={searchMode}
      />

      <TouchableOpacity onPress={handleSearch}>
        <Ionicons name="search" style={styles.searchIcon} />
      </TouchableOpacity>

      <TouchableOpacity onPress={onFilterPress}>
        <Ionicons name="filter" style={styles.filterIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  searchInputActive: {
    borderColor: "#89A2E6FF",
    borderWidth: 2,
  },
  searchIcon: {
    fontSize: 24,
    color: "#000",
    marginLeft: 10,
  },
  filterIcon: {
    fontSize: 24,
    color: "#000",
    marginLeft: 10,
  },
});
