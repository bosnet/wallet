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

      return slideFromRight;
    },
  }),
};

export default stackNavigatorConfig;
