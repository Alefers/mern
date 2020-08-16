import React, {useState, useCallback, useContext, useEffect} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/auth.context";
import {Loader} from "../components/Loader";
import {LinkItem} from "../components/LinkItem";


export const LinksPage = () => {
    const {token} = useContext(AuthContext);
    const {request, loading} = useHttp();
    const [links, setLinks] = useState([]);

    const getLinks = useCallback(async () => {
        try {
            const fetched = await request(`/api/link`, 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            const linksList = fetched.map(link => <LinkItem link={link} key={link.id} />);
            setLinks(linksList);
        } catch (e) {}
    }, [token, request]);

    useEffect(() => {
        getLinks();
    }, [getLinks]);

    if (loading) {
        return <Loader />
    }

    return (
        <>
            <h1>Links Page</h1>

            {links.length && <ul>{links}</ul>}
        </>
    )
}