import React from "react"
import "./Casa.scss"

export default function Casa() {

    return (
      <div className="cabin-cottage">
        <div className="cabin-left"></div>
        <div className="cabin-cottage-middle">
          <div className="cabin-chimney-div">
            <div className="cabin-smoke"></div>
            <div className="cabin-smoke-middle"></div>
            <div className="cabin-smoke"></div>
            <div className="cabin-chimney"></div>
          </div>
          <div className="cabin-short-log"></div>
          <div className="cabin-medium-log"></div>
          <div className="cabin-window-div">
            <div className="cabin-window-div-side">
              <div className="cabin-short-log"></div>
              <div className="cabin-short-log"></div>
            </div>
            <div className="cabin-window">
              <div className="cabin-window-row">
                <div className="cabin-window-pane"></div>
                <div className="cabin-window-line"></div>
                <div className="cabin-window-pane"></div>
              </div>
              <div className="cabin-window-middle"></div>
              <div className="cabin-window-row">
                <div className="cabin-window-pane"></div>
                <div className="cabin-window-line"></div>
                <div className="cabin-window-pane"></div>
              </div>
            </div>
            <div className="cabin-window-div-side">
              <div className="cabin-short-log"></div>
              <div className="cabin-short-log"></div>
            </div>
          </div>
          <div className="cabin-long-log"></div>
          <div className="cabin-long-log"></div>
          <div className="cabin-door-div">
            <div className="cabin-door-div-side">
              <div className="cabin-short-log"></div>
              <div className="cabin-short-log"></div>
              <div className="cabin-short-log"></div>
            </div>
            <div className="cabin-door">
              <div className="cabin-door-knob"></div>
              <div className="cabin-lock-div">
                <div className="cabin-lock-top"></div>
                <div className="cabin-lock-bottom"></div>
              </div>
            </div>
            <div className="cabin-door-div-side">
              <div className="cabin-short-log"></div>
              <div className="cabin-short-log"></div>
              <div className="cabin-short-log"></div>
            </div>
          </div>
        </div>
        <div className="cabin-right"></div>
      </div>
    );
}