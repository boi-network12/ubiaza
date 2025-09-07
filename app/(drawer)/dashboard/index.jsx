import { useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Logo from "../../../assets/images/logo.png";
import HomeHeader from '../../../components/Header/HomeHeader';
import BalanceCard from '../../../components/UI/BalanceCard';
import QuickActions from '../../../components/UI/QuickActions';
import { useTheme } from '../../../context/ThemeContext';

export default function Dashboard() {
  const { theme } = useTheme();
  const navigation = useNavigation();

  return (
    <SafeAreaView
        style={[styles.container, { backgroundColor: theme.card }]}
    >
      <StatusBar style="auto" />
      {/* header  */}
      <HomeHeader
         theme={theme}
         Logo={Logo}
         navigation={navigation}
         title="Ubiaza"
      />
      {/* content */}
      <ScrollView contentContainerStyle={styles.contentsSections}>
        <BalanceCard
          theme={theme}
        />

        <QuickActions
           theme={theme}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  contentsSections: {
    paddingHorizontal: hp(2),
    paddingVertical: hp(2),
    marginTop: hp(1)
  }
})