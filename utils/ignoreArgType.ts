const ignoreArgType = (key, Story) => {
  Story.argTypes = {
    ...(Story?.argTypes || {}),
    [key]: {
      table: {
        disable: true,
      },
    },
  };
  return Story;
};

export default ignoreArgType;
