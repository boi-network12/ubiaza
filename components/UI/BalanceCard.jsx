// BalanceCard.js
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SpiralOverlay from './SpiralOverlay';

export default function BalanceCard({ theme }) {
  // Animation refs for button press effects
  const sendMoneyAnimY = useRef(new Animated.Value(0)).current;
  const sendMoneyBorder = useRef(new Animated.Value(0)).current;
  const addMoneyAnimY = useRef(new Animated.Value(0)).current;
  const addMoneyBorder = useRef(new Animated.Value(0)).current;

  const handlePressIn = (yAnim, borderAnim) => {
    Animated.parallel([
      Animated.spring(yAnim, { toValue: -5, friction: 5, tension: 100, useNativeDriver: true }),
      Animated.timing(borderAnim, { toValue: 1, duration: 150, useNativeDriver: false }),
    ]).start();
  };

  const handlePressOut = (yAnim, borderAnim) => {
    Animated.parallel([
      Animated.spring(yAnim, { toValue: 0, friction: 5, tension: 100, useNativeDriver: true }),
      Animated.timing(borderAnim, { toValue: 0, duration: 150, useNativeDriver: false }),
    ]).start();
  };

  const sendMoneyBorderColor = sendMoneyBorder.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.border, theme.primary],
  });

  const addMoneyBorderColor = addMoneyBorder.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.border, theme.primary],
  });

  return (
    <View style={styles.container}>
      {/* Card with Spiral inside */}
      <LinearGradient
        colors={['#1441B3FF', '#1E4ED8', '#4A7DFC']}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 1, y: 0.9 }}
        locations={[0, 0.5, 1]}
        style={styles.card}
      >
        <View style={styles.spiralOverlay}>
          <SpiralOverlay />
        </View>

        <View style={styles.topText}>
          <Text style={styles.topTextHeader}>your account balance</Text>
          <Pressable style={styles.eyeSplash}>
            <BlurView intensity={100} style={styles.BlurView}>
              <Ionicons name="eye-off-sharp" size={hp(2.5)} color="#fff" />
            </BlurView>
          </Pressable>
        </View>

        <View style={styles.bottomText}>
          <Text style={styles.balanceText}> ₦0.00</Text>
          <Text style={styles.subText}>
            Available &#8226; account: 2218620823
          </Text>
        </View>
      </LinearGradient>

      {/* Buttons */}
      <View style={styles.btnDisplay}>
        {/* Send Money */}
        <Animated.View style={{ transform: [{ translateY: sendMoneyAnimY }], flex: 1 }}>
          <Pressable
            onPressIn={() => handlePressIn(sendMoneyAnimY, sendMoneyBorder)}
            onPressOut={() => handlePressOut(sendMoneyAnimY, sendMoneyBorder)}
          >
            <Animated.View
              style={[styles.btn, { borderColor: sendMoneyBorderColor, backgroundColor: theme.background }]}
            >
              <Entypo name="paper-plane" size={hp(2.2)} color={theme.subText} />
              <Text style={[styles.btnText, { color: theme.subText }]}>
                send money
              </Text>
            </Animated.View>
          </Pressable>
        </Animated.View>

        <View style={{ width: hp(1) }} />

        {/* Add Money */}
        <Animated.View style={{ transform: [{ translateY: addMoneyAnimY }], flex: 1 }}>
          <Pressable
            onPressIn={() => handlePressIn(addMoneyAnimY, addMoneyBorder)}
            onPressOut={() => handlePressOut(addMoneyAnimY, addMoneyBorder)}
          >
            <Animated.View
              style={[styles.btn, { borderColor: addMoneyBorderColor, backgroundColor: theme.background }]}
            >
              <AntDesign name="plus" size={hp(2.2)} color={theme.subText} />
              <Text style={[styles.btnText, { color: theme.subText }]}>
                add money
              </Text>
            </Animated.View>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  card: {
    width: '100%',
    borderRadius: hp(1.5),
    padding: hp(2.5),
    marginBottom: hp(2.1),
    overflow: 'hidden',
  },
  spiralOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  topText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(2),
  },
  topTextHeader: {
    textTransform: 'capitalize',
    color: '#fff',
    fontSize: hp(2),
  },
  eyeSplash: {
    width: hp(3.8),
    height: hp(3.8),
    borderRadius: hp(0.5),
    overflow: 'hidden',
  },
  BlurView: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomText: {
    marginTop: hp(2),
  },
  balanceText: {
    fontSize: hp(3.5),
    fontWeight: '700',
    color: '#fff',
  },
  subText: {
    fontSize: hp(1.5),
    fontWeight: '300',
    color: '#fff',
    textTransform: 'capitalize',
  },
  btnDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderWidth: hp(0.1),
    borderRadius: hp(1.5),
    paddingVertical: hp(1.5),
    gap: hp(1.5),
  },
  btnText: {
    fontSize: hp(1.8),
    fontWeight: '300',
    textTransform: 'capitalize',
  },
});
