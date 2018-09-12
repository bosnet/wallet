import { StyleSheet } from 'react-native';
import { colors } from '../../res/index';

const styles = StyleSheet.create({
  bottomButton: {
    height: 64,
    backgroundColor: colors.buttonPurble,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomButtonText: {
    fontSize: 14,
    color: colors.buttonTextWhite,
    fontFamily: 'NotoSansKR-Bold',
  },

  buttonGroup: {
    width: 315,
    height: 105,
    paddingLeft: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  iconButton: {
    width: 58,
    height: 71,
    paddingTop: 15,
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconText: {
    marginTop: 8,
    fontSize: 12,
    color: colors.buttonTextNavy,
  },
});

export default styles;
