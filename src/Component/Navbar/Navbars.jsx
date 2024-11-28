import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    IconButton,
    Tooltip, // Import Tooltip here
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
} from "@material-tailwind/react";
import {
    ChevronDownIcon,
    Bars2Icon,
    PowerIcon,
} from "@heroicons/react/24/solid";
import { AuthContext } from "../Authentication/AuthProvider/AuthProvider";
import axios from "axios";
import { FaBloggerB,FaUserDoctor,FaUsersLine  } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { MdDashboardCustomize } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";



// Profile menu component with appropriate icons for actions
const profileMenuItems = [
    { label: "Dashboard", icon: MdDashboardCustomize, link: "/dashboard/statistic" },
    { label: "Appointment", icon: IoMdNotifications, link: "/appointment" },
    { label: "Sign Out", icon: PowerIcon, action: "signout" }, // Modified for signout action
];

function ProfileMenu({ closeMenu, onSignOut }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user } = useContext(AuthContext);

    const [userData, setUserData] = useState(null); // State for user data
    // Fetch user data based on email
    useEffect(() => {
        const fetchUserData = async () => {
            if (user?.email) {
                try {
                    const { data } = await axios.get("http://localhost:5000/signup");
                    const matchedUser = data.find((u) => u.email === user.email);
                    if (matchedUser) {
                        console.log(matchedUser); // Log the matched user data
                        setUserData(matchedUser); // Save matched user data to state
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };
        fetchUserData();
    }, [user]);


    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
            <MenuHandler>
                <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-1 rounded-full py-1 pr-2 pl-1 lg:ml-auto hover:bg-gray-200 transition duration-300"
                    aria-haspopup="true"
                    aria-expanded={isMenuOpen ? "true" : "false"}
                >
                    {/* Wrap Avatar with Tooltip */}
                    <Tooltip content={userData?.fullName || user.email} placement="bottom">
                        <Avatar
                            variant="circular"
                            size="sm"
                            alt="Profile Avatar"
                            className="border border-gray-900 p-0.5"
                            src={userData?.image || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"}
                        />
                    </Tooltip>
                    <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`h-4 w-4 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
                    />
                </Button>
            </MenuHandler>
            <MenuList className="p-1">
                {profileMenuItems.map(({ label, icon, link, action }, key) => {
                    const isLastItem = key === profileMenuItems.length - 1;
                    const handleClick = action === "signout" ? onSignOut : () => closeMenu();
                    return (
                        <div key={label} onClick={handleClick}>
                            {action === "signout" ? (
                                <MenuItem
                                    className={`flex items-center gap-2 rounded p-2 hover:bg-gray-100 transition duration-200 text-red-500`}
                                >
                                    {React.createElement(icon, { className: "h-5 w-5" })}
                                    <Typography as="span" variant="small" className="font-normal">
                                        {label}
                                    </Typography>
                                </MenuItem>
                            ) : (
                                <Link to={link} onClick={closeMenu}>
                                    <MenuItem
                                        className={`flex items-center gap-2 rounded p-2 hover:bg-gray-100 transition duration-200 ${isLastItem ? "text-gray-900" : ""}`}
                                    >
                                        {React.createElement(icon, { className: "h-5 w-5" })}
                                        <Typography as="span" variant="small" className="font-normal">
                                            {label}
                                        </Typography>
                                    </MenuItem>
                                </Link>
                            )}
                        </div>
                    );
                })}
            </MenuList>
        </Menu>
    );
}
const navListItems = [
    { label: "Blog", icon: FaBloggerB, link: "/blog" }, // Using a chat bubble icon for Blog
    { label: "Contact Us", icon: IoCall, link: "/contact" }, // Using a phone icon for Contact Us
    { label: "Find a Doctor", icon: FaUsersLine, link: "/Find_a_Doctor" }, // Using a user icon for Find a Doctor
    { label: "Become a Doctor", icon: FaUserDoctor, link: "/become-doctor" }, // Using the same user icon for Become a Doctor
];

function NavList() {
    return (
        <ul className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-center">
            {navListItems.map(({ label, icon, link }) => (
                <Typography key={label} as={Link} to={link} variant="small" color="gray" className="font-medium text-blue-gray-500">
                    <MenuItem className="flex items-center gap-2 lg:rounded-full hover:bg-gray-100 transition duration-200">
                        {React.createElement(icon, { className: "h-[18px] w-[18px]" })}
                        <span className="text-gray-900">{label}</span>
                    </MenuItem>
                </Typography>
            ))}
        </ul>
    );
}

const Navbars = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const { user, logOut } = useContext(AuthContext); // Use context to access user details and logout function
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate(); // To redirect after logging out
    

    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
    

   
    // Handle resizing to close the mobile menu on desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 960) {
                setIsNavOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


   

    const handleLogout = async () => {
        try {
            setIsLoading(true);
            await logOut(); // Call the logout function from AuthContext
            setIsLoading(false);
            navigate("/login"); // Redirect to login page after logout
        } catch (error) {
            console.error("Error logging out:", error);
            setIsLoading(false);
        }
    };

    console.log(user)



    return (
        <Navbar className="mx-auto max-w-screen-2xl p-2 lg:bg-white shadow-lg">
            <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
                <Typography as={Link} to="/" className="mr-4 ml-2 cursor-pointer py-1.5 font-semibold text-lg text-blue-600">
                    MedConnect
                </Typography>
                <div className="hidden lg:block m-auto">
                    <NavList />
                </div>
                <IconButton
                    size="sm"
                    color="blue-gray"
                    variant="text"
                    onClick={toggleIsNavOpen}
                    className="ml-auto mr-2 lg:hidden"
                >
                    <Bars2Icon className="h-6 w-6" />
                </IconButton>
                {/* Conditionally render Login or Profile button */}
                {!user ? (
                    <Button size="sm" variant="outlined" className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition duration-200">
                        <Link to="/login">Log In</Link>
                    </Button>
                ) : (
                    <div className="flex items-center gap-2">
                        <ProfileMenu closeMenu={() => setIsNavOpen(false)} onSignOut={handleLogout} />
                    </div>
                )}
            </div>
            <MobileNav open={isNavOpen} className="overflow-scroll">
                <NavList />
            </MobileNav>
        </Navbar>
    );
};

export default Navbars;
