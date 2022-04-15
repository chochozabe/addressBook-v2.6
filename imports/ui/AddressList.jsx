import { Meteor } from "meteor/meteor";
import React, { useRef, useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { check } from "meteor/check";
import { AddressBookCollection } from "../api/addressBookCollection";
import {
  NotEmptyString,
  EmailString,
  PhoneString,
  BirthdayString,
} from "../api/checkPatterns";
import { AddressInput } from "./AddressInput";
import { AddressListItem } from "./AddressListItem";
import { LoginForm } from "./LoginForm";

export const AddressList = () => {
  const defaultCount = 30;
  const [count, setCount] = useState(defaultCount);
  const [editId, setEditId] = useState();
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const target = useRef();

  const user = useTracker(() => Meteor.user());
  const logout = () => Meteor.logout();

  const addressBookList = useTracker(() => {
    const handler = Meteor.subscribe("addressBook");

    if (handler.ready()) {
      setIsLoading(false);
      console.log("현재 count : " + count);
      const cnt = AddressBookCollection.find({}).count();
      setTotalCount(cnt);

      return AddressBookCollection.find(
        {},
        { limit: count, sort: { name: 1 } },
      ).fetch();
    } else {
      return [];
    }
  }, [count]);

  const vaildAddr = (address) => {
    check(address.name, NotEmptyString);
    check(address.phone, PhoneString);
    check(address.email, EmailString);
    check(address.company, NotEmptyString);
    check(address.birthday, BirthdayString);
  };

  const handleSubmit = (newAddr, type) => {
    try {
      vaildAddr(newAddr);
    } catch (err) {
      alert("입력값을 다시 확인해주세요\nerror message : " + err);
      return;
    }

    const address = { ...newAddr, owner: Meteor.userId() };

    if (type === "insert") {
      Meteor.call("address.insert", address);
    } else if (type === "update") {
      Meteor.call("address.update", address);
      setEditId("");
    }
  };

  const handleCount = () => {
    if (totalCount !== 0) {
      if (count + defaultCount < totalCount) {
        setCount((prev) => prev + 30);
      } else {
        setCount(totalCount);
      }
    }
  };

  const observer = (node) => {
    if (isLoading) return;
    if (target.current) target.current.disconnect();

    target.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        handleCount();
      }
    });

    node && target.current.observe(node);
  };

  return user ? (
    <>
      <div>
        <span style={{ fontSize: "20pt" }} onClick={logout}>
          {user.username} 님
        </span>
        <span style={{ color: "gray" }}>
          {" [ Username 클릭 시 로그아웃 ]"}
        </span>
      </div>
      <AddressInput handleSubmit={handleSubmit} />
      <p>전체 갯수 : {totalCount}</p>
      <table className="table table-bordered table-condensed table-striped table-hover">
        <thead>
          <tr className="info">
            <th>이름</th>
            <th>전화번호</th>
            <th>이메일</th>
            <th>회사</th>
            <th>생일</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {addressBookList.map((address, idx) => {
            return (
              <AddressListItem
                key={idx}
                address={address}
                editId={editId}
                setEditId={setEditId}
                handleSubmit={handleSubmit}
              />
            );
          })}
        </tbody>
      </table>
      {count !== totalCount ? (
        <div align="center" ref={observer}>
          <button name="more" className="btn btn-primary" onClick={handleCount}>
            <i className="glyphicon glyphicon-arrow-down"></i>
            더보기
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  ) : (
    <LoginForm />
  );
};
