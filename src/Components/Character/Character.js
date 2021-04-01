import React from "react"
import "./Character.scss"
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";

function Character(props) {


return (
    <div className="character">
        <div className="face">
            <div className="eyes">
                <div className="eye"></div>
                <div className="eye"></div>
            </div>
            <div className="nose"></div>
            <div className="mouth"></div>
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
)
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser })(Character);