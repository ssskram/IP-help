import * as React from "react";
import Modal from "react-responsive-modal";

type props = {
  closePolicy: () => void;
  acceptPolicy: () => void;
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
      <div style={{ fontSize: "1.3em" }}>
        <h3 className="text-center">Terms of Service for Loaning Equipment</h3>
        <p>
          I understand that it is my responsibility to pick up the equipment,
          and to return it to a staff member of the Innovation and Performance
          (I&P) Help Desk at the end of my borrowing period.
        </p>
        <p>
          I agree to return the equipment to the staff of Help Desk in the same
          condition that it was in when I borrowed it.
        </p>
        <p>
          I understand that there is no charge for use of the equipment.
          However, in the event that the equipment is returned in poor
          condition, lost, stolen or, in the estimation of I&P, irreparable
          damaged during the period that it is signed out in my possession, I
          understand that my department will be charged for any and all costs
          associated with the replacement of the lost/damaged equipment.
        </p>
        <p>
          I will report all equipment malfunctions or problems to the staff of
          the Help Desk.
        </p>
        <p>
          Upon the return of the equipment, a staff member of the Help Desk will
          verify that all equipment pieces/parts have been returned.
        </p>
        <p>I will allow sufficient time for this process.</p>
        <br />
        <button
          style={{ width: "100%" }}
          className="btn btn-primary"
          onClick={() => {
            props.acceptPolicy();
            props.closePolicy();
          }}
        >
          I accept!
        </button>
      </div>
    </Modal>
  );
}
