import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { createTheme } from "@mui/material/styles";
import { AppContext } from "./../App";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#efefef",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function CustomizedTables() {
  const { state, dispatch } = useContext(AppContext);
  const buttonData = [
    { id: 1, name: "Offers" },
    { id: 2, name: "Regular" },
    { id: 3, name: "Info" },
  ];
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <>
      <div className="flights-header">
        <div className="flights">Flights</div>
        <div className="flights-button-div">
          {buttonData.map((item) => (
            <button
              key={item.id}
              className={
                state.selectedButton === item.name
                  ? "flights-button selected"
                  : "flights-button"
              }
              onClick={() => {
                dispatch({ type: "ChangeButton", value: item.name });
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
      {state.filteredFlightData.length === 0 ? (
        <div className="no-flights">!! No Flights Available !!</div>
      ) : (
        <TableContainer component={Paper} className="table-wrapper">
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>#</StyledTableCell>
                <StyledTableCell>Direction</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Time</StyledTableCell>
                <StyledTableCell>Price</StyledTableCell>
                <StyledTableCell>You save</StyledTableCell>
                <StyledTableCell>Tickets</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.filteredFlightData.map((row, index) => (
                <TableRow key={index}>
                  <StyledTableCell>{index + 1}</StyledTableCell>

                  <StyledTableCell>
                    {capitalizeFirstLetter(row.from)} -{" "}
                    {capitalizeFirstLetter(row.to)}
                  </StyledTableCell>
                  <StyledTableCell>{row.date}</StyledTableCell>
                  <StyledTableCell>
                    {row.time}
                    {"->"}
                    {row.time}
                  </StyledTableCell>
                  <StyledTableCell>{`$${row.price}`}</StyledTableCell>
                  <StyledTableCell>{`$${row.save}`}</StyledTableCell>
                  <StyledTableCell>{row.tickets}</StyledTableCell>
                  <StyledTableCell>
                    <ul
                      className={
                        row.status === "open"
                          ? "bullet-green"
                          : row.status === "available soon"
                          ? "bullet-blue"
                          : "bullet-red"
                      }
                    >
                      <li>{capitalizeFirstLetter(row.status)}</li>
                    </ul>
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
