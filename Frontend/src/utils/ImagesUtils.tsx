export const imgCompanyUrl = (companyName: string) => {
  return new URL(`${"../assets"}/img/${companyName}.png`, import.meta.url).href;
};

export const imgStudentProfile = (name: string) => {
  return new URL(`${"../assets"}/students/${name}`, import.meta.url).href;
};
