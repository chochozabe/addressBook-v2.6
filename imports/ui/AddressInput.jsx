import React, { useState } from "react";

export const AddressInput = (props) => {
  const { handleSubmit } = props;
  const [address, setAddress] = useState({});

  const handleInput = (e) => {
    let tmpAddr = { ...address, [e.target.name]: e.target.value };
    setAddress(tmpAddr);
  };

  return (
    <div className="well">
      <div className="form-inline">
        <div className="form-group">
          <input
            type="text"
            className="form-control form-margin"
            name="name"
            placeholder="이름"
            onChange={handleInput}
          />
          <input
            type="text"
            className="form-control form-margin"
            name="phone"
            placeholder="전화번호"
            onChange={handleInput}
          />
          <input
            type="text"
            className="form-control form-margin"
            name="email"
            placeholder="이메일"
            onChange={handleInput}
          />
          <input
            type="text"
            className="form-control form-margin"
            name="company"
            placeholder="회사"
            onChange={handleInput}
          />
          <input
            type="text"
            className="form-control form-margin"
            name="birthday"
            placeholder="생일"
            onChange={handleInput}
          />
          <button
            className="btn btn-info btn-sm"
            name="saveAddress"
            onClick={() => handleSubmit(address, "insert")}
          >
            <i className="glyphicon glyphicon-ok"></i>
            등록
          </button>
        </div>
      </div>
    </div>
  );
};
