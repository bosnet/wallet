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

import imgNewEng from '../../resources/images/homeIntro_new_eng.png';
import imgCombineEng from '../../resources/images/homeIntro_combine_eng.png';


import { Theme, AppStatusBar } from '../StatusBar';
import { LongButton } from '../Button';
import styles from './styles';
import strings from '../../resources/strings';

const icon = {
  ko: {
    imgNew,
    imgCombine,
  },
  eng: {
    imgNew: imgNewEng,
    imgCombine: imgCombineEng,
  },
};

const HomeIntro = ({ isVisible, settings }) => {
  const Strings = strings[settings.language].ComponentText;
  return (
    <Modal
      isVisible={isVisible}
      backdropColor={colors.toolbarPurple}
      backdropOpacity={0.9}
      style={styles.homeIntro}
    >
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <AppStatusBar theme={Theme.PURPLE} />
        <Image style={(settings.language === 'ko') ? styles.imageNew : styles.imageNewEng} source={icon[settings.language].imgNew} />
        <Image style={(settings.language === 'ko') ? styles.imageCombine : styles.imageCombineEng} source={icon[settings.language].imgCombine} />
        <LongButton
          text={Strings.HOMEINTRO_MODAL_BUTTON}
          backgroundColor={colors.buttonWhite}
          textColor={colors.buttonTextPurple}
          borderColor={colors.white}
          width="auto"
          action={ModalAction.hideModal()}
        />
      </View>
    </Modal>
  );
};

const mapStateToProps = state => ({
  isVisible: state.modal.isModalVisible,
  settings: state.settings,
});

export default connect(mapStateToProps)(HomeIntro);
