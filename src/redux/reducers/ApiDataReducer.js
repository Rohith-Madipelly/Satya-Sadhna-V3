const initialState = {
  profileData: "",
  isConnected: true,
  flatData: "",
  blockData: "",
  buildingData: "",
  role: "",
};



const ApiDataReducer = (state = initialState, action) => {
  switch (action.type) {

    case "SET_ROLE": {
      return {
        ...state,
        role: action.data
      };
    }
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

    case "SELECT_FLAT_DATA":
      return {
        ...state,
        flatData: action.data
      };

    case "SELECT_BLOCK_DATA":
      return {
        ...state,
        blockData: action.data
      };

    case "SELECT_BUILDING_DATA":
      return {
        ...state,
        buildingData: action.data
      };
    default:
      return state;
  }
};

export default ApiDataReducer;








