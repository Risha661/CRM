const generateRandomId = () => {
  return new Date().getTime().toString('14');
};

export {generateRandomId};
