import {useState} from "react";
import { Principal } from "@dfinity/principal";
import { tokenDyak_backend } from "../../../declarations/tokenDyak_backend";

function Transfer() {
  let [amount, setAmount] = useState("");
  let [recepientId, setId] = useState("");

  async function handleClick() {
    let reciepient = Principal.fromText(recepientId);
    let transferAmount = Number(amount);
    await tokenDyak_backend.transfer(reciepient, transferAmount);  
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={recepientId}
                onChange={(e) => setId(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} >
            Transfer
          </button>
        </p>
      </div>
    </div>
  );
}

export default Transfer;
