import { StyleSheet } from 'react-native';
import { colors } from '../../resources';

const styles = StyleSheet.create({
  itemList: {
    alignSelf: 'stretch',
    marginLeft: 24,
    // height: 'auto',
  },

  listItem: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 54,
    paddingLeft: 8,
    marginRight: 24,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.listSeperatorGray,

  },
  rowDirection: {
    flexDirection: 'row',
  },
  itemText: {
    fontSize: 14,
    fontFamily: 'SpoqaHanSans-Regular',
  },
  itemArrow: {
    width: 8,
    height: 14,
    marginRight: 16,
    paddingBottom: 2,
  },
  itemMove: {
    width: 22,
    height: 9,
    marginRight: 30,
    padding: 5,
    marginBottom: 6,
  },
  sectionHeader: {
    paddingTop: 10,
    marginLeft: 8,
    fontSize: 12,
    color: colors.listLabelOrange,
    fontFamily: 'SpoqaHanSans-Regular',
  },
  sectionFotter: {
    marginBottom: 20,
  },
  transactionItem: {
    borderBottomColor: colors.buttonBorderGray,
    borderBottomWidth: 1,
    marginRight: 30,
    marginBottom: 25,
  },
  transactionTitle: {
    marginLeft: 2,
    fontFamily: 'SpoqaHanSans-Regular',
    fontSize: 12,
    color: colors.itemTextOrange,
    marginBottom: 5,
    height: 18,
  },
  transactionAccount: {
    marginLeft: 2,
    fontFamily: 'SpoqaHanSans-Regular',
    fontSize: 16,
    color: colors.itemTextGray,
    alignSelf: 'stretch',
    backgroundColor: colors.testBkg,
  },
  transactionDate: {
    marginLeft: 2,
    fontFamily: 'SpoqaHanSans-Regular',
    fontSize: 12,
    color: colors.itemTextLightGray,
    height: 18,
  },
  transactionAccountArea: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    marginTop: 5,
    marginBottom: 8,
  },
  transactionAmount: {
    marginVertical: 6,
    fontFamily: 'SpoqaHanSans-Regular',
    fontSize: 22,
    alignSelf: 'center',
    textAlignVertical: 'center',
    marginHorizontal: 3,
  },
  transactionUnit: {
    fontFamily: 'SpoqaHanSans-Bold',
    alignSelf: 'center',
    fontSize: 10,
    height: 15,
    textAlignVertical: 'center',
    marginHorizontal: 3,
  },

  accountItem: {
    marginRight: 24,
    height: 94,
    borderBottomColor: colors.buttonBorderGray,
    borderBottomWidth: 1,
    marginBottom: 9,
  },
  addressItem: {
    marginLeft: -24,
    minHeight: 120,
  },
  accountName: {
    fontFamily: 'SpoqaHanSans-Regular',
    fontSize: 16,
    color: colors.itemTextLightGray,
  },
  accoutnItemHead: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 26,
  },
  accountIcon: {
    width: 53,
    height: 24,
  },
  accountFreezing: {
    fontFamily: 'SpoqaHanSans-Bold',
    fontSize: 10,
    color: colors.itemTextDarkGray,
  },
  accountItemContent: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 33,
  },
  accountBalance: {
    fontSize: 22,
    fontFamily: 'SpoqaHanSans-Regular',
    color: colors.itemTextDarkGray,
    marginHorizontal: 3,
  },
  accountUnit: {
    fontSize: 10,
    fontFamily: 'SpoqaHanSans-Bold',
    color: colors.itemTextDarkGray,
    paddingRight: 6,
    marginLeft: 3,
  },

  optionTextItem: {
    fontSize: 14,
    color: colors.itemTextBlack,
    fontFamily: 'SpoqaHanSans-Regular',
  },
  optionTextItemData: {
    fontSize: 12,
    letterSpacing: -0.34,
    marginRight: 15,
    color: colors.itemTextBlue,
    textAlign: 'right',
    fontFamily: 'SpoqaHanSans-Regular',
  },

  itemToggle: {
    width: 124,
    height: 44,
  },

  exLinkIcon: {
    width: 18,
    height: 18,
    marginRight: 15,
  },
});

export default styles;
