const calculateAge = (birthYear, deathYear) => {
  const currentYear = new Date().getFullYear();
  return deathYear ? deathYear - birthYear : currentYear - birthYear;
};

export default calculateAge;
