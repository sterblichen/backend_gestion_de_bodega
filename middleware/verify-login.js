const validatorSchema = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    const customError = new Error(
      error.issues.map((e) => e.message).join(", "),
    );
    customError.statusCode = 400;
    next(customError);
  }
};

module.exports = {
  validatorSchema,
};
