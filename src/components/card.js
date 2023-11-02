import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    main: {
        borderRadius: "2px",
        padding: "10px",
        maxWidth: "570px",
        margin: "70px auto 0 auto",
        boxShadow: "0px 0px 0px 2px gray",
        textAlignLast: "center",
        "&> a": {
            textDecoration: "none"
        },
        "&>div": {
            padding: "10px",
            fontFamily: "cursive"
        },
        "&>div:nth-child(1)": {
            justifyContent: "center",
            fontSize: "x-large",
            backgroundColor: "white",
        },
        "& .name": {
            fontWeight: "bold",
        },
        "& .post": {
            color: "green",
        },
    },
    divv: {
        borderRadius: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        padding: "10px",
        marginBottom: "10px",
        backgroundColor: "#bfcdf5",
    }
}));

function Card() {
    const classes = useStyles();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((data) => setUsers(data));
    }, []);

    return (
        <div>
            <div className={classes.main}>
                <div>Directory</div>
                {users.map((user) => (
                    <Link to={`/UserDetail/${user.id}`} key={user.id}>
                        <div className={classes.divv}>
                            <span className="name">Name: {user.name}</span>
                            <span className="post">Posts: 0</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Card;
