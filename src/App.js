import { Grid } from "@mui/material";
import { createContext, useReducer } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import SearchDetails from "./components/SearchDetails";
import CustomizedTables from "./components/Table";
import { reducer } from "./reducer";
import { flightDetails } from "./data";
export const AppContext = createContext(null);
function App() {
  const [state, dispatch] = useReducer(reducer, {
    expanded: false,
    selectedButton: "Offers",
    flightSearchData: {
      trip: "",
      from: "",
      to: "",
      departure: "",
      adults: 0,
      children: 0,
    },
    isError: false,
    filteredFlightData: flightDetails,
    flightData: flightDetails,
  });

  return (
    <div className="App">
      <AppContext.Provider value={{ state: state, dispatch: dispatch }}>
        <NavBar />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <SearchDetails />
          </Grid>
          <Grid item xs={8}>
            <CustomizedTables />
          </Grid>
        </Grid>
      </AppContext.Provider>
    </div>
  );
}

export default App;
