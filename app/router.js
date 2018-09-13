import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/Settings';
import MembershipScreen from './screens/Settings/MembershipScreen';
import TestScreen from './screens/TestScreen';

const router = {
  Home: { screen: HomeScreen },
  Settings: { screen: SettingsScreen },
  Membership: { screen: MembershipScreen },

  Test: { screen: TestScreen },
};

export default router;
