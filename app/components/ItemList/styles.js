import { StyleSheet } from 'react-native';
import { colors } from '../../res/index';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    marginBottom: 20,
  },
  rowDirection: {
    flexDirection: 'row',
  },
  itemList: {
    alignSelf: 'stretch',
    marginLeft: 24,
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
  itemToggle: {
    width: 124,
    height: 44,
  },
  textItemData: {
    fontSize: 12,
    letterSpacing: -0.34,
    marginRight: 15,
    color: colors.itemTextBlue,
    textAlign: 'right',
    fontFamily: 'SpoqaHanSans-Regular',
  },
});

export default styles;
