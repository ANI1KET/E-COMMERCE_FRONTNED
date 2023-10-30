import React, { Fragment, useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import { useNavigate } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import icon from '../../../images/Profile.png';

const UserOptions = () => {
    const [open, setOpen] = useState(false);
    const Navigate = useNavigate();

    const options = [
        { icon: <LoginIcon />, name: "Login", func: login },
        { icon: <SearchIcon />, name: "Search", func: search },
        { icon: <HomeIcon />, name: "Home", func: home },
    ];

    function login() {
        Navigate("/login");
    }

    function search() {
        Navigate("/search");
    }

    function home() {
        Navigate("/");
    }

    return (
        <Fragment>
            <Backdrop open={open} style={{ zIndex: "10" }} />
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                style={{ zIndex: "12" }}
                open={open}
                direction="down"
                className="speedDial"
                icon={
                    <img
                        className="speedDialIcon"
                        src={icon}
                        alt="Profile"
                    />
                }
            >
                {options.map((item) => (
                    <SpeedDialAction
                        key={item.name}
                        icon={item.icon}
                        tooltipTitle={item.name}
                        onClick={item.func}
                        tooltipOpen={window.innerWidth <= 600 ? true : false}
                    />
                ))}
            </SpeedDial>
        </Fragment>
    );
};

export default UserOptions;