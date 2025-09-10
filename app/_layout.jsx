import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';
import "../global.css";



export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <Stack
          screenOptions={{
            headerShown: false
          }}
          >
            <Stack.Screen name='get-started' options={{ headerShown: false }}/>
          </Stack>
        </AuthProvider>
    </ThemeProvider>
  );
}
