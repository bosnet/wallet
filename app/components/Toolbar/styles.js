import { StyleSheet } from 'react-native';
import { colors } from '../../res/index';

const styles = StyleSheet.create({
  homeToolbar: {
    backgroundColor: colors.toolbarWhite,
    height: 45,
    alignSelf: 'stretch',
  },
  whiteToolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    backgroundColor: colors.toolbarWhite,
  },
  whiteToolbarBack: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 11,
  },
  whiteToolbarBackImage: {
    width: 16,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
  },
  whiteToolbarTitle: {
    flex: 1,
  },
  whiteToolbarTitleText: {
    letterSpacing: -0.41,
    fontSize: 17,
    color: colors.toolbarTitleNavy,
    fontFamily: 'SpoqaHanSans-Regular',
  },
  purpleToolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    backgroundColor: colors.toolbarPurple,
  },
  purpleToolbarTitle: {
    marginLeft: 8,
    flex: 1,
  },
  purpleToolbarTitleText: {
    letterSpacing: -0.41,
    fontSize: 17,
    textAlign: 'center',
    color: colors.toolbarTitleWhite,
    fontFamily: 'SpoqaHanSans-Regular',
  },
  purpleToolbarBackText: {
    fontSize: 15,
    color: colors.toolbarTitleWhite,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontFamily: 'SpoqaHanSans-Regular',
  },
});

export default styles;
