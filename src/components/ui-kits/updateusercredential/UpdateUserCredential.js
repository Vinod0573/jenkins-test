import React, { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL, ONBOARDING_URL } from "../../../utilities/ApiRoutes";
import { decrypt } from "../../../utilities/deCrypt.js";
import Button from "../Button/button";
import ErrorMessage from "../../error/ErrorMessage";

import UserCredentialForm from "../userform/UserCredentialForm";
import {
  emailValidation,
  passwordValidation,
  nameValidation,
} from "../../../utilities/Validation";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./UpdateUserCredential.css";

const UpdateUserCredential = (props) => {
  const [userToUpdateData, setToUserUpdateData] = useState();

  const [newUserUpdatedData, setNewUserUpdatedData] = useState();

  const [isError, setIsError] = useState();

  useEffect(() => {
    if (props.userToUpdateData) {
      const decryptPassword = decrypt(props.userToUpdateData?.password);
      const temp = decryptPassword;

      setToUserUpdateData((previousState) => {
        return {
          ...props?.userToUpdateData,
          password: temp,
        };
      });
      setNewUserUpdatedData((previousState) => props?.userToUpdateData);
    }
  }, [props.userToUpdateData]);

  useEffect(() => {
    setIsError((previousState) => isError);
  }, [isError]);

  // To update user api
  const postingUpdatedData = async () => {
    const updateUserUrl = SERVER_URL + ONBOARDING_URL.UPDATE_USER_DATA;
    const token = await sessionStorage.getItem("token");
    const id = await sessionStorage.getItem("Id");
    const isCheckName = await nameValidation(newUserUpdatedData?.name);
    if (!isCheckName.isValid) {
      const temp = isCheckName.errors.message;
      setIsError((previousState) => temp);
      return;
    }
    const isCheckEmail = await emailValidation(newUserUpdatedData?.email);
    if (!isCheckEmail.isValid) {
      const temp = isCheckEmail.errors.message;
      setIsError((previousState) => temp);
      return;
    }
    const isCheckPassword = await passwordValidation(
      newUserUpdatedData?.password
    );
    if (!isCheckPassword.isValid) {
      const temp = isCheckPassword.errors.message;
      setIsError((previousState) => temp);

      return;
    }
    if (!newUserUpdatedData?.role) {
      setIsError((previousState) => "Please select the role");
      return;
    }
    let data = {
      isActive: userToUpdateData?.isActive,
      language: newUserUpdatedData?.language,
      name: newUserUpdatedData?.name,
      password: newUserUpdatedData?.password,
      role: newUserUpdatedData?.role,
      id: newUserUpdatedData?._id,
      // email:newUserUpdatedData?.email
    };

    await axios
      .post(updateUserUrl, data, {
        headers: {
          "x-access-token": token,
          userId: id,
        },
      })
      .then((res) => {
        if (res.request.statusText === "OK") {
          // props.handleClickCreateUser(true);
          // props.handleClickCreateUser(false);
          props.handleClickCancelUpdateModel();
          props.toApiUpdate((prev) => !prev);
          toast.success("User updated successfully!");
        }
      })
      .catch((e) => {
        toast.error("User Updation not successfull");

        // alert(e);
      });
  };

  // To update data
  const toGetUpdatededData = (value) => {
    const temp = value;
    setNewUserUpdatedData((previousState) => value);
  };

  // To summit all user
  const handleSummitUpdateDetails = () => {
    postingUpdatedData();
  };

  // To cancel update user form
  const handleClickCancelUpdating = () => {
    props.handleClickCancelUpdateModel();
  };

  return (
    <>
      <div className="updateUserFormTopDiv">
        <div className="updateUserFormArea">
          <UserCredentialForm
            userToUpdateData={userToUpdateData}
            updatededData={(value) => {
              toGetUpdatededData(value);
            }}
            disable={true}
          />
          <div style={{ marginTop: "40px" }}>
            {isError && (
              <ErrorMessage
                errorMessage={isError}
                extraClass={"extraErrorMessageClassName"}
              />
            )}
          </div>
        </div>

        <div className="updateAndCancelButtonDiv">
          <div className="updateUserButton">
            <Button
              text="Update Details"
              extraClass="updateButtonStyle"
              onClick={() => handleSummitUpdateDetails()}
            />
          </div>
          <div className="createUserButton">
            <Button
              text=" Cancel "
              extraClass="cancelButtonStyle"
              onClick={() => handleClickCancelUpdating()}
            />
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        type="success"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={false}
        draggable={false}
        rtl={false}
      />
    </>
  );
};

export default UpdateUserCredential;
