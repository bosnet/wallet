import { StyleSheet } from 'react-native';
import { colors } from '../../resources';

const styles = StyleSheet.create({
  bottomArea: {
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  bottomButton: {
    flex: 5,
    height: 64,
    backgroundColor: colors.buttonPurple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomButtonText: {
    fontSize: 14,
    color: colors.buttonTextWhite,
    fontFamily: 'NotoSansKR-Bold',
  },
  bottonSubButton: {
    flex: 3,
    height: 64,
    backgroundColor: colors.buttonGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSubButtonText: {
    fontSize: 14,
    color: colors.buttonTextBlue,
    fontFamily: 'NotoSansKR-Bold',
  },
  buttonGroup: {
    width: 315,
    paddingLeft: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingBottom: 24,
    marginTop: 25,
    marginBottom: 10,
  },
  inactive: {
    opacity: 0.5,
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

  textButton: {
    alignSelf: 'flex-start',
    marginLeft: 32,
  },
  textButtonContent: {
    fontSize: 14,
    fontFamily: 'NotoSansKR-Bold',
    color: colors.itemTextPurple,
    borderBottomWidth: 1,
    borderBottomColor: colors.itemTextPurple,
  },

  longButton: {
    width: 280,
    height: 54,
    borderRadius: 33,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
  },
  longButtonText: {
    fontSize: 14,
    fontFamily: 'SpoqaHanSans-Bold',
    textAlign: 'center',
  },
  checkBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: 315,
    marginBottom: 20,
  },
  checkArea: {
    paddingRight: 8.5,
  },
  checkIcon: {
    width: 30,
    height: 30,
  },
  checkBoxLabel: {
    fontFamily: 'SpoqaHanSans-Regular',
    fontSize: 16,
    lineHeight: 26,
    color: colors.buttonTextGray,
  },
});

export default styles;
