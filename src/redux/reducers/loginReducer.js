const token = ""

const initialState = {
  // isSplash:tokenssplash,
  token: token || "",
  isLogin: token ? true : false,
  profileData:""
  // OnboardingScreen:false,
  // phoneNumberData:"",
};



const loginReducer = (state = initialState, action) => {

  console.log("sndhvhdsmv",action)

  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
        isLogin: action.token ? true : false,
      }
    default:
      return state;
  }
};

export default loginReducer;








