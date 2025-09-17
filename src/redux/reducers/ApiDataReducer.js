const initialState = {
  profileData: "",
  isConnected: true,
  form: false,
};



const ApiDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PROFILE_DATA":
      return {
        ...state,
        profileData: action.data
      };
    case "SET_IS_CONNECTED":
      return {
        ...state,
        isConnected: action.isConnected
      };
    case "SHOW_FORM":
      return {
        ...state,
        form: action.form
      };


    default:
      return state;
  }
};

export default ApiDataReducer;








