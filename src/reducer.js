export const reducer = (state, action) => {
  switch (action.type) {
    case "Expand":
      return { ...state, expanded: action.value };
    case "ChangeButton":
      return { ...state, selectedButton: action.value };
    case "IncrementAdult": {
      let flightSearchData = state.flightSearchData;
      flightSearchData = {
        ...flightSearchData,
        adults: flightSearchData.adults + 1,
      };
      return { ...state, flightSearchData: flightSearchData };
    }
    case "DecrementAdult": {
      let flightSearchData = state.flightSearchData;
      flightSearchData = {
        ...flightSearchData,
        adults: flightSearchData.adults === 0 ? 0 : flightSearchData.adults - 1,
      };
      return { ...state, flightSearchData: flightSearchData };
    }
    case "IncrementChildren": {
      let flightSearchData = state.flightSearchData;
      flightSearchData = {
        ...flightSearchData,
        children: flightSearchData.children + 1,
      };
      return { ...state, flightSearchData: flightSearchData };
    }

    case "DecrementChildren": {
      let flightSearchData = state.flightSearchData;
      flightSearchData = {
        ...flightSearchData,
        children:
          flightSearchData.children === 0 ? 0 : flightSearchData.children - 1,
      };
      return { ...state, flightSearchData: flightSearchData };
    }
    case "InputChange": {
      let flightSearchData = state.flightSearchData;
      flightSearchData[action.field] = action.value;
      return { ...state, flightSearchData: flightSearchData };
    }
    case "UpdateFlightData": {
      return { ...state, filteredFlightData: action.value };
    }
    case "ErrorInFlightSearchData": {
      return { ...state, isError: true };
    }
    case "NoErrorInFlightSearchData": {
      return { ...state, isError: false };
    }
    default:
      return state;
  }
};
