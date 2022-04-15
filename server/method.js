import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { AddressBookCollection } from "../imports/api/addressBookCollection";

if (Meteor.isServer) {
  Meteor.methods({
    "address.insert"(address) {
      AddressBookCollection.insert(address);
    },
    "address.update"(address) {
      AddressBookCollection.update({ _id: address._id }, { $set: address });
    },
    "address.remove"(address) {
      AddressBookCollection.remove(address);
    },
    "user.register"(username, password) {
      if (!Accounts.findUserByUsername(username)) {
        Accounts.createUser({
          username: username,
          password: password,
        });
      } else {
        throw new Meteor.Error("이미 사용중인 username입니다");
      }
    },
  });
}
