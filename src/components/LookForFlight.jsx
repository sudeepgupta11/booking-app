import React, { useContext } from "react";
import { Grid, Alert } from "@mui/material";
import { cityData } from "../data";
import { AppContext } from "../App";
function Flights() {
  const { state, dispatch } = useContext(AppContext);

  const handleCountChange = (field, type) => {
    if (field === "adults") {
      if (type === "increment") {
        dispatch({ type: "IncrementAdult" });
      } else {
        dispatch({ type: "DecrementAdult" });
      }
    } else {
      if (type === "increment") {
        dispatch({ type: "IncrementChildren" });
      } else {
        dispatch({ type: "DecrementChildren" });
      }
    }
  };
  const minDate = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }

    today = yyyy + "-" + mm + "-" + dd;
    return today;
  };
  const handleSearch = () => {
    var filteredArray = [];
    const { trip, from, to, departure, adults, children } =
      state.flightSearchData;
    if (
      trip !== "" &&
      from !== "" &&
      to !== "" &&
      departure !== "" &&
      adults > 0 &&
      children > 0 &&
      from !== to
    ) {
      dispatch({ type: "NoErrorInFlightSearchData" });
      if (trip === "oneway") {
        filteredArray = state.flightData.filter((item) => {
          let dateArray = item.date.split("-");
          let date = dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0];

          if (
            item.from.toLowerCase() === from.toLowerCase() &&
            item.to.toLowerCase() === to.toLowerCase() &&
            new Date(date).getTime() === new Date(departure).getTime() &&
            item.tickets >= adults + children
          ) {
            return item;
          }

          return null;
        });
      } else if (trip === "return") {
        filteredArray = state.flightData.filter((item) => {
          let dateArray = item.date.split("-");
          let date = dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0];

          if (
            ((item.from.toLowerCase() === from.toLowerCase() &&
              item.to.toLowerCase() === to.toLowerCase()) ||
              (item.from.toLowerCase() === to.toLowerCase() &&
                item.to.toLowerCase() === from.toLowerCase())) &&
            new Date(date).getTime() === new Date(departure).getTime() &&
            item.tickets >= adults + children
          )
            return item;

          return null;
        });
      }
      dispatch({ type: "UpdateFlightData", value: filteredArray });
    } else {
      dispatch({ type: "ErrorInFlightSearchData" });
    }
  };
  const handleInputChange = (field) => (event) => {
    dispatch({ type: "InputChange", value: event.target.value, field: field });
  };
  return (
    <div>
      <Grid container spacing={1.5}>
        <Grid item xs={3} className="input-labels">
          Trip
        </Grid>
        <Grid item xs={8}>
          <Grid container>
            <Grid item xs={4}>
              <input
                type="radio"
                value="oneway"
                name="trip"
                onClick={handleInputChange("trip")}
              />
              <span>One-Way</span>
            </Grid>

            <Grid item xs={4}>
              <input
                type="radio"
                value="return"
                name="trip"
                onClick={handleInputChange("trip")}
              />
              <span>Return</span>
            </Grid>
            <Grid item xs={2} />
          </Grid>
        </Grid>
        <Grid item xs={3} className="input-labels">
          From
        </Grid>
        <Grid item xs={8}>
          <select
            name="from"
            className="select-labels"
            onChange={handleInputChange("from")}
            defaultValue={""}
          >
            <option value="" className="disabled-option" disabled>
              Select departure point
            </option>
            {cityData.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Grid>
        <Grid item xs={3} className="input-labels">
          To
        </Grid>
        <Grid item xs={8}>
          <select
            name="to"
            className="select-labels"
            onChange={handleInputChange("to")}
            defaultValue={""}
          >
            <option value="" className="disabled-option" disabled>
              Select destination
            </option>
            {cityData.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Grid>
        <Grid item xs={3} className="input-labels">
          Departure
        </Grid>
        <Grid item xs={8}>
          <input
            type="date"
            name="departure"
            className="date-labels"
            onChange={handleInputChange("departure")}
            min={minDate()}
          />
        </Grid>
        <Grid item xs={3} className="input-labels">
          Adults
        </Grid>
        <Grid item xs={8}>
          <div className="counter">
            <button
              className="counter-button"
              onClick={() => {
                handleCountChange("adults", "decrement");
              }}
            >
              -
            </button>
            <span className="counter-span">
              {state.flightSearchData.adults}
            </span>
            <button
              className="counter-button"
              onClick={() => {
                handleCountChange("adults", "increment");
              }}
            >
              +
            </button>
          </div>
        </Grid>
        <Grid item xs={3} className="input-labels">
          Children
        </Grid>
        <Grid item xs={8}>
          <div className="counter">
            <button
              className="counter-button"
              onClick={() => {
                handleCountChange("children", "decrement");
              }}
            >
              -
            </button>
            <span className="counter-span">
              {state.flightSearchData.children}
            </span>
            <button
              className="counter-button"
              onClick={() => {
                handleCountChange("children", "increment");
              }}
            >
              +
            </button>
          </div>
        </Grid>
        {state.isError && (
          <Grid item xs={12}>
            <Alert severity="error">
              Please fill all the fields. <br /> From City should not be same as
              To City.
            </Alert>
          </Grid>
        )}
        <Grid item xs={12}>
          <button onClick={handleSearch} className="search-now">
            Search Now
          </button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Flights;
