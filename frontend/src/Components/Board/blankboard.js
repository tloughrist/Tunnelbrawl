import React from "react";

export default function BlankBoard() {

  return (
    <div id="playing_field">
      <div className="board"> 
        <div className="row" id="row_1">
          <div className="space empty space--empty highlight--none side--left top" />
          <div className={"space space--green top highlight--none"} id={"12"} />
          <div className={"space space--green top highlight--none"} id={"13"} />
          <div className={"space space--green top highlight--none"} id={"14"} />
          <div className={"space space--green top highlight--none"} id={"15"} />
          <div className="space empty space--empty highlight--none side--right top" />
        </div>
        <div className="row" id="row_2">
          <div className={"space space--red side--left highlight--none"} id={"21"} />
          <div className={"space empty highlight--none"} id={"22"} />
          <div className={"space empty highlight--none"} id={"23"} />
          <div className={"space empty highlight--none"} id={"24"} />
          <div className={"space empty highlight--none"} id={"25"} />
          <div className={"space space--blue side--right highlight--none"} id={"26"} />
        </div>
        <div className="row" id="row_3">
          <div className={"space space--red side--left highlight--none"} id={"31"} />
          <div className={"space empty highlight--none"} id={"32"} />
          <div className={"space empty highlight--none"} id={"33"} />
          <div className={"space empty highlight--none"} id={"34"} />
          <div className={"space empty highlight--none"} id={"35"} />
          <div className={"space space--blue side--right highlight--none"} id={"36"} />
        </div>
        <div className="row" id="row_4">
          <div className={"space space--red side--left highlight--none"} id={"41"} />
          <div className={"space empty highlight--none"} id={"42"} />
          <div className={"space empty highlight--none"} id={"43"} />
          <div className={"space empty highlight--none"} id={"44"} />
          <div className={"space empty highlight--none"} id={"45"} />
          <div className={"space space--blue side--right highlight--none"} id={"46"} />
        </div>
        <div className="row" id="row_5">
          <div className={"space space--red side--left highlight--none"} id={"51"} />
          <div className={"space empty highlight--none"} id={"52"} />
          <div className={"space empty highlight--none"} id={"53"} />
          <div className={"space empty highlight--none"} id={"54"} />
          <div className={"space empty highlight--none"} id={"55"} />
          <div className={"space space--blue side--right highlight--none"} id={"56"} />
        </div>
        <div className="row" id="row_6">
          <div className="space empty space--empty highlight--none side--left bottom" />
          <div className={"space space--yellow bottom highlight--none"} id={"62"} />
          <div className={"space space--yellow bottom highlight--none"} id={"63"} />
          <div className={"space space--yellow bottom highlight--none"} id={"64"} />
          <div className={"space space--yellow bottom highlight--none"} id={"65"} />
          <div className="space empty space--empty highlight--none side--right bottom" />
        </div>
      </div>
    </div>
  );
};