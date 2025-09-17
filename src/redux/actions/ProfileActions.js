export const ProfileActions = (data) => {
  return { type: "SET_PROFILE_DATA", data };
};


export const InternetAction = (isConnected) => {
  return { type: "SET_IS_CONNECTED", isConnected };
};

//SHOW_FORM
export const setForm = (isFormVisiable) => {
  return { type: "SHOW_FORM", isFormVisiable };
};