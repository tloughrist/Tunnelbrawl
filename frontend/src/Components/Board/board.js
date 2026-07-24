import React from "react";
import Space from './space.js';

export default function Board() {

  return (
    <div className="board"> 
      <div className="row" id="row_1">
        <div className="space empty space--empty highlight--none side--left top" />
        <Space color={"space--green top"} id={"12"} />
        <Space color={"space--green top"} id={"13"} />
        <Space color={"space--green top"} id={"14"} />
        <Space color={"space--green top"} id={"15"} />
        <div className="space empty space--empty highlight--none side--right top" />
      </div>
      <div className="row" id="row_2">
        <Space color={"space--red side--left"} id={"21"} />
        <Space color={"empty"} id={"22"} />
        <Space color={"empty"} id={"23"} />
        <Space color={"empty"} id={"24"} />
        <Space color={"empty"} id={"25"} />
        <Space color={"space--blue side--right"} id={"26"} />
      </div>
      <div className="row" id="row_3">
        <Space color={"space--red side--left"} id={"31"} />
        <Space color={"empty"} id={"32"} />
        <Space color={"empty"} id={"33"} />
        <Space color={"empty"} id={"34"} />
        <Space color={"empty"} id={"35"} />
        <Space color={"space--blue side--right"} id={"36"} />
      </div>
      <div className="row" id="row_4">
        <Space color={"space--red side--left"} id={"41"} />
        <Space color={"empty"} id={"42"} />
        <Space color={"empty"} id={"43"} />
        <Space color={"empty"} id={"44"} />
        <Space color={"empty"} id={"45"} />
        <Space color={"space--blue side--right"} id={"46"} />
      </div>
      <div className="row" id="row_5">
        <Space color={"space--red side--left"} id={"51"} />
        <Space color={"empty"} id={"52"} />
        <Space color={"empty"} id={"53"} />
        <Space color={"empty"} id={"54"} />
        <Space color={"empty"} id={"55"} />
        <Space color={"space--blue side--right"} id={"56"} />
      </div>
      <div className="row" id="row_6">
        <div className="space empty space--empty highlight--none side--left bottom" />
        <Space color={"space--yellow bottom"} id={"62"} />
        <Space color={"space--yellow bottom"} id={"63"} />
        <Space color={"space--yellow bottom"} id={"64"} />
        <Space color={"space--yellow bottom"} id={"65"} />
        <div className="space empty space--empty highlight--none side--right bottom" />
      </div>
    </div>
  );
};