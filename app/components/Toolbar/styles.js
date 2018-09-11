import { StyleSheet } from 'react-native';
import colors from '../../res/colors';

const styles = StyleSheet.create({
  homeToolbar: {
    backgroundColor: colors.white,
    height: 45,
    alignSelf: 'stretch',
  },
  whiteToolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    height: 45,
    backgroundColor: colors.white,
  },
  whiteToolbarBack: {
    width: 16,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#F00',
  },
  whiteToolbarTitle: {
    marginLeft: 8,
    flex: 1,
    // backgroundColor: 'blue',
  },
  whiteToolbarTitleText: {
    letterSpacing: -0.41,
    fontSize: 17,
    color: colors.navy,
  },
});

export default styles;
