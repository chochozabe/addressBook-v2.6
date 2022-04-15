import { Meteor } from "meteor/meteor";
import React, { useState } from "react";

export const AddressListItem = (props) => {
  const { address, editId, setEditId, handleSubmit } = props;
  const [editAddr, setEditAddr] = useState(address);

  const handleInput = (e) => {
    let tmpAddr = { ...editAddr, [e.target.name]: e.target.value };
    setEditAddr(tmpAddr);
  };

  return address._id === editId ? (
    <tr>
      <th>
        <input
          type="text"
          name="name"
          className="form-control"
          defaultValue={address.name}
          onChange={handleInput}
        ></input>
      </th>
      <th>
        <input
          type="text"
          name="phone"
          className="form-control"
          defaultValue={address.phone}
          onChange={handleInput}
        ></input>
      </th>
      <th>
        <input
          type="text"
          name="email"
          className="form-control"
          defaultValue={address.email}
          onChange={handleInput}
        ></input>
      </th>
      <th>
        <input
          type="text"
          name="company"
          className="form-control"
          defaultValue={address.company}
          onChange={handleInput}
        ></input>
      </th>
      <th>
        <input
          type="text"
          name="birthday"
          className="form-control"
          defaultValue={address.birthday}
          onChange={handleInput}
        ></input>
      </th>
      <th>
        <button
          className="btn btn-info btn-sm"
          name="update"
          onClick={() => handleSubmit(editAddr, "update")}
        >
          <i className="glyphicon glyphicon-wrench"></i>
          저장
        </button>
        <button
          className="btn btn-warning btn-sm"
          name="modify"
          onClick={() => setEditId("")}
        >
          <i className="glyphicon glyphicon-repeat"></i>
          취소
        </button>
      </th>
    </tr>
  ) : (
    <tr>
      <th onClick={() => setEditId(address._id)}>{address.name}</th>
      <th onClick={() => setEditId(address._id)}>{address.phone}</th>
      <th onClick={() => setEditId(address._id)}>{address.email}</th>
      <th onClick={() => setEditId(address._id)}>{address.company}</th>
      <th onClick={() => setEditId(address._id)}>{address.birthday}</th>
      <th>
        <button
          className="btn btn-info btn-sm"
          name="modify"
          onClick={() => setEditId(address._id)}
        >
          <i className="glyphicon glyphicon-wrench"></i>
          수정
        </button>
        <button
          className="btn btn-warning btn-sm"
          name="remove"
          onClick={() => Meteor.call("address.remove", address)}
        >
          <i className="glyphicon glyphicon-trash"></i>
          삭제
        </button>
      </th>
    </tr>
  );
};
