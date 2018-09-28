import React from 'react';
import {
  View, Image,
} from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';


import { colors } from '../../resources';
import { Modal as ModalAction } from '../../actions';
import imgNew from '../../resources/images/homeIntro_new.png';
import imgCombine from '../../resources/images/homeIntro_combine.png';

import { Theme, AppStatusBar } from '../StatusBar';
import { LongButton } from '../Button';
import styles from './styles';


const HomeIntro = ({ isVisible }) => (
  <Modal
    isVisible={isVisible}
    backdropColor={colors.toolbarPurple}
    backdropOpacity={0.9}
    style={styles.homeIntro}
  >
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <AppStatusBar theme={Theme.PURPLE} />
      <Image style={styles.imageNew} source={imgNew} />
      <Image style={styles.imageCombine} source={imgCombine} />
      <LongButton
        text="시작하기"
        backgroundColor={colors.buttonWhite}
        textColor={colors.buttonTextPurple}
        borderColor={colors.white}
        width="auto"
        action={ModalAction.hideModal()}
      />
    </View>
  </Modal>
);

const mapStateToProps = state => ({
  isVisible: state.modal.isModalVisible,
});

export default connect(mapStateToProps)(HomeIntro);
