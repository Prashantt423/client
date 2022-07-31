import React, { useEffect, useRef, useState } from "react";
import "./chats.css";
import "react-chat-widget/lib/styles.css";
import { connect } from "react-redux";
import { Widget, addResponseMessage } from "react-chat-widget";
import { useLocation } from "react-router-dom";
import Popup from "reactjs-popup";
import profile_avatar from "../../assets/replace2.png";
import svg from "../../assets/favicon.ico";
import "reactjs-popup/dist/index.css";
let activePeople = [
  {
    id: "1",
    name: "Amitabh bachhan",
    sex: "m",
    img: "",
  },
  {
    id: "2",
    name: "Nana patekar",
    sex: "m",
    img: "",
  },
];
function Chats(props) {
  const { state } = useLocation();
  const [welcomeMsg, setWelcomeMsg] = useState();
  const scrollRef = useRef();
  const [isRoleAssigned, setIsRoleAssigned] = useState(false);
  const [buttonValue, setButtonValue] = useState("Click! Me");
  const [msg, setMsg] = useState("");
  const findUnique = (people, activePeople) => {
    if (activePeople.length === 0) return people;
    const id_to_acive_people_map = {};
    activePeople.forEach((e) => (id_to_acive_people_map[e.id] = e));
    return people.filter((e) => !Boolean(id_to_acive_people_map[e.id]));
  };
  const choseRandomly = (toBeAssignedPeople) => {
    // get random index value
    const randomIndex = Math.floor(Math.random() * toBeAssignedPeople.length);
    // get random item
    const item = toBeAssignedPeople[randomIndex];
    return item;
  };
  const assignRole = async () => {
    const people = state.chatData.people;
    const toBeAssignedPeople = findUnique(people, activePeople);
    if (!Boolean(toBeAssignedPeople)) return;
    const newRole = choseRandomly(toBeAssignedPeople);
    if (!Boolean(newRole)) return;
    props.dispatch({ type: "cur_role", value: newRole });
    return newRole;
  };

  useEffect(() => {
    addResponseMessage("Welcome to this **roleplay** chat!");
    return () => {
      // Anything in here is fired on component unmount.
      props.dispatch({ type: "cur_role", value: {} });
      window.location.reload();
    };
  }, []);

  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
  };

  const handleRoleRequest = async () => {
    props.dispatch({ type: "fetching_role", value: true });
    const role = await assignRole();
    props.dispatch({ type: "fetching_role", value: false });
    setIsRoleAssigned(true);
    let salutation = "";
    salutation = role.sex === "m" ? "Mr" : "Mrs";
    setMsg(
      <>
        <h2 style={{ textAlign: "center" }}>
          "Welcome to this **Roleplay** chat!" &nbsp;
          <strong style={{ color: "red" }}>
            {salutation + " " + role.name}
          </strong>
        </h2>
        <h3>Click! on the Message icon to start the group chat.</h3>
      </>
    );
  };
  // useEffect(() => {
  //   scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  // }, [props.messages]);
  // it auto scrolls into view.

  return (
    <div className="chatBox">
      <>
        <div className="chat_welcome">
          {!isRoleAssigned && (
            <>
              <h1 style={{ textAlign: "center" }}>
                Welcome! to the RolePlay Chat
              </h1>
              <div>
                <button onClick={handleRoleRequest}>{buttonValue}</button>{" "}
                &nbsp; for getting a role
              </div>
            </>
          )}

          {isRoleAssigned && <>{msg}</>}
        </div>
      </>
      <>
        {Object.keys(state).length > 0 && isRoleAssigned && (
          <Widget
            handleNewUserMessage={handleNewUserMessage}
            title={state.chatData.title}
            subtitle={"You are " + props.cur_role.name + " now...Have fun :) "}
            showTimeStamp={true}
          />
        )}
      </>
    </div>
  );
}

const mapStateToProps = (state) => ({
  cur_role: state.cur_role,
});

export default connect(mapStateToProps)(Chats);
