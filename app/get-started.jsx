import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import {
    Animated,
    Easing,
    Image,
    Platform,
    StatusBar as RNStatusBar,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import IllustrationLogo from "../assets/images/illustration.png"; // Replace with a modern banking-themed illustration
import { useTheme } from "../context/ThemeContext";

export default function GetStarted() {
  const { theme } = useTheme();

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  return (
    <LinearGradient
      colors={[theme.background, theme.background + "F0"]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <Animated.View
          style={[
            styles.wrapper,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          {/* Header */}
          <Text style={[styles.headerText, { color: theme.primary }]}>
            Welcome to Ubiaza
          </Text>

          {/* Illustration */}
          <View style={styles.illustrationContainer}>
            <Image
              source={IllustrationLogo}
              style={styles.illustration}
              resizeMode="contain"
            />
          </View>

          {/* Tagline and Subtext */}
          <View style={styles.textContainer}>
            <Text style={[styles.tagline, { color: theme.text }]}>
              Your Financial Journey Starts Here
            </Text>
            <Text style={[styles.subText, { color: theme.subText }]}>
              Seamlessly manage transactions, savings, and more in one secure app.
            </Text>
          </View>

          {/* Button */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.primary }]}
            activeOpacity={0.7}
            onPress={() => router.push("/login")}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0,
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: hp(4),
    paddingHorizontal: wp(5),
  },
  headerText: {
    fontSize: hp(3.5),
    fontWeight: "bold",
    letterSpacing: 0.5,
    textAlign: "center",
  },
  illustrationContainer: {
    alignItems: "center",
    marginVertical: hp(4),
  },
  illustration: {
    width: wp(60),
    height: hp(30),
  },
  textContainer: {
    alignItems: "center",
    paddingHorizontal: wp(5),
  },
  tagline: {
    fontSize: hp(2.8),
    fontWeight: "600",
    textAlign: "center",
    marginBottom: hp(1.5),
  },
  subText: {
    fontSize: hp(2),
    textAlign: "center",
    lineHeight: hp(2.8),
    opacity: 0.9,
    maxWidth: wp(80),
  },
  button: {
    width: wp(80),
    height: hp(6.5),
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: hp(2.2),
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});