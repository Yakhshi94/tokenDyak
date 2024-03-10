import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";

actor token {
  var owner: Principal = Principal.fromText("be7s7-pbytr-rgq5k-bgyml-wzmvu-6w7u7-vmqth-si73r-hgz5o-5ey56-tae");
  let totalSupply: Nat = 1000000000;
  let symbol: Text = "DANG";
  var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
  balances.put(owner,totalSupply);
  
  public query func balanceOf(who: Principal) : async Nat {
    let balance : Nat = switch (balances.get(who)){
      case null 0;
      case (?result) result;
    };
    return balance;
  };

  public func getSymbol(): async Text {
    return symbol;
  };

};