import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Link, useParams } from 'react-router-dom';
import ProfilePage from './ProfilePage';

const useStyles = makeStyles((theme) => ({
    main: {
        boxShadow: "0px 0px 0px 2px gray",
        borderRadius: "3px",
        maxWidth: "700px",
        margin: "30px auto 30px auto",
        paddingBottom: "25px"
    },
    nav: {
        display: "flex",
        justifyContent: "space-between",
        "& > a": {
            textDecoration: "none"
        },
    },
    nav_1: {
        textAlign: "center",
        borderRadius: "5px",
        justifyContent: "space-between",
        backgroundColor: "white",
        padding: "3px",
        marginBottom: "10px",
        backgroundColor: "#bfcdf5",
        margin: "8px",
        width: "50px"
    },
    nav_2: {
        textAlign: "center",
        borderRadius: "5px",
        backgroundColor: "white",
        padding: "3px",
        marginBottom: "10px",
        margin: "8px",
    },
    heading: {
        textAlign: "center",
        fontSize: "larger",
        fontFamily: "cursive"
    },
    UserDetail: {
        backgroundColor: "#bfcdf5",
        borderRadius: "10px",
        boxShadow: "0px 0px 0px 1px gray",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        margin: "20px",
        overflow: "hidden"
    },
    post: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "35px",
        padding: "20px",
        "@media screen and (max-width:500px)": {
            display: "block"
        }
    },
    posts: {
        backgroundColor: "#bfcdf5",
        boxShadow: "0px 0px 0px 1px gray",
        borderRadius: "10px",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        height: "100%",
        "@media screen and (max-width:500px)": {
            marginBottom: "10px"
        },
        "& > span": {
            margin: "5px",
        },
        cursor: "pointer",
    },

    postPopup: {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '1',
    },
    postPopupContent: {
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '20px',
        width: '80%',
        maxHeight: '80%',
        overflowY: 'auto',
        position: 'relative',
    },
}));

function UserDetail() {
    const classes = useStyles();
    const { userId } = useParams();
    const [userData, setUserData] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
            .then((response) => response.json())
            .then((data) => setUserData(data));

        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
            .then((response) => response.json())
            .then((data) => setUserPosts(data));
    }, [userId]);

    const openPost = (postId) => {
        const selected = userPosts.find((post) => post.id === postId);
        setSelectedPost(selected);
    };

    const closePost = () => {
        setSelectedPost(null);
    };

    return (
        <div>
            <div className={classes.main}>
                <div className={classes.nav}>
                    <Link to="/">
                        <div className={classes.nav_1}>
                            Back
                        </div>
                    </Link>
                    <div className={classes.nav_2}>
                        <ProfilePage />
                    </div>
                </div>
                <div className={classes.heading}>
                    Profile Page
                </div>
                {userData && (
                    <div className={classes.UserDetail}>
                        <span>
                            Name: {userData.name}<br />
                            UserName: {userData.username}
                        </span>
                        <span>
                            Address: {userData.address.street}<br />
                            Email: {userData.email}<br />
                            Phone: {userData.phone}
                        </span>
                    </div>
                )}
                <div className={classes.post}>
                    {userPosts.map((post) => (
                        <div
                            key={post.id}
                            className={classes.posts}
                            onClick={() => openPost(post.id)} // Make the post clickable
                        >
                            <span>
                                Post Title: {post.title}
                            </span>
                            <span>
                                Details: {post.body}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {selectedPost && (
                <div className={classes.postPopup} onClick={closePost}>
                    <div className={classes.postPopupContent} onClick={(e) => e.stopPropagation()}>
                        <h2>Post Title: {selectedPost.title}</h2>
                        <p>Details: {selectedPost.body}</p>
                        <button onClick={closePost}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserDetail;
