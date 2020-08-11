import { useState } from "react";
import useRequest from "../../hooks/use-request";
import Router from "next/router"
export default () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { doRequest, errors } = useRequest({
        url: "/api/users/signin",
        method: "post",
        body: {
            email,
            password
        },
        onSuccess: () => {
            Router.push("/")
        }
    });

    const submitHandler = async (event) => {
        event.preventDefault();
        doRequest();
    };
    return (
        <div className="card col-6">
            <form onSubmit={submitHandler}>
                <h1>Sign In </h1>
                <div className="form-group">
                    <label> Email Address </label>
                    <input
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        type="email"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label> Password </label>{" "}
                    <input
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        type="password"
                        className="form-control"
                    />
                </div>{errors}
                <button className="btn btn-light"> Sign In </button>{" "}
            </form>
        </div>
    );
};
