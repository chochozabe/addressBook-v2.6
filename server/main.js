import { Meteor } from "meteor/meteor";
import { AddressBookCollection } from "../imports/api/addressBookCollection";
import { fixtures } from "./fixture";
import "./method";
import "../imports/api/addressBookPublish";

function insertAddress(address) {
  AddressBookCollection.insert(address);
}

Meteor.startup(() => {
  if (AddressBookCollection.find().count() === 0) {
    console.log("데이터가 존재하지 않습니다. fixture 데이터를 입력합니다. ");
    for (let i = 0, len = fixtures.length; i < len; i++) {
      insertAddress(fixtures[i]);
    }
  }
});
