import { StyleSheet } from 'react-native';
import { colors } from '../../resources';

const styles = StyleSheet.create({
  alertPanel: {
    paddingBottom: 40,
    justifyContent: 'center',
  },
  alertIcon: {
    width: 90,
    height: 90,
    margin: 15,
    alignSelf: 'center',
  },
  alertText: {
    marginTop: 5,
    fontFamily: 'SpoqaHanSans-Regular',
    textAlign: 'center',
    fontSize: 20,
    color: colors.alertTextBlack,
    width: 315,
  },
  alertTextBold: {
    marginTop: 0,
    fontFamily: 'SpoqaHanSans-Bold',
    textAlign: 'center',
    fontSize: 20,
    color: colors.alertTextBlack,
    width: 315,
  },

  notiPanel: {
    position: 'relative',
    marginBottom: 30,
    marginHorizontal: 30,
    width: 315,
  },
  notiText: {
    fontSize: 12,
    lineHeight: 18,
    paddingBottom: 6,
    color: colors.textAreaNotiTextGray,
    fontFamily: 'SpoqaHanSans-Regular',
  },

  infoPanel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 30,
  },

  info: {
    width: 98,
  },

  infoIcon: {
    width: 73,
    height: 38,
    alignSelf: 'center',
    resizeMode: 'contain',
    margin: 9.5,
  },
  infoText: {
    textAlign: 'center',
    justifyContent: 'flex-end',
    color: colors.infoTextBlack,
    height: 48,
    fontSize: 16,
  },

  addressPanel: {
    width: 327,
    height: 96,
    alignSelf: 'center',
    borderRadius: 6,
    backgroundColor: colors.panelBkgPurble,
    marginTop: 30,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addressPanelTitle: {
    marginTop: 20,
    marginLeft: 25,
    fontSize: 16,
    color: colors.panelTextWhite,
  },
  addressPanelContents: {
    color: colors.panelTextWhite,
    alignSelf: 'flex-end',
    marginBottom: -16 + 25, /* font 자체에 하단 여백 있어 -값 추가 */
    marginRight: 25,
  },
  addressSubTextNum: {
    fontSize: 36,
    fontFamily: 'SpoqaHanSans-Regular',
  },
  addressSubTextStr: {
    fontSize: 16,
    fontFamily: 'SpoqaHanSans-Bold',
  },

  qrPanel: {
    width: 163,
    height: 163,
    margin: 30,
  },

  balancePanel: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
  },
  balanceTitle: {
    marginTop: 18,
    fontFamily: 'SpoqaHanSans-Bold',
    fontSize: 16,
    opacity: 0.6,
    marginLeft: 2,
  },
  balanceContents: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
    marginBottom: 25,
  },
  balance: {
    fontFamily: 'SpoqaHanSans-Bold',
    fontSize: 22,
    paddingHorizontal: 3,
    textAlignVertical: 'center',
    textAlign: 'right',
  },
  balanceUnit: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 10,
    paddingHorizontal: 3,
    textAlignVertical: 'center',
    textAlign: 'right',
  },

});

export default styles;
