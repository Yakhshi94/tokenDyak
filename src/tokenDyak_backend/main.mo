import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor token {
  var owner : Principal = Principal.fromText("be7s7-pbytr-rgq5k-bgyml-wzmvu-6w7u7-vmqth-si73r-hgz5o-5ey56-tae");
  let totalSupply : Nat = 1000000000;
  let symbol : Text = "DANG";

  private stable var balanceEnteries : [(Principal, Nat)] = [];
  private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
  if (balances.size() < 1) {
    balances.put(owner, totalSupply);
  };

  public query func balanceOf(who : Principal) : async Nat {
    let balance : Nat = switch (balances.get(who)) {
      case null 0;
      case (?result) result;
    };
    return balance;
  };

  public func getSymbol() : async Text {
    return symbol;
  };

  public shared (msg) func payOut() : async Text {
    if (balances.get(msg.caller) == null) {
      let amount : Nat = 10000;
      let result = await transfer(msg.caller, amount);
      return result;
    } else {
      return "Already Claimed";
    };
  };

  public shared (msg) func transfer(to : Principal, amount : Nat) : async Text {
    // let result = await payOut();
    let fromBalance = await balanceOf(msg.caller);
    if (fromBalance > amount) {
      let newFromBalance : Nat = fromBalance - amount;
      balances.put(msg.caller, newFromBalance);

      let toBalance = await balanceOf(to);
      let newToBalance : Nat = toBalance + amount;
      balances.put(to, newToBalance);

      return "success";
    } else {
      return "Insufficient funds";
    };
  };

  system func preupgrade() {
    balanceEnteries := Iter.toArray(balances.entries());
  };

  system func postupgrade() {
    balances := HashMap.fromIter<Principal, Nat>(balanceEnteries.vals(), 1, Principal.equal, Principal.hash);
    if (balances.size() < 1) {
      balances.put(owner, totalSupply);
    };
  };

};
