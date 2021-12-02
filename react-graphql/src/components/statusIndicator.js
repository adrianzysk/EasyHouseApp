import React from "react";
import 'status-indicator/styles.css'
const Indicator = props => {
  let { istrue } = props;
  if (istrue === true) {
    return (<status-indicator positive pulse></status-indicator>);
  } else {
    return (<status-indicator negative pulse></status-indicator>);
  }
};
export default Indicator;