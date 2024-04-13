import React from "react";
import { Link } from "react-router-dom";

export default function BreadCrumbs({crumbs}) {
   
    
  return (
    <div className="text-[1.5rem] breadcrumbs">
      <ul>
        {
            crumbs?.map(crumb=>{
                return (
                    <li key={crumb.name}>
                    <Link to={crumb?.href}>{crumb?.name}</Link>
                  </li>
                )
            })
        }
      </ul>
    </div>
  );
}
