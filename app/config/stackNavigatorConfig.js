const stackNavigatorConfig = {
  transitionConfig: () => ({
    screenInterpolator: (sceneProps) => {
      const {
        position, layout, scene,
      } = sceneProps;
      const thisSceneIndex = scene.index;
      const width = layout.initWidth;

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [width, 0, 0],
      });

      const slideFromRight = { transform: [{ translateX }] };

      if (scene.route.routeName === 'QRScan') return null;
      return slideFromRight;
    },
    containerStyle: { backgroundColor: 'transparent' },
  }),
};

export default stackNavigatorConfig;
