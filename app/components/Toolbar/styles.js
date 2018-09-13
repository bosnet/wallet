import { StyleSheet } from 'react-native';
import { colors } from '../../resources';

const styles = StyleSheet.create({
  toolbarHome: {
    flexDirection: 'row',
    height: 40,
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
  toolbarElement: {
    justifyContent: 'center',
  },
  // HomeToolbar 구성요소
  logoImage: {
    width: 102,
    height: 17,
    marginLeft: 25,
  },
  actionGroup: {
    width: 108,
    height: 32,
    padding: 1,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionIcon: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.testBkg, // For Debug
  },
  IconIn: {
    width: 26,
    height: 22,
    paddingVertical: 4,
    paddingLeft: 1,
    paddingRight: 3,
  },
  Icon: {
    padding: 4,
    width: 22,
    height: 22,
  },
});

export default styles;
