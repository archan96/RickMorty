import { combineReducers } from "redux";
import updateData from "./updateData";
const allReducers = combineReducers({
    data: fetchData
  });
  
  export default allReducers;
  