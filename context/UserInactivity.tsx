import React, { useEffect, useRef } from "react";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { AppState, AppStateStatus } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserInactivityProviderProps {
  children: React.ReactNode;
}

export const UserInactivityProvider: React.FC<UserInactivityProviderProps> = ({
  children,
}) => {
  // Get the app state
  const appState = useRef(AppState.currentState);

  // Bring the user back to a specific page once we strike
  const router = useRouter();

  // Check if user is signed in, if not there's no need to lock the application
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => subscription.remove();
  }, []);

  // Function to get the next app state
  const handleAppStateChange = async (nextAppState: AppStateStatus) => {
    // If we are in the background
    if (nextAppState === "background") {
      await recordStartTime();
    } else if (
      // If we are coming from the backgrou nd
      nextAppState === "active" &&
      appState.current.match(/background/)
    ) {
      // Elapsed time
      const startTime = await AsyncStorage.getItem("startTime");
      const elapsed = Date.now() - parseInt(startTime || "0", 10);
      console.log("handleAppStateChange ~ elapsed:", elapsed);

      // If the time is more than the elapsed,
        if (elapsed > 3000 && isSignedIn) {
          console.log(isSignedIn)
        router.replace("/(authenticated)/(modals)/lock");
      }
    }

    console.log(nextAppState);
    appState.current = nextAppState;
  };

  // Function to record the starting time
  const recordStartTime = async () => {
    console.log("RECORDING START TIME");
    await AsyncStorage.setItem("startTime", Date.now().toString());
  };

  return <>{children}</>;
};
