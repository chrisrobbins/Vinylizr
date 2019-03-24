import React from "react";
import { Image } from "react-native";

// Collection Icons
export const CollectionFocused = () => {
  return (
    <Image
      source={require("../../assets/icons/collection-selected.png")}
      style={styles.icons}
    />
  );
};
export const CollectionRested = () => {
  return (
    <Image
      source={require("../../assets/icons/collection-rested.png")}
      style={styles.icons}
    />
  );
};

// Wantlist Icons
export const WantlistFocused = () => {
  return (
    <Image
      source={require("../../assets/icons/wantlist-selected.png")}
      style={styles.icons}
    />
  );
};
export const WantlistRested = () => {
  return (
    <Image
      source={require("../../assets/icons/wantlist-rested.png")}
      style={styles.icons}
    />
  );
};

// Profile Icons
export const ProfileFocused = () => {
  return (
    <Image
      source={require("../../assets/icons/profile-selected.png")}
      style={styles.icons}
    />
  );
};
export const ProfileRested = () => {
  return (
    <Image
      source={require("../../assets/icons/profile-rested.png")}
      style={styles.icons}
    />
  );
};

// Search Icons
export const SearchFocused = () => {
  return (
    <Image
      source={require("../../assets/icons/search-selected.png")}
      style={styles.icons}
    />
  );
};
export const SearchRested = () => {
  return (
    <Image
      source={require("../../assets/icons/search-rested.png")}
      style={styles.icons}
    />
  );
};

// Icon styles
const styles = {
  icons: {
    padding: 0,
    width: 20,
    height: 20,
    marginTop: 3
  }
};
