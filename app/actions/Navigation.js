const Navigation = {
  Screens: {
    HOME: 'Home',
    SETTINGS: 'Settings',
    MEMBERSHIP: 'Membership',
  },
  NAV_PUSH: 'NAV_PUSH',
  NAV_POP: 'NAV_POP',
};

Navigation.pushScreen = screenName => ({
  type: 'NAV_PUSH',
  routeName: screenName,
});

Navigation.popScreen = () => ({
  type: Navigation.NAV_POP,
});


export default Navigation;
