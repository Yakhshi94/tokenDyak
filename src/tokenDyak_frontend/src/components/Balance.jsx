import React from "react";
import { useState } from "react";

import { Principal } from "@dfinity/principal";
import { tokenDyak_backend } from "../../../declarations/tokenDyak_backend";


function Balance() {
  let [balanceResult, setBalance] = useState();
  let [principal, setPrincipal] = useState("");
  let [symbol, setSymbol] = useState("");
  let [isHidden, setHidden] = useState(true);

  async function handleClick() {
    setSymbol(await tokenDyak_backend.getSymbol());
    let principalId = Principal.fromText(principal);
    let balance = await tokenDyak_backend.balanceOf(principalId);
    setBalance(balance.toLocaleString());
    setHidden(false);
  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p hidden={isHidden}>This account has a balance of ${balanceResult} ${symbol}.</p>
    </div>
  );
}

export default Balance;
