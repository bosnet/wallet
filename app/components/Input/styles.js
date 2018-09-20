import { StyleSheet } from 'react-native';
import { colors } from '../../resources';

const styles = StyleSheet.create({
  input: {
    width: 315,
    borderBottomWidth: 2,
    borderBottomColor: colors.listSeperatorGray,
    marginBottom: 10,
    marginLeft: 2,
  },
  inputTitle: {
    flex: 1,
    color: colors.textAreaTitleGray,
    fontSize: 16,
    marginTop: 15,
    marginBottom: 8,
    marginLeft: 2,
    fontFamily: 'SpoqaHanSans-Regular',
  },
  inputArea: {
    flexDirection: 'row',
  },
  inputHead: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  inputSupport: {
    paddingVertical: 10,
    paddingHorizontal: 2,
  },
  supportButton: {
    width: 20,
    height: 20,
  },
  areaOption: {
    alignSelf: 'flex-end',
    marginRight: 8,
  },
  optionIcon: {
    width: 24,
    height: 24,
    marginBottom: 8,
  },
  inputText: {
    flex: 1,
    color: colors.textAreaContentsGray,
    fontSize: 16,
    borderBottomWidth: 0,
    fontFamily: 'SpoqaHanSans-Regular',
  },
});

export default styles;
