import React, { Component } from "react";
// import SidebarItem from "./sidebarItem.js";

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar-container">
        <div className="sidebar">
          <h3>Recipes</h3>
          {this.props.children}
        </div>
      </div>
    );
  }
}
export default Sidebar;
