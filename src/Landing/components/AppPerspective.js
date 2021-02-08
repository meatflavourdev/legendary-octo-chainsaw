import React, { useRef } from "react";

const MouseOverContainer = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} id={props.id} className="AppPerspectiveContainer">

    </div>
  )
});

const Ex1Layer = React.forwardRef((props, ref) => {
  return <div ref={ref} id={`${props.id}-layer`} className="AppPerspectiveBox"></div>
});

export default function AppPerspective(props) {
  const constrain = 20;
  const mouseOverContainer = useRef(null);
  const ex1Layer = useRef(null);

  return (
    <></>
  );
}
