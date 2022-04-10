import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useContext } from "react";
import { AppContext } from "./../App";
import Flights from "./LookForFlight";
import NoDetails from "./NoDetails";

const cardData = [
  { id: 1, summary: "Look for a Flight", description: Flights },
  { id: 2, summary: "Hotels", description: NoDetails },
  { id: 3, summary: "Cars", description: NoDetails },
  { id: 4, summary: "Register", description: NoDetails },
];

function SearchDetails() {
  const { state, dispatch } = useContext(AppContext);
  const handleExpansion = (panel) => (event, isExpanded) => {
    dispatch({ type: "Expand", value: isExpanded ? panel : false });
  };

  return (
    <div>
      {cardData.map((item) => (
        <Accordion
          key={item.id}
          expanded={state.expanded === `panel${item.id}`}
          onChange={handleExpansion(`panel${item.id}`)}
          className="accordian-list"
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                className={
                  state.expanded !== `panel${item.id}` && "not-expanded"
                }
              />
            }
            className={
              state.expanded === `panel${item.id}` ? "expanded" : "not-expanded"
            }
          >
            {item.summary}
          </AccordionSummary>
          <AccordionDetails>{<item.description />}</AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default SearchDetails;
