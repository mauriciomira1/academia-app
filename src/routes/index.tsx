import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { useTheme, Box } from "native-base";

export const Routes = () => {
  const theme = DefaultTheme;
  const { colors } = useTheme();

  theme.colors.background = colors.gray[700];

  return (
    <Box flex={1} bg="gray-700">
      <NavigationContainer>
        <AuthRoutes />
      </NavigationContainer>
    </Box>
  );
};
