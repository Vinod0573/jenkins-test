import React, { useEffect, useRef, useState } from "react";
import "./AssignTask.css";
import Dropdown from "react-multilevel-dropdown";
import SideDropdownIcon from "../../assets/projectPageIcon/sideDropdownIcon.svg";
import AssignTaskIcon from "../../assets/projectPageIcon/assignTaskIcon.svg";
import { useSelector } from "react-redux";

const AssignTask = (props) => {
  const conversationName = ["Assign Conversation", "Unassign Conversation"];
  const [assignTaskName, setAssignTaskName] = useState([
    "Auto Assign",
    "Manual",
    "Manual-Unique",
  ]);
  const [unAssignTaskName, setUnAssignTaskName] = useState([
    "Auto Unassign",
    "Manual",
    "Manual-Unique",
  ]);
  useEffect(() => {
    setAssignTaskName(props.assignTaskName);
    setUnAssignTaskName(props.unAssignTaskName);
  }, [props.assignTaskName, props.unAssignTaskName]);
  const [manualNumber, setManualNumber] = useState("");
  const isLoading = useSelector((store) => {
    return store.popUpState.isLoading;
  });

  return (
    <div className="assignTaskDropdown">
      <Dropdown title={<AssignTitle />} position="left">
        {conversationName.map((each1) => (
          <>
            <Dropdown.Item
              className={`dropdownSubClass ${isLoading ? "disabled" : ""}`}
            >
              <p className="dropdownParaDiv">
                <img
                  className="SideDropIcon"
                  src={SideDropdownIcon}
                  alt="SideDropdownIcon"
                />
                <span className="dropdownMainTitleHeading">{each1}</span>
              </p>
              <Dropdown.Submenu>
                {each1 == "Assign Conversation"
                  ? assignTaskName.map((each) => (
                      <Dropdown.Item
                        onClick={() => {
                          if (!isLoading) {
                            props.selectedTask(each1, each);
                          }
                        }}
                        className={isLoading ? "disabled" : ""}
                      >
                        <p className="row-div">
                          <p className="name">
                            <span className="dropdownMainTitleHeading">
                              {each}
                            </span>
                          </p>

                          {each === "Manual" && (
                            <>
                              <div
                                style={{
                                  display: "inline-block",
                                  width: "50%",
                                }}
                              >
                                <input
                                  style={{ width: "50px" }}
                                  onChange={(e) =>
                                    setManualNumber((prev) => e.target.value)
                                  }
                                  disabled={isLoading ? true : false}
                                  type="number"
                                  min="0"
                                  onKeyDown={(e) =>
                                    ["e", "E", "+", "-", "."].includes(e.key) &&
                                    e.preventDefault()
                                  }
                                  onWheel={(e) => {
                                    return e.target.blur();
                                  }}
                                />
                                <div
                                  style={{
                                    display: "inline-block",
                                    marginLeft: "8%",
                                  }}
                                >
                                  <button
                                    className="okBtnInside"
                                    onClick={() => {
                                      if (!isLoading) {
                                        props.manual(manualNumber);
                                      }
                                    }}
                                  >
                                    ok
                                  </button>
                                </div>
                              </div>
                            </>
                          )}
                        </p>
                      </Dropdown.Item>
                    ))
                  : unAssignTaskName.map((each) => (
                      <Dropdown.Item
                        onClick={() => {
                          if (!isLoading) {
                            props.selectedTask(each1, each);
                          }
                        }}
                        className={isLoading ? "disabled" : ""}
                      >
                        <p className="row-div">
                          <p className="name">
                            <span
                              style={{
                                fontFamily: "Roboto",
                                fontSize: "14px",
                                fontWeight: "400",
                              }}
                            >
                              {each}
                            </span>
                          </p>

                          {each == "Manual" && (
                            <>
                              <div
                                style={{
                                  display: "inline-block",
                                  width: "50%",
                                }}
                              >
                                <input
                                  style={{ width: "50px" }}
                                  onChange={(e) =>
                                    setManualNumber((prev) => e.target.value)
                                  }
                                  disabled={isLoading ? true : false}
                                  type="number"
                                  min="0"
                                  onKeyDown={(e) =>
                                    ["e", "E", "+", "-", "."].includes(e.key) &&
                                    e.preventDefault()
                                  }
                                  onWheel={(e) => {
                                    return e.target.blur();
                                  }}
                                />
                                <div
                                  style={{
                                    display: "inline-block",
                                    marginLeft: "8%",
                                  }}
                                >
                                  <button
                                    className="okBtnInside"
                                    onClick={() => {
                                      if (!isLoading) {
                                        props.manual(manualNumber);
                                      }
                                    }}
                                  >
                                    ok
                                  </button>
                                </div>
                              </div>
                            </>
                          )}
                        </p>
                        {/* <span
                          style={{
                            fontFamily: "Roboto",
                            fontSize: "14px",
                            fontWeight: "400",
                          }}
                        >
                          {each}
                        </span> */}
                      </Dropdown.Item>
                    ))}
              </Dropdown.Submenu>
            </Dropdown.Item>
          </>
        ))}
      </Dropdown>
    </div>
  );
};

const AssignTitle = () => {
  return (
    <div className="assignTitletopClass">
      <img className="filterIcon" src={AssignTaskIcon} alt="Assign Task" />
      <span
        style={{
          fontFamily: "Roboto",
          fontSize: "18px",
          fontWeight: "500",
          paddingLeft: "15px",
        }}
      >
        Assign Task
      </span>
    </div>
  );
};

export default AssignTask;
