const updateData = (state = [], action) => {
  switch (action.type) {
    case "UPDATE":
      let newData = action.payload.results;
      let alldata = state.concat(newData);
      return (state = alldata);
    default:
      return state;
  }
};

export default updateData;
