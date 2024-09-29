const validator = require("validator");

const userValidationSignup = (userData) => {
  const { firstName, lastName, emailId, password } = userData;

  if (!firstName || !lastName) {
    throw new Error("Name is not correct!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid!!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("PassWord is not valid!!");
  }
};

const validateEditProfileData = (req) => {
  const usercanUpdate = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "skills",
    "photoUrl",
    "about",
  ];
  let validate = Object.keys(req.body).every((field) => {
    return usercanUpdate.includes(field);
  });
  return validate;
};
module.exports = {
  userValidationSignup,
  validateEditProfileData,
};
