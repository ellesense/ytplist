import React from "react";
import { connect } from "react-redux";

function Alert(props) {
  return (
    <>
      {props.alerts !== null &&
        props.alerts.length > 0 &&
        props.alerts.map((alert) => (
          <div key={alert.id} className="">
            {alert.msg}
          </div>
        ))}
    </>
  );
}

const mapStateToProps = (state) => ({
  alerts: state.alertReducer,
});

export default connect(mapStateToProps)(Alert);
