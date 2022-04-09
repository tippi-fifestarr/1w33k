import { Modal, notification } from "antd";
import React from "react";
import "./ClaimModal.css";
import { useMoralisQuery, useMoralis } from "react-moralis";
import Loading from "../global/Loading";
const ClaimModal = ({ show, setShow }) => {
  const { user } = useMoralis();
  const { fetch, isFetching } = useMoralisQuery(
    "poapLink",
    (query) => query.equalTo("available", true),
    [],
    { autoFetch: false }
  );
  const claimPoap = async () => {
    let data = await fetch();
    if (data.length > 0) {
      let url = data[0].get("link");
      data[0].set("ethAddress", user.get("ethAddress"));
      data[0].set("dateClaimed", new Date());
      data[0].set("available", false);
      await data[0].save();
      window.open(url, "_blank").focus();
      setShow(false);
    } else {
      notification.error({
        message: "There is not link available",
      });
    }
  };
  return (
    <>
      {isFetching && <Loading />}
      <Modal
        title="Choose your reward"
        visible={show}
        footer={null}
        onCancel={() => setShow(false)}
      >
        <div className="modal-claim-token">
          <div className="card-claim-border w-40">
            <div className="card-claim-content" onClick={claimPoap}>
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
    </>
  );
};

export default ClaimModal;
