import { Link } from "react-router-dom";

//Material UI
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Image from "@/components/Image";
import LanguageIcon from "@mui/icons-material/Language";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useNavigate } from "react-router-dom";
//Components
import images from "@/assets/images";

//Others
import "./style.scss";
import { Divider } from "@mui/material";
import SearchBar from "../SearchBar";

const pages = ["Location", "Stays", "Online Experiences"];
const settings = [
    {
        label: "Sign up",
        link: "/auth/login",
        divider: false,
    },
    {
        label: "Log in",
        link: "/auth/signup",
        divider: true,
    },
    {
        label: "Host your home",
        link: "/",
        divider: false,
    },
    {
        label: "Host an experience",
        link: "/",
        divider: false,
    },
    {
        label: "Help",
        link: "/",
        divider: false,
    },
];

const Header = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [searchCategory, setSearchCategory] = useState("Location");
    let navigate = useNavigate();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleCategory = (page) => {
        setSearchCategory(page);
        handleCloseNavMenu();
    };

    const TableTabletNavbar = () => {
        return (
            <>
                <Box className="main-header__navbar" sx={{ flexGrow: 1, display: { xs: "flex", sm: "flex" } }}>
                    <IconButton
                        className="main-header__logo"
                        component={Link}
                        to="/"
                        sx={{ display: { xs: "flex", md: "none" } }}
                    >
                        <Image className="main-header__logo-img" src={images.logoIcon} alt="Airbnb logo" />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: "block", md: "none" },
                        }}
                    >
                        {pages.map((page) => (
                            <MenuItem key={page} onClick={() => handleCategory(page)}>
                                <Typography textAlign="center">{page}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </>
        );
    };

    return (
        <AppBar id="main-header" position="static">
            <Container maxWidth="lg" sx={{ display: { xs: "none", sm: "flex", md: "flex" } }}>
                <Toolbar className="main-header__content" disableGutters sx={{ width: { md: "100%" } }}>
                    <IconButton
                        className="main-header__logo"
                        component={Link}
                        to="/"
                        sx={{ display: { xs: "none", md: "flex" } }}
                    >
                        <Image className="main-header__logo-img" src={images.logoWhite} alt="Airbnb logo" />
                    </IconButton>

                    {/* Nabar for tablet starts */}
                    <TableTabletNavbar />
                    {/* Nabar for tablet + mobile ends */}

                    {/* Navbar for PC starts */}
                    <Box className="main-header__navbar" sx={{ display: { xs: "none", md: "flex" } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={() => handleCategory(page)}
                                className={
                                    page === searchCategory
                                        ? "main-header__navbar-item active"
                                        : "main-header__navbar-item"
                                }
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    {/* Navbar for PC ends */}

                    <Box className="main-header__actions" sx={{ flexGrow: 0 }}>
                        <Button className="actions__btn" component={Link} to="/">
                             Become a host
                        </Button>
                        <IconButton className="actions__btn">
                            <LanguageIcon />
                        </IconButton>
                        <IconButton
                            className="actions__btn actions__btn--user"
                            onClick={handleOpenUserMenu}
                            sx={{ p: 0 }}
                        >
                            <MenuIcon className="actions__btn-icon" />
                            <AccountCircleIcon className="actions__btn-icon" />
                        </IconButton>

                        {/* Actions' sub nav */}
                        <Menu
                            className="actions__sub-nav"
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <div key={setting.label}>
                                    <MenuItem
                                        className="sub-nav__item"
                                        key={setting.label}
                                        onClick={(handleCloseUserMenu, () => navigate(setting.link))}
                                    >
                                        {setting.label}
                                    </MenuItem>
                                    {setting.divider ? <Divider /> : ""}
                                </div>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
            <SearchBar searchCategory={searchCategory} />
        </AppBar>
    );
};
export default Header;
