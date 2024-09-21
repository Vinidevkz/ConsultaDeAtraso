import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './pages/home.js';
import MinhasFaltas from './pages/faltas.js';

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ff8f26', 
        },
        headerTintColor: '#fff', 
        headerTitleStyle: {
          fontWeight: 'bold', 
        },
      }}
    >
      <Drawer.Screen 
        name="Home" 
        component={Home} 
        options={{ title: 'Página Inicial' }} 
      />
      <Drawer.Screen 
        name="Minhas Faltas" 
        component={MinhasFaltas} 
        options={{ title: 'Minhas Faltas' }} 
      />
    </Drawer.Navigator>
  );
}
