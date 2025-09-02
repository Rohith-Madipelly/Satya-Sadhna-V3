import AsyncStorage from '@react-native-async-storage/async-storage';


var AsyncStorage_Calls = function () { };

AsyncStorage_Calls.prototype.setAsyncValue = function (key, value, callBack) {

                if(key=="role"){
        console.log("Heroooo callBack seting",value)
    }

    AsyncStorage.setItem('MyflatInfo$:' + key, JSON.stringify(value), (err) => {
        if (err) {
            callBack('Error setting token', false);
        }
        else {
            callBack(null, true);
        }
    });
};


AsyncStorage_Calls.prototype.getAsyncValue = function (key, callBack) {
    AsyncStorage.getItem('MyflatInfo$:' + key, (err, result) => {
        if (err) {
            callBack('Error getting token', null);
        } else {
            let dataSender=JSON.parse(result)
            try {
                if (dataSender != null) {
                    dataSender = dataSender.replaceAll('"', '');
                }
            }
            catch (err) {
                console.log("Error in token quotes", err)
                if (err.response.status === 500) {
                    console.log("Internal Server Error", err.message)
                }
            }
        
            callBack(null, result ? dataSender : null);
            // callBack(null, result ? JSON.parse(result) : null);
        }
    });
};






AsyncStorage_Calls.prototype.RemoveAsyncValue = function (key, callBack) {
    AsyncStorage.removeItem('MyflatInfo$:' + key, (err) => {
        if (err) {
            callBack('Error removing token', false);
        } else {
            callBack(null, true);
            // console.log("Token removed successfully");
        }
    });
};

export default new AsyncStorage_Calls();
