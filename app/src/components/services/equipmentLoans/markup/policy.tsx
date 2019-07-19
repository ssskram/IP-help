import * as React from "react";
import Modal from "react-responsive-modal";

type props = {
  closePolicy: () => void;
};

export default function(props: props) {
  return (
    <Modal
      open={true}
      onClose={() => props.closePolicy()}
      classNames={{
        overlay: "custom-overlay",
        modal: "custom-modal"
      }}
      center
    >
      <div>Policy here</div>
    </Modal>
  );
}
