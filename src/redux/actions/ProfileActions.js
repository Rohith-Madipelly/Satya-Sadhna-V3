export const ProfileActions = (data) => {
  return { type: "SET_PROFILE_DATA", data };
};


export const InternetAction = (isConnected) => {
  return { type: "SET_IS_CONNECTED", isConnected };
};




export const setRoleAction = (data) => {
  return { type: "SET_ROLE", data };
}

// Actions to set flat, block, building data 
export const setFlatDataAction = (data) => {
  return { type: "SELECT_FLAT_DATA", data };
};


export const setBlockDataAction = (data) => {
  return { type: "SELECT_BLOCK_DATA", data };
};


export const setBuildingDataAction = (data) => {
  console.log("SetUpCheck",data)
  return { type: "SELECT_BUILDING_DATA", data };
};