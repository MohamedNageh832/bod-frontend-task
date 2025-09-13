export const clear = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
