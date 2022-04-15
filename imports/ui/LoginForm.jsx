import { Meteor } from "meteor/meteor";
import React, { useEffect, useState } from "react";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const submit = (e) => {
    e.preventDefault();

    if (!isRegister) {
      Meteor.loginWithPassword(username, password, function (err) {
        if (err) alert(err.reason);
      });
    } else {
      Meteor.call("user.register", username, password, function (err) {
        if (err) alert(err.error);
        setIsRegister(!isRegister);
      });
    }
  };

  return (
    <div align="center">
      <h2>전화번호부</h2>
      <form onSubmit={submit} className="login-form">
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Username"
            name="username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          {!isRegister ? (
            <>
              <button type="submit" className="btn btn-primary" name="login">
                로그인
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => setIsRegister(!isRegister)}
              >
                회원가입
              </button>
            </>
          ) : (
            <>
              <button type="submit" className="btn btn-primary" name="register">
                계정 생성
              </button>
              <button
                className="btn btn-primary"
                ß
                type="button"
                onClick={() => setIsRegister(!isRegister)}
              >
                로그인으로 돌아가기
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};
