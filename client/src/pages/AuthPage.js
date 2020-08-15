import React, {useEffect, useState, useContext, useRef} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/auth.context";

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, error, request, clearError} = useHttp();

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const emailInputRef = useRef(null);

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    useEffect(() => {
        emailInputRef.current.focus();
    }, []);

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value});
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            message(data.message);
        } catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            message(data.message);
            auth.login(data.token, data.userId);
        } catch (e) {}
    }

    return (
        <>
            <h1>Auth Page</h1>
            <div className="row">
                <div className="card col-6">
                    <div className="card-body">
                        <h5 className="card-title">Login or register</h5>

                        <label htmlFor="email">Email</label>
                        <div className="input-group mb-2">
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="Enter email"
                                id="email"
                                value={form.email}
                                onChange={changeHandler}
                                ref={emailInputRef}
                            />
                        </div>

                        <label htmlFor="password">Password</label>
                        <div className="input-group mb-2">
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="Enter password"
                                id="password"
                                value={form.password}
                                onChange={changeHandler}
                            />
                        </div>

                        <div className="row mt-4">
                            <div className="col-6">
                                <button
                                    type="button"
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                    onClick={loginHandler}
                                >
                                    Login
                                </button>
                            </div>
                            <div className="col-6">
                                <button
                                    type="button"
                                    className="btn btn-outline-primary w-100"
                                    disabled={loading}
                                    onClick={registerHandler}
                                >
                                    Register
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}