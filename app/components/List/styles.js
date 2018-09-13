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
});

export default styles;
