const asyncHandler = (requestHandler) => {
  async (req, res, next) => {
    try {
      await requestHandler(req, res, next);
    } catch (err) {
      res.status(err.code || 5000).json({
        success: false,
        message: err.message,
      });
    }
  };
};
export { asyncHandler };
