import { FontAwesome6, Fontisto, MaterialIcons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function QuickActions({ theme }) {
  const _actionClick = useMemo(
    () => [
      { name: "Bank Transfer", iconBgC: "#1DA1F2", icon: <Fontisto name="arrow-swap" size={hp(2.5)} color="#fff" />, screen: "/transfer" },
      { name: "Airtime & Data", iconBgC: "#00B894", icon: <Fontisto name="mobile-alt" size={hp(2.5)} color="#fff" />, screen: "/airtime-data" },
      { name: "Pay Bills", iconBgC: "#9B59B6", icon: <Fontisto name="file-1" size={hp(2.5)} color="#fff" />, screen: "/bills" },
      { name: "Payment Methods", iconBgC: "#F39C12", icon: <Fontisto name="credit-card" size={hp(2.5)} color="#fff" />, screen: "/payment-methods" },
      { name: "My Account", iconBgC: "#E84393", icon: <MaterialIcons name="wallet" size={hp(2.5)} color="#fff" />, screen: "/my-account" },
      { name: "Transaction History", iconBgC: "#636E72", icon: <MaterialIcons name="history" size={hp(2.5)} color="#fff" />, screen: "/transactions" },
      { name: "Invest", iconBgC: "#0984E3", icon: <FontAwesome6 name="money-bill-wave" size={hp(2.5)} color="#fff" />, screen: "/invest" },
      { name: "International Payments", iconBgC: "#00B894", icon: <Fontisto name="world-o" size={hp(2.5)} color="#fff" />, screen: "/international" },
      { name: "Loans", iconBgC: "#D63031", icon: <FontAwesome6 name="coins" size={hp(2.5)} color="#fff" />, screen: "/loans" },
    ],
    [] 
  );

  const animations = useMemo(
    () => _actionClick.map(() => new Animated.Value(1)),
    [_actionClick]
  );

  const [pressedIndex, setPressedIndex] = useState(null);

  return (
    <View style={[styles.container, { borderColor: theme.border, backgroundColor: theme.background }]}>
      <Text style={[styles.headerText, { color: theme.text }]}>Quick actions</Text>

      <View style={styles.actionContainer}>
        {_actionClick.map((item, index) => {
          const onPressIn = () => {
            setPressedIndex(index);
            Animated.spring(animations[index], {
              toValue: 0.95,
              useNativeDriver: true,
              speed: 20,
              bounciness: 6,
            }).start();
          };

          const onPressOut = () => {
            setPressedIndex(null);
            Animated.spring(animations[index], {
              toValue: 1,
              useNativeDriver: true,
              speed: 20,
              bounciness: 6,
            }).start();
          };

          return (
            <Pressable key={index} onPressIn={onPressIn} onPressOut={onPressOut}>
              <Animated.View
                style={[
                  styles.animatedBox,
                  {
                    transform: [{ scale: animations[index] }],
                    borderColor: pressedIndex === index ? theme.primary : theme.border,
                    backgroundColor:
                      pressedIndex === index
                        ? `${theme.primary}15`
                        : theme.background,
                  },
                ]}
              >
                <View style={[styles.iconBgC, { backgroundColor: item.iconBgC }]}>
                  {item.icon}
                </View>
                <Text style={[styles.itemText, { color: theme.text }]}>{item.name}</Text>
              </Animated.View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: hp(2),
    borderWidth: hp(0.09),
    borderRadius: hp(2),
    padding: hp(2),
  },
  headerText: {
    textTransform: "capitalize",
    fontWeight: "500",
    fontSize: hp(1.8),
  },
  actionContainer: {
    marginTop: hp(2.2),
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: 'center',
    justifyContent: "space-between",
    gap: hp(1.5),
  },
  animatedBox: {
    width: hp(12),
    borderWidth: hp(0.09),
    borderRadius: hp(1),
    overflow: "hidden",
    padding: hp(1.5),
    height: hp(12),
    alignItems: "center",
    justifyContent: "center",
    gap: hp(1),
  },
  iconBgC: {
    width: hp(4.5),
    height: hp(4.5),
    borderRadius: hp(1),
    alignItems: "center",
    justifyContent: "center",
  },
  itemText: {
    fontSize: hp(1.3),
    textAlign: "center",
  },
});
