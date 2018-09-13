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
    flex: 1,
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
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    alignSelf: 'flex-end',
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

  // DefaultToolbar 구성요소
  toolbarDefault: {
    flexDirection: 'row',
    height: 45,
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  whiteToolbar: {
    backgroundColor: colors.toolbarWhite,
  },
  purpleToolbar: {
    backgroundColor: colors.toolbarPurple,
  },
  centerElement: {
    alignItems: 'center',
  },
  leftElement: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  rightElement: {
    alignItems: 'flex-end',
  },
  centerTitle: {
    textAlign: 'center',
    fontSize: 17,
    paddingBottom: 6,
  },
  backArea: {
    marginLeft: 5,
    paddingVertical: 11,
    paddingHorizontal: 8,
  },
  backArrow: {
    width: 16,
    height: 22,
  },
  noBackMargin: {

  },
  leftTitle: {
    fontSize: 17,
    letterSpacing: -0.41,
    paddingBottom: 5,
  },
  actionArea: {
    paddingHorizontal: 14,
    paddingBottom: 13,
    paddingTop: 10,
  },
  actionText: {
    fontSize: 15,
  },
  navyText: {
    color: colors.toolbarTextNavy,
  },
  whiteText: {
    color: colors.toolbarTextWhite,
  },
});

export default styles;
