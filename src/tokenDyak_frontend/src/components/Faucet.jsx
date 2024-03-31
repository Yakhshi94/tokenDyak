import React, { useState } from "react";
import { tokenDyak_backend, canisterId, createActor } from "../../../declarations/tokenDyak_backend";
import { AuthClient } from "@dfinity/auth-client";


function Faucet() {

    let [isDisabled, setDisabled] = useState(false);
    let [btnText, setBtnText] = useState('Gimme gimme');

  async function handleClick(event) {
    setDisabled(true);

    const authClient = await AuthClient.create();
    const identity = authClient.getIdentity();

    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });

    const result = await authenticatedCanister.payOut();
    setBtnText(result);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free DAngela tokens here! Claim 10,000 DANG coins to your account.</label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled={isDisabled}>
          {btnText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
