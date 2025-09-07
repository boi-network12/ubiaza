import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Logo from "../../assets/images/logo.png";
import CustomDrawer from "../../components/Navigation/CustomDrawer";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawer {...props} Logo={Logo} />}
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            width: wp(70),
            backgroundColor: "transparent",
            borderRadius: 0,
            padding: 0,
            margin: 0
          },
        }}
      />
    </GestureHandlerRootView>
  );
}
// app/(drawer)/_layout