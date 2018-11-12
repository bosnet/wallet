import React from 'react';
import {
  ScrollView, View, Alert,
  ToastAndroid, BackHandler,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import styles from '../styles';
import strings from '../../resources/strings';

import { colors, types } from '../../resources';
import { Modal as ModalAction, Accounts as AccountsAction, Navigation as NavAction } from '../../actions';
import { retrieveAccount } from '../../libs/Transactions';

import { Theme, AppStatusBar } from '../../components/StatusBar';
import { HomeToolbar } from '../../components/Toolbar';
import { LoadingPanel } from '../../components/Panel';
import { ItemList } from '../../components/List';
import { BalanceArea } from '../../components/Text';
import { HomeIntro } from '../../components/Modal';
import AndroidBackHandler from '../../AndroidBackHandler';

import imgNew from '../../resources/images/homeIntro_new.png';
import imgCombine from '../../resources/images/homeIntro_combine.png';

import imgNewEng from '../../resources/images/homeIntro_new_eng.png';
import imgCombineEng from '../../resources/images/homeIntro_combine_eng.png';
import { LongButton } from '../../components/Button';


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

class Tutorial extends React.Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;

    this.state = {
      list: [],
      isLoaded: false,
      isLoading: false,
      totalBalance: '0',
    };
  }

  render() {
    const { isLoaded, isLoading, totalBalance } = this.state;
    const { updateFlag, updateFlags, isVisible, settings } = this.props;
    const Strings = strings[settings.language].Home;

    return (
      <View style={styles.container}>
        <AppStatusBar theme={Theme.PURPLE} />
        <HomeToolbar />
        <View style={[styles.container]}>
          <BalanceArea
            label="TOTAL BALANCE"
            lableColor={colors.itemTextLightGray}
            text={totalBalance}
            textColor={colors.textAreaContentsNavy}
          />
          <ScrollView
            contentContainerStyle={styles.alignCenter}
            showsVerticalScrollIndicator={false}
          >
            <ItemList
              listType={types.ListType.FLAT}
              listData={{
                data: [],
              }}
              noDataText={
                Strings.WALLET_EMPTY
              }
            />
          </ScrollView>
        </View>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            justifyContent: 'center',
            backgroundColor: colors.toolbarPurple,
            opacity: 0.9,
          }}
        >
          <Image style={(settings.language === 'ko') ? styles.imageNew : styles.imageNewEng} source={icon[settings.language].imgNew} />
          <Image style={(settings.language === 'ko') ? styles.imageCombine : styles.imageCombineEng} source={icon[settings.language].imgCombine} />
          <LongButton
            text={Strings.Tutorial.BUTTON_TEXT}
            backgroundColor={colors.buttonWhite}
            textColor={colors.buttonTextPurple}
            borderColor={colors.white}
            width="auto"
            action={NavAction.resetScreen(NavAction.Screens.HOME)}
          />
        </View>
        <AndroidBackHandler
          action={NavAction.resetScreen(NavAction.Screens.HOME)}
        />
      </View>
    );
  }
}

Tutorial.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Tutorial);
