import React, { useState } from "react";
import CreateAccountModal from "../../components/createAccountModal/CreateAccountModal";
import Account from "../account/Account";
import "./CreateAccount.css";
import { useHistory } from "react-router-dom";

function CreateAccount(props: any) {
  const history = useHistory();
  let role = window.sessionStorage.getItem("role");

  if (role === "Data Annotator" || role === "Quality Analyst") {
    history.push("/assignedproject");
  }

  const [accountCreationPage, setAccountCreationPage] = useState(true);
  const tosetNextPage = () => {
    setAccountCreationPage((prev) => false);
  };

  const toPrevPage = (data: boolean) => {
    setAccountCreationPage((prev) => data);
  };

  const closeModal = () => {
    props.closeAccount();
  };
  return (
    <div>
      {accountCreationPage ? (
        <div className="childDiv createAccount-outerdiv">
          <div className="ModalConatainer">
            <CreateAccountModal
              Icon={props.Icon}
              Name={props.Name}
              callForNext={tosetNextPage}
              onCancel={() => closeModal()}
            />
          </div>
        </div>
      ) : (
        <Account toprevPage={toPrevPage} />
      )}
    </div>
  );
}

export default CreateAccount;
