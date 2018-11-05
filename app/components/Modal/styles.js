import { StyleSheet } from 'react-native';
import { colors } from '../../resources';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  homeIntro: {
    flex: 1,
    margin: 0,
  },
  imageNew: {
    position: 'absolute',
    top: 0,
    right: 72 + 12,
    width: 240,
    height: 118,
  },
  imageCombine: {
    position: 'absolute',
    top: 0,
    right: 28 + 13,
    width: 219,
    height: 183,
  },
  imageNewEng: {
    position: 'absolute',
    top: 0,
    right: 72 + 12,
    width: 251,
    height: 152,
  },
  imageCombineEng: {
    position: 'absolute',
    top: 0,
    right: 16 + 13,
    width: 185,
    height: 230,
  },
});

export default styles;
