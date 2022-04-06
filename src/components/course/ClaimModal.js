import { Modal } from "antd";
import React from "react";
import "./ClaimModal.css";

const ClaimModal = ({ show, setShow }) => {
  return (
    <Modal
      title="Choose your reward"
      visible={show}
      footer={null}
      onCancel={() => setShow(false)}
    >
      <div className="modal-claim-token">
        <div className="card-claim-border w-40">
          <div className="card-claim-content">
            <h2>POAP</h2>
            <p>
              This way you'll get a link and get your poap! You don't have to
              pay any fee.
            </p>
          </div>
        </div>
        <div className="card-claim-border w-40">
          <div className="card-claim-content">
            <h2>NTT</h2>
            <p>
              This way you'll get an non-transferible token! You have to pay a
              few fee
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ClaimModal;
