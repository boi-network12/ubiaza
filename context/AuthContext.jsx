import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null means no account yet
  const [isUnlocked, setIsUnlocked] = useState(false); // for PIN check
  const router = useRouter();

  // Load user from storage when app starts
  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem("user");
        if (!savedUser) {
          router.replace("/get-started"); // first-time user
        } else {
          setUser(JSON.parse(savedUser));
          router.replace("/pin"); // existing user → PIN screen
        }
      } catch (err) {
        console.log("Error loading user:", err);
      }
    };
    loadUser();
  }, [router]);

  // Save user to storage
  const saveUser = async (userData) => {
    try {
      setUser(userData);
      await AsyncStorage.setItem("user", JSON.stringify(userData));
    } catch (err) {
      console.log("Error saving user:", err);
    }
  };

  // Simulate PIN verification
  const verifyPin = async (enteredPin) => {
  if (enteredPin === "1234") {
    setIsUnlocked(true);
    router.replace("/dashboard");
    return true;
  }
  return false;
};


  // Logout
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      setUser(null);
      setIsUnlocked(false);
      router.replace("/login");
    } catch (err) {
      console.log("Logout error:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser: saveUser,
        isUnlocked,
        verifyPin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};