import React from "react";
import { cn } from "../../libs/utils";

export default function Toast({title,className}) {
  return (
    <div className="toast">
      <div className={cn("alert alert-error",className)}>
        <span>{title}</span>
      </div>
    </div>
  );
}
