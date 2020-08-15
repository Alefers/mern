import React, {useState, useContext} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/auth.context";

export const CreatePage = () => {
    const auth = useContext(AuthContext);
    const {request} = useHttp();
    const [link, setLink] = useState('');

    const pressHandler = async event => {
        if (event.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', {
                    linkFrom: link
                }, {
                    Authorization: `Bearer ${auth.token}`
                });
                console.log(data);
            } catch (e) {

            }
        }
    };

    return (
        <>
            <h1>Create Page</h1>
            <div className="row">
                <div className="card col-6">
                    <div className="card-body">
                        <h5 className="card-title">Create link</h5>

                        <label htmlFor="link">Link</label>
                        <div className="input-group mb-2">
                            <input
                                type="link"
                                name="link"
                                className="form-control"
                                placeholder="Enter link"
                                id="link"
                                value={link}
                                onChange={e => setLink(e.target.value)}
                                onKeyPress={pressHandler}
                            />
                        </div>

                        <div className="row mt-4">
                            <div className="col-6">
                                <button
                                    type="button"
                                    className="btn btn-outline-primary w-100"
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