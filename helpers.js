import bcrypt from "bcryptjs";

const helpers = {};

helpers.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  return hash;
};

helpers.matchPassword = async (userPassword, savedPassword) => {
  try {
    return await bcrypt.compare(userPassword, savedPassword);
  } catch (error) {
    console.log(error);
  }
};

export default helpers;
