import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    marginBottom: 20,
  },
  rowDirection: {
    flexDirection: 'row',
  },
  sectionList: {
    alignSelf: 'stretch',
    marginLeft: 24,
  },
  sectionHeader: {
    paddingTop: 10,
    marginLeft: 8,
    fontSize: 12,
    color: '#ef7952',
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
    borderBottomColor: '#c8c7cccc',

  },
  itemText: {
    fontSize: 14,
    color: '#030303',

  },
  itemArrow: {
    width: 8,
    height: 14,
    marginRight: 16,
    paddingBottom: 2,
  },
  textItemData: {
    fontSize: 12,
    letterSpacing: -0.34,
    marginRight: 15,
    color: '#6770cb',
    textAlign: 'right',
  },
});

export default styles;
