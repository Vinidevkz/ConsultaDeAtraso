import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

import Home from './pages/home.js'
import MinhasFaltas from './pages/faltas.js'

export default function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName={Home}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Minhas Faltas" component={MinhasFaltas} />
    </Drawer.Navigator>
  );
}