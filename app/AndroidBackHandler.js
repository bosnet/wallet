import React from 'react';
import { connect } from 'react-redux';
import { BackHandler } from 'react-native';
import PropTypes from 'prop-types';

import { Navigation } from './actions';

class AndroidBackHandler extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lastPress: 0,
    };
  }

  componentDidMount() {
    this.sub = BackHandler.addEventListener(
      'backPress',
      () => this.onBackPress(),
    );
  }

  componentWillUnmount() {
    this.sub.remove();
  }

  onBackPress() {
    let result = true;
    const { lastPress } = this.state;

    const { navigation, goBack } = this.props;
    if (navigation.index > 0) {
      this.setState({
        lastPress: 0,
      });
      goBack();
    } else {
      const delta = new Date().getTime() - lastPress;

      if (delta < 300) {
        result = false;
      }
      this.setState({
        lastPress: new Date().getTime(),
      });
    }

    return result;
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

AndroidBackHandler.propTypes = {
  children: PropTypes.element.isRequired,
  goBack: PropTypes.func.isRequired,
  navigation: PropTypes.shape({ index: PropTypes.number }).isRequired,

};

const mapStateToProps = state => ({ navigation: state.navigation });

const mapDispatchToProps = dispatch => ({
  goBack: () => dispatch(Navigation.popScreen()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AndroidBackHandler);
