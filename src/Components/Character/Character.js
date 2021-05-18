import React from "react";
import "./Character.scss";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";

function Character(props) {
  return (
    <div className="character">
      <div className="hair">
        <div className="clump"></div>
        <div className="strand-zero"></div>
        <div className="strand-one"></div>
        <div className="strand-two"></div>
        <div className="strand-three"></div>
        <div className="strand-four"></div>
        <div className="strand-five"></div>
        <div className="strand-six"></div>
        <div className="strand-seven"></div>
        <div className="strand-eight"></div>
        <div className="strand-nine"></div>
        <div className="strand-ten"></div>
      </div>
      <div className="head">
        <div className="left-ear">
          <div className="left-ear-hole"></div>
        </div>
        <div className="face">
          <div className="eyes">
            <div className="eye">
              <div className="iris">
                <div className="pupil"></div>
              </div>
            </div>
            <div className="eye">
              <div className="iris">
                <div className="pupil"></div>
              </div>
            </div>
          </div>
          <div className="nose"></div>
          <div className="mouth"></div>
        </div>
        <div className="right-ear">
          <div className="right-ear-hole"></div>
        </div>
      </div>
      <div className="body">
        <div className="neck"></div>
        <div className="arms">
          <div className="left-arm">
            <div className="hand"></div>
          </div>
          <div className="right-arm">
            <div className="hand"></div>
          </div>
        </div>
        <div className="torso"></div>
        <div className="legs">
          <div className="left-leg">
            <div className="foot"></div>
          </div>
          <div className="right-leg">
            <div className="foot"></div>
          </div>
        </div>
        <h3>{props.user.user.name}</h3>
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser })(Character);
