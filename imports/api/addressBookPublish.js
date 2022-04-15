import { Meteor } from "meteor/meteor";
import { AddressBookCollection } from "./addressBookCollection";

Meteor.publish("addressBook", () => {
  const userId = Meteor.userId();

  if (userId) {
    return AddressBookCollection.find({ owner: userId });
  }
});
