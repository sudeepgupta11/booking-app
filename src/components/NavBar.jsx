import React from "react";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PublicIcon from "@mui/icons-material/Public";
function NavBar() {
  return (
    <div className="navbar">
      <div className="navbar-heading">Webix Booking App</div>
      <div>
        <InvertColorsIcon className="navbar-icons" />
        <div className="notifications">
          <NotificationsIcon />
          <span className="notification-badge">3</span>
        </div>

        <PublicIcon className="navbar-icons" />
      </div>
    </div>
  );
}

export default NavBar;
