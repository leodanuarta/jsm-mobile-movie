import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
        <StatusBar hidden={true}></StatusBar>
      <Stack >
        <Stack.Screen name="(tabs)" options={{headerShown:false}}>
        </Stack.Screen>

        <Stack.Screen name="movies/[id]" options={{headerShown: false}}></Stack.Screen>
      </Stack>
    </>
  )
}
