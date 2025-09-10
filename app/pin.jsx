import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function PinScreen() {
  const [pin, setPin] = useState("");
  const { theme } = useTheme();
  const { verifyPin } = useAuth();

  const handlePress = (num) => {
    if (pin.length < 6) {
      setPin((prev) => prev + num);
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  const handleSubmit = async () => {
    const success = await verifyPin(pin);
    if (!success) {
      alert("Incorrect PIN");
      setPin("");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Enter PIN</Text>

      {/* PIN Dots */}
      <View style={styles.pinDots}>
        {Array.from({ length: 4 }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              {
                borderColor: theme.border,
                backgroundColor: i < pin.length ? theme.primary : "transparent",
              },
            ]}
          />
        ))}
      </View>

      {/* Number Pad */}
      <View style={styles.keypad}>
        {[
          ["1", "2", "3"],
          ["4", "5", "6"],
          ["7", "8", "9"],
          ["del", "0", "ok"],
        ].map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((item) => {
              const isAction = item === "ok" || item === "del";
              return (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.key,
                    {
                      backgroundColor: isAction
                        ? theme.primary
                        : theme.card,
                    },
                  ]}
                  activeOpacity={0.7}
                  onPress={() => {
                    if (item === "del") handleDelete();
                    else if (item === "ok") handleSubmit();
                    else handlePress(item);
                  }}
                >
                  <Text
                    style={[
                      styles.keyText,
                      { color: isAction ? theme.textActive : theme.text },
                    ]}
                  >
                    {item === "del" ? "⌫" : item.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp(5),
  },
  title: {
    fontSize: hp(3),
    fontWeight: "600",
    marginBottom: hp(4),
  },
  pinDots: {
    flexDirection: "row",
    gap: wp(3),
    marginBottom: hp(5),
  },
  dot: {
    width: hp(2),
    height: hp(2),
    borderRadius: hp(1),
    borderWidth: 2,
  },
  keypad: {
    width: "85%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: hp(2.5),
  },
  key: {
    width: hp(8.5),
    height: hp(8.5),
    borderRadius: hp(4.25),
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  keyText: {
    fontSize: hp(2.5),
    fontWeight: "500",
  },
});
