import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from "react";
import { Animated, Image, Platform, Pressable, StatusBar as RNStatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function HomeHeader({ theme, Logo, title, navigation }) {
  const [showMenu, setShowMenu] = useState(false);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-10)).current;

  useEffect(() => {
    if (showMenu) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true
        }),
        Animated.timing(slideAnim, {
          toValue: -10,
          duration: 150,
          useNativeDriver: true
        })
      ]).start();
    }
  }, [showMenu, fadeAnim, slideAnim]);

  const toggleDrawer = () => {
    navigation.toggleDrawer();
    setShowMenu(false)
  }

  return (
    <>
      {/* FULL SCREEN OVERLAY */}
      {showMenu && (
        <Pressable
          style={StyleSheet.absoluteFillObject}
          onPress={() => setShowMenu(false)}
        />
      )}

      {/* HEADER */}
      <View style={[styles.wrapper, { backgroundColor: theme.background }]}>
        <View style={[styles.container, { borderBottomColor: theme.border }]}>
          {/* LEFT SIDE */}
          <View style={styles.leftSide}>
            <TouchableOpacity onPress={toggleDrawer}>
              <Feather name="menu" size={hp(2.9)} color={theme.text} />
            </TouchableOpacity>

            <View style={styles.LogoContainer}>
              <Image
                source={Logo}
                style={{
                  width: hp(4),
                  height: hp(4),
                  resizeMode: "contain"
                }}
              />
              <Text style={[styles.headerText, { color: theme.text }]}>{title}</Text>
            </View>
          </View>

          {/* RIGHT SIDE */}
          <View style={styles.rightSide}>
            <TouchableOpacity>
              <MaterialCommunityIcons name="bell-badge-outline" size={hp(2.9)} color={theme.text} />
            </TouchableOpacity>

            <View style={styles.profileClick}>
              <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
                <View style={[styles.profileIcon, { backgroundColor: theme.primary }]}>
                  <Text style={[styles.profileText, { color: "#fff" }]}>KO</Text>
                </View>
              </TouchableOpacity>

              {/* ANIMATED DROPDOWN MENU */}
              {showMenu && (
                <Animated.View
                  style={[
                    styles.dropdown,
                    {
                      backgroundColor: theme.card,
                      borderColor: theme.border,
                      opacity: fadeAnim,
                      transform: [{ translateY: slideAnim }]
                    }
                  ]}
                >
                  <TouchableOpacity style={styles.dropdownItem} onPress={() => setShowMenu(false)}>
                    <Feather name="user" size={hp(2.3)} color={theme.text} />
                    <Text style={[styles.dropdownText, { color: theme.text }]}>Profile</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.dropdownItem} onPress={() => setShowMenu(false)}>
                    <Feather name="help-circle" size={hp(2.3)} color={theme.text} />
                    <Text style={[styles.dropdownText, { color: theme.text }]}>Help & Support</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.dropdownItem} onPress={() => setShowMenu(false)}>
                    <Feather name="log-out" size={hp(2.3)} color={theme.text} />
                    <Text style={[styles.dropdownText, { color: theme.text }]}>Sign Out</Text>
                  </TouchableOpacity>
                </Animated.View>
              )}
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  container: {
    width: "100%",
    paddingHorizontal: hp(2),
    
    paddingVertical: hp(1.5),
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomWidth: hp(0.2),
    zIndex: 10
  },
  leftSide: {
    flexDirection: "row",
    gap: hp(3),
    alignItems: 'center',
    justifyContent: "flex-end"
  },
  LogoContainer: {
    flexDirection: "row",
    alignItems: 'center',
    gap: hp(0.5)
  },
  headerText: {
    fontSize: hp(2.5),
    fontWeight: "500"
  },
  rightSide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: hp(2),
    justifyContent: "flex-end"
  },
  profileIcon: {
    width: hp(4),
    height: hp(4),
    borderRadius: hp(2),
    alignItems: "center",
    justifyContent: "center"
  },
  profileClick: {
    position: "relative"
  },
  dropdown: {
    position: "absolute",
    top: hp(5),
    right: 0,
    borderWidth: 1,
    borderRadius: hp(1),
    paddingVertical: hp(0.5),
    width: hp(20),
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    zIndex: 20
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: hp(1.5),
    paddingVertical: hp(1)
  },
  dropdownText: {
    fontSize: hp(1.8),
    marginLeft: hp(1)
  }
});
