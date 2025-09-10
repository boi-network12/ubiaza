import { Entypo } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar as RNStatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Logo from "../../assets/images/logo.png";
import { useTheme } from '../../context/ThemeContext';

export default function Login() {
  const { theme } = useTheme();

  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const LoginForm = () => {
    return (
      <View style={[styles.inputForm, { backgroundColor: "#fff" }]}>
        <Text style={styles.FormHeaderText}>sign in to your account</Text>

        {/* Email */}
        <View style={styles.InputContainer}>
          <Text style={styles.label}>Email Address </Text>
          <TextInput
            placeholder='example@gmail.com'
            style={[
              styles.input,
              { borderColor: emailFocused ? theme.primary : "#eee" }
            ]}
            selectionColor={theme.primary}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
          />
        </View>

        {/* Password */}
        <View style={styles.InputContainer}>
          <Text style={styles.label}>Password </Text>
          <TextInput
            placeholder='******'
            style={[
              styles.input,
              { borderColor: passwordFocused ? theme.primary : "#eee" }
            ]}
            selectionColor={theme.primary}
            secureTextEntry
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
          />
        </View>

        {/* Button */}
        <TouchableOpacity style={[styles.btn, { backgroundColor: theme.primary }]} onPress={() => router.push("/pin")}>
          <Text style={styles.btnText}>sign in</Text>
        </TouchableOpacity>

        {/* Register Link */}
        <Text style={styles.subText}>
          Don&apos;t have an account? <Link href="/register">Create an account</Link>
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.primary }]}>
      {/* Header */}
      <TouchableOpacity style={styles.header} onPress={() => router.back()}>
        <BlurView intensity={100} style={styles.BlurView}>
          <Entypo name="chevron-small-left" size={hp(3)} color="#fff" />
        </BlurView>
      </TouchableOpacity>

      {/* Logo */}
      <View style={styles.FirstInnerView}>
        <Image
          source={Logo}
          style={{
            width: wp(10),
            height: hp(5),
            objectFit: "cover",
          }}
        />
        <Text style={styles.logoText}>ubiaza</Text>
      </View>

      <Text style={styles.logoText}>Welcome Back</Text>

      <Text style={styles.topSubText}>
        Sign in to your Ubiaza account to continue managing your finances.
      </Text>

      <KeyboardAvoidingView>
        {LoginForm()}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0,
    alignItems: 'center',
  },
  header: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    padding: hp(2),
  },
  BlurView: {
    width: hp(4),
    height: hp(4),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: hp(1),
  },
  FirstInnerView: {
    marginTop: hp(8),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: hp(1.5),
    marginBottom: hp(5),
  },
  logoText: {
    fontSize: hp(3),
    fontWeight: "600",
    color: "#fff",
  },
  topSubText: {
    textAlign: 'center',
    width: hp(30),
    marginVertical: hp(3),
    fontSize: hp(2),
    color: "#fff",
    fontWeight: "400",
  },
  inputForm: {
    width: hp(45),
    padding: hp(2),
    borderBottomRightRadius: hp(2),
    borderBottomLeftRadius: hp(2),
  },
  FormHeaderText: {
    marginBottom: hp(3),
    fontSize: hp(2.5),
    fontWeight: "600",
    color: "#777",
  },
  InputContainer: {
    marginBottom: hp(2),
    width: "100%",
    overflow: "hidden",
  },
  label: {
    fontWeight: "600",
    color: "#555",
    fontSize: hp(1.6),
  },
  input: {
    borderWidth: hp(0.15),
    height: hp(5.5),
    borderColor: "#eee",
    marginTop: hp(1),
    borderRadius: hp(0.8),
    paddingHorizontal: hp(2),
  },
  btn: {
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(6),
    marginTop: hp(2),
    borderRadius: hp(1.5),
  },
  btnText: {
    fontSize: hp(2),
    color: "#fff",
    fontWeight: "600",
  },
  subText: {
    marginVertical: hp(3),
    textAlign: 'center',
    fontWeight: "300",
  },
});
