const ctrlWrapper = ctrl => {
  const fn = async (req, res, next) => {
    try {
      await ctrl(req, res);
    } catch (error) {
      next(error);
    }
  };
  return fn;
};

module.exports = ctrlWrapper;
