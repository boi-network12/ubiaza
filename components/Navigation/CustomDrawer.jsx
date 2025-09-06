import { Entypo, Fontisto, MaterialIcons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { usePathname, useRouter } from 'expo-router';
import { cloneElement, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTheme } from '../../context/ThemeContext';

export default function CustomDrawer({ props, Logo }) {
  const { theme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  const _NavDetails = [
    {
      icon: <Entypo name="home" size={hp(2.5)} color={theme.secondary} />,
      name: "Dashboard",
      path: "/dashboard",
      active: true,
    },
    {
      icon: <Fontisto name="arrow-swap" size={hp(2.5)} color={theme.secondary} />,
      name: "Transactions",
      path: "/transactions",
      active: false,
    },
    {
      icon: <Entypo name="paper-plane" size={hp(2.5)} color={theme.secondary} />,
      name: "Send Money",
      path: "/send-money",
      active: false,
    },
    {
      icon: <Entypo name="credit-card" size={hp(2.5)} color={theme.secondary} />, // Added for Airtime & Data
      name: "Airtime & Data",
      path: "/airtime-data",
      active: false,
    },
    {
      icon: <Entypo name="credit" size={hp(2.5)} color={theme.secondary} />, // Added for Pay Bills
      name: "Pay Bills",
      path: "/pay-bills",
      active: false,
    },
    {
      icon: <Entypo name="credit-card" size={hp(2.5)} color={theme.secondary} />, // Added for Payment Methods
      name: "Payment Methods",
      path: "/payment-methods",
      active: false,
    },
    {
      icon: <Entypo name="user" size={hp(2.5)} color={theme.secondary} />, // Added for Profile
      name: "Profile",
      path: "/profile",
      active: false,
    },
    {
      icon: <Entypo name="help" size={hp(2.5)} color={theme.secondary} />, // Added for Help & Support
      name: "Help & Support",
      path: "/help-support",
      active: false,
    },
  ];

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}
    >
      {/* Logo Section */}
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <Image
          source={Logo}
          style={{
            width: hp(5),
            height: hp(5),
            resizeMode: 'contain',
          }}
        />
        <Text style={[styles.logoText, { color: theme.text }]}>Ubiaza</Text>
      </View>

      {/* Navigation Items */}
      {_NavDetails.map((item, index) => {
        const isActive = pathname === item.path

        return (
            <DrawerItem
                key={index}
                label={() => (
                    <View style={styles.navItem}>
                    {cloneElement(item.icon, { 
                        color: isActive ? theme.textActive : theme.secondary 
                    })}
                    <Text
                        style={[
                        styles.navText,
                        { color: isActive ? theme.textActive : theme.secondary }
                        ]}
                    >
                        {item.name}
                    </Text>
                    </View>
                )}
                onPress={() => router.push(item.path)}
                style={[
                    styles.drawerItem,
                    isActive && { backgroundColor: theme.primary }
                ]}
            />
        )
       })}

      {/* Sign Out and Chat with us */}
      <View style={[styles.bottomSection, { borderTopColor: theme.border }]}>
        <TouchableOpacity 
            style={[styles.button]} 
            onPress={() => router.push('/sign-out')}
        >
            <MaterialIcons name="logout" size={hp(2.5)} color={theme.accent} />
          <Text style={[styles.buttonText, { color: theme.accent }]}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:  "flex-start",
    padding: hp(2),
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: hp(2),
  },
  logoText: {
    fontSize: hp(2.5),
    fontWeight: 'bold',
    marginLeft: hp(1),
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navText: {
    fontSize: hp(2),
    marginLeft: hp(1.5),
  },
  drawerItem: {
    borderRadius: hp(0.7),
    marginBottom: hp(0.5)
  },
  bottomSection: {
    padding: hp(2),
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    marginTop: 'auto',
  },
  button: {
    marginBottom: hp(1),
    alignItems: 'center',
    flexDirection: "row",
    gap: hp(0.5)
  },
  chatButton: {
    padding: hp(1.5),
    borderRadius: hp(0.5),
  },
  buttonText: {
    fontSize: hp(1.8),
    textAlign: 'center',
  },
});