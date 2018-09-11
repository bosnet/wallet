import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topArea: {
    height: 65,
  },
  defaultLayout: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },

  sectionList: {
    marginLeft: 16,
    alignSelf: 'stretch',
  },
  sectionTitle: {
    paddingTop: 9,
    paddingLeft: 16,
    fontSize: 12,
    color: '#ef7952',
  },
  listItem: {
    height: 54,
  },
  itemText: {
    paddingLeft: 16,
    fontSize: 14,
  },
});

export default styles;
