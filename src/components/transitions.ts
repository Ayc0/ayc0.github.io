const getTransitionName = (name: string) => {
  return name.replace(/[^a-zA-Z0-9]+/g, "_");
};

export const getTransitionStyle = (name: string) => {
  const transitionName = getTransitionName(name);
  return { style: { viewTransitionName: transitionName } };
};
