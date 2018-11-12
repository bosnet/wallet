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
    marginBottom: 50,
  },
  textButtonContent: {
    fontSize: 14,
    fontFamily: 'NotoSansKR-Bold',
    color: colors.itemTextPurple,
    borderBottomWidth: 1,
    borderBottomColor: colors.itemTextPurple,
  },

  longButton: {
    height: 54,
    borderRadius: 33,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginVertical: 30,
    marginHorizontal: 48,
  },
  longButtonText: {
    fontSize: 14,
    fontFamily: 'SpoqaHanSans-Bold',
    textAlign: 'center',
  },
  checkBox: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    // justifyContent: 'flex-start',
    marginLeft: 15,
    marginBottom: 20,
  },
  checkArea: {
    // paddingRight: 8.5,
    flexDirection: 'row',
  },
  checkIcon: {
    width: 30,
    height: 30,
    marginRight: 16,
  },
  checkBoxLabel: {
    fontFamily: 'SpoqaHanSans-Regular',
    fontSize: 16,
    lineHeight: 26,
    color: colors.buttonTextGray,
  },

  panelButtonGroup: {
    width: 327,
    height: 42,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.buttonBorderGray,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  pannelButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pannelButtonLong: {
    width: 143,
    alignItems: 'center',
    justifyContent: 'center',
  },
  panelButtonText: {
    fontFamily: 'SpoqaHanSans-Bold',
    fontSize: 14,
    color: colors.buttonTextNavy,
  },
  panelButtonSeperator: {
    height: 24,
    opacity: 0.5,
    width: 1,
    borderLeftWidth: 1,
    borderLeftColor: colors.panelButtonSeperator,
  },

  toggleButton: {
    width: 124,
    height: 44,
  },
});

export default styles;
