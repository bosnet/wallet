import { StyleSheet } from 'react-native';
import { colors } from '../../resources';

const styles = StyleSheet.create({
  itemList: {
    alignSelf: 'stretch',
    marginLeft: 24,
  },

  listItem: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 54,
    paddingLeft: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.listSeperatorGray,

  },
  itemText: {
    fontSize: 14,
    color: colors.itemTextBlack,
    fontFamily: 'SpoqaHanSans-Regular',
  },
  itemArrow: {
    width: 8,
    height: 14,
    marginRight: 16,
    paddingBottom: 2,
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
    height: 24,
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
    flex: 1,
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
});

export default styles;
