'use client'
import {useState, useRef, useEffect} from 'react'
import {
    init,
    authorizeUser,
    setFirstName,
    setLastName,
    setPhoneNumber,
    setCustomAttribute,
    newEvent,
    SDKConfig
} from "@metrixorg/websdk";
import styles from '../app/page.module.css'

const APP_ID = process.env.NEXT_PUBLIC_METRIX_APP_ID!!
const API_KEY = process.env.NEXT_PUBLIC_METRIX_API_KEY!!
const PUSH_PUBLIC_KEY = process.env.NEXT_PUBLIC_PUSH_PUBLIC_KEY!!
const EVENT_SLUG = process.env.NEXT_PUBLIC_METRIX_EVENT_SLUG!!

export default function MetrixSample() {
    const [username, setUsername] = useState<null | string>(null)

    const config: SDKConfig = {
        push: {
            enabled : true, // defaults to false but if set to true you must provide publicKey.
            publicKey: PUSH_PUBLIC_KEY, // your push subscription public key.
            showBell: true
        }
    }

    useEffect(() => {
        const temp = localStorage.getItem("username")
        setUsername(temp)
        init(APP_ID, API_KEY, config);
        if (temp)
            authorizeUser(temp)
    }, [])



    const usernameInputRef = useRef(null);
    const login = () => {
        //This is a formal login not a real one!
        // @ts-ignore
        const temp = usernameInputRef?.current?.value
        setUsername(temp)
        localStorage.setItem("username", temp)
    }

    const logout = () => {
        setUsername(null)
        localStorage.removeItem("username")
    }

    const firstNameInputRef = useRef(null);
    const lastNameInputRef = useRef(null);
    const phoneInputRef = useRef(null);
    const userCAKInputRef = useRef(null);
    const userCAVInputRef = useRef(null);
    const userCAK2InputRef = useRef(null);
    const userCAV2InputRef = useRef(null);


    const sendUser = () => {
        // @ts-ignore
        const firstname = firstNameInputRef?.current?.value;
        // @ts-ignore
        const lastname = lastNameInputRef?.current?.value;
        // @ts-ignore
        const phone = phoneInputRef?.current?.value;
        // @ts-ignore
        const key = userCAKInputRef?.current?.value;
        // @ts-ignore
        const value = userCAVInputRef?.current?.value;
        // @ts-ignore
        const key2 = userCAK2InputRef?.current?.value;
        // @ts-ignore
        const value2 = userCAV2InputRef?.current?.value;

        if (firstname)
            setFirstName(firstname)
        if (lastname)
            setLastName(lastname)
        if (phone)
            setPhoneNumber(phone)
        if (key && value)
            setCustomAttribute(key, value)
        if (key2 && value2)
            setCustomAttribute(key2, value2)
    }

    const eventCAKInputRef = useRef(null);
    const eventCAVInputRef = useRef(null);
    const eventCAK2InputRef = useRef(null);
    const eventCAV2InputRef = useRef(null);
    const sendEvent = () => {
        // @ts-ignore
        const key = eventCAKInputRef?.current?.value as string
        // @ts-ignore
        const value = eventCAVInputRef?.current?.value  as string
        // @ts-ignore
        const key2 = eventCAK2InputRef?.current?.value  as string
        // @ts-ignore
        const value2 = eventCAV2InputRef?.current?.value  as string

        const attributes = {};

        if (key && value)
            { // @ts-ignore
                attributes[key] = value;
            }
        if (key2 && value2)
            { // @ts-ignore
                attributes[key2] = value2;
            }

        newEvent(EVENT_SLUG, attributes)
    }


    return (
        <div className={styles.grid}>
            <div className={styles.card}>
                <h3>Enter Your username:</h3>
                <input ref={usernameInputRef} placeholder="customer@mycompany.com"></input>
                <button onClick={login}>Login</button>
                <button onClick={logout}>Logout</button>
                {username ? <h5 id="login-status">You're logged in as: {username}</h5> :
                    <h5 id="login-status">Your Anonymous!!!</h5>}
                <p>This is a formal login!</p>
            </div>
            <div className={styles.card}>
                <h3>Send sample user attribute</h3>
                <h5>Attributes:</h5>
                <div>
                    <label htmlFor="first-name-input">First Name:</label>
                    <input id="first-name-input" ref={firstNameInputRef} placeholder="First Name"></input>
                </div>
                <div>
                    <label htmlFor="last-name-input">Last Name:</label>
                    <input id="last-name-input" ref={lastNameInputRef} placeholder="Last Name"></input></div>
                <div>
                    <label htmlFor="phone-input">Phone Number:</label>
                    <input id="phone-input" ref={phoneInputRef} placeholder="Phone Number"></input>
                </div>
                <h5>Custom Attributes:</h5>
                <h4>Pair1</h4>
                <div>
                    <label htmlFor="user-c-att-key-input">Key:</label>
                    <input id="user-c-att-key-input" ref={userCAKInputRef} placeholder="key"></input>
                    <label htmlFor="user-c-att-value-input">Value:</label>
                    <input id="user-c-att-value-input" ref={userCAVInputRef} placeholder="value"></input>
                </div>
                <h4>Pair2</h4>
                <div>
                    <label htmlFor="user-c-att-key2-input">Key:</label><
                    input id="user-c-att-key2-input" ref={userCAK2InputRef} placeholder="key"></input>
                    <label htmlFor="user-c-att-value2-input">Value:</label>
                    <input id="user-c-att-value2-input" ref={userCAV2InputRef} placeholder="value"></input>
                </div>
                <button onClick={sendUser}>Send User</button>
            </div>
            <div className={styles.card}>
                <h3>Send sample event with custom attribute:</h3>
                <h4>Pair1</h4>
                <div>
                    <label htmlFor="event-c-att-key-input">Key:</label>
                    <input id="event-c-att-key-input" ref={eventCAKInputRef} placeholder="key"></input>
                    <label htmlFor="event-c-att-value-input">Value:</label>
                    <input id="event-c-att-value-input" ref={eventCAVInputRef} placeholder="value"></input>
                </div>
                <h4>Pair2:</h4>
                <div>
                    <label htmlFor="event-c-att-key2-input">Key:</label>
                    <input id="event-c-att-key2-input" ref={eventCAK2InputRef} placeholder="key"></input>
                    <label htmlFor="event-c-att-value2-input">Value:</label>
                    <input id="event-c-att-value2-input" ref={eventCAV2InputRef} placeholder="value"></input>
                </div>
                <button onClick={sendEvent}>Send Event</button>
            </div>
        </div>
    )
}
