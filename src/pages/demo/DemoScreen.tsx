import { useEffect, useState } from "react";
import DemoUpladModal from "./UploadModal/DemoUploadModal";
import Modal from "../../components/ui-kits/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { DemoState } from "../../reducers/demo/Demo.interface";
import AnnotatorDemo from "./AnnotatorDemo/AnnotatorDemo";
import { ToastContainer } from "react-toastify";
import { demoReset } from "../../reducers/demo/Demo.action";
import MessageCardDemo from "./AnnotatorDemo/components/messageCardDemo/MessageCardDemo";
import ConversationCardWrapper from "./AnnotatorDemo/components/conversation/ConversationCardWrapper";

export default function DemoScreen() {
  const state: DemoState = useSelector((state: any) => {
    return state.demoReducer;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(demoReset());
    };
  }, []);
  return (
    <>
      {state.state === "UPLOAD" ? (
        <Modal
          children={<DemoUpladModal />}
          shown={true}
          close={undefined}
          extraClassStyleModalBackDrop={undefined}
          extraClassStyleModalContent={undefined}
        ></Modal>
      ) : (
        <AnnotatorDemo />
      )}
      {/* <ConversationCardWrapper
        messages={[
          {
            type: "left",
            component: (
              <MessageCardDemo
                message={"How was the"}
                startTime={0}
                endTime={0}
                type={"left"}
              />
            ),
          },
          {
            type: "right",
            component: (
              <MessageCardDemo
                message={"Hellow "}
                startTime={0}
                endTime={0}
                type={"right"}
              />
            ),
          },
        ]}
      /> */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={false}
        draggable={false}
        rtl={false}
      />
    </>
  );
}
