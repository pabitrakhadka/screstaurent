// generateOpt.js
const generateRandom4DigitNumber = () => {
  const randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  return randomNumber;
};

module.exports = generateRandom4DigitNumber;