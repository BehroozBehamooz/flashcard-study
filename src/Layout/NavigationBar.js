import  React from "react";
import { useRouteMatch } from "react-router";
import { Link } from "react-router-dom";

function NavigationBar({ navItems }) {
  const { url } = useRouteMatch();
  return (
    <div>
      <nav className="breadcrumb" aria-label="breadcrumb">
            <Link to="/" className="breadcrumb-item ">
              <span className="oi oi-home mr-1"></span>Home
            </Link>
          {navItems.map((item, index) => (
              index===navItems.length-1 ?
              <Link key={index} className="breadcrumb-item active" to={url}>{item}</Link> :
              <Link key={index} className="breadcrumb-item " to={url}>{item}</Link> 
          ))}
      </nav>
    </div>
  );
}

export default NavigationBar;
