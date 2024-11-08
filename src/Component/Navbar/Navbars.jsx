import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    IconButton,
} from "@material-tailwind/react";
import {
    UserCircleIcon,
    CubeTransparentIcon,
    CodeBracketSquareIcon,
    ChevronDownIcon,
    Cog6ToothIcon,
    InboxArrowDownIcon,
    LifebuoyIcon,
    PowerIcon,
    Bars2Icon,
} from "@heroicons/react/24/solid";

// Profile menu component with appropriate icons for actions
const profileMenuItems = [
    { label: "My Profile", icon: UserCircleIcon, link: "/profile" },
    { label: "Edit Profile", icon: Cog6ToothIcon, link: "/edit-profile" },
    { label: "Inbox", icon: InboxArrowDownIcon, link: "/inbox" },
    { label: "Help", icon: LifebuoyIcon, link: "/help" },
    { label: "Sign Out", icon: PowerIcon, link: "/sign-out" },
];

function ProfileMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
            <MenuHandler>
                <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-1 rounded-full py-1 pr-2 pl-1 lg:ml-auto hover:bg-gray-200 transition duration-300"
                >
                    <Avatar
                        variant="circular"
                        size="sm"
                        alt="Profile Avatar"
                        className="border border-gray-900 p-0.5"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                    />
                    <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`h-4 w-4 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
                    />
                </Button>
            </MenuHandler>
            <MenuList className="p-1">
                {profileMenuItems.map(({ label, icon, link }, key) => {
                    const isLastItem = key === profileMenuItems.length - 1;
                    return (
                        <Link to={link} key={label}>
                            <MenuItem
                                onClick={closeMenu}
                                className={`flex items-center gap-2 rounded p-2 hover:bg-gray-100 transition duration-200 ${isLastItem ? "text-red-500" : "text-gray-900"}`}
                            >
                                {React.createElement(icon, { className: "h-5 w-5" })}
                                <Typography as="span" variant="small" className="font-normal">
                                    {label}
                                </Typography>
                            </MenuItem>
                        </Link>
                    );
                })}
            </MenuList>
        </Menu>
    );
}

// Nav list component with appropriate icons for routes
const navListItems = [
    { label: "Blog", icon: CubeTransparentIcon, link: "/blog" }, // Blog route
    { label: "Contact Us", icon: UserCircleIcon, link: "/contact" }, // Contact Us route
    { label: "Find a Doctor", icon: CodeBracketSquareIcon, link: "/Find_a_Doctor" }, // Find a Doctor route
    { label: "Become a Doctor", icon: CodeBracketSquareIcon, link: "/become-doctor" }, // Become a Doctor route
    // Add more routes here if needed
];

function NavList() {
    return (
        <ul className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-center">
            {navListItems.map(({ label, icon, link }) => (
                <Typography key={label} as="a" href={link} variant="small" color="gray" className="font-medium text-blue-gray-500">
                    <MenuItem className="flex items-center gap-2 lg:rounded-full hover:bg-gray-100 transition duration-200">
                        {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
                        <span className="text-gray-900">{label}</span>
                    </MenuItem>
                </Typography>
            ))}
        </ul>
    );
}

const Navbars = () => {
    const [isNavOpen, setIsNavOpen] = React.useState(false);
    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 960) {
                setIsNavOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <Navbar className="mx-auto max-w-screen-2xl p-2 lg: bg-white shadow-lg">
            <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
                {/* Make MedConnect clickable and route to home page */}
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
                <Button size="sm" variant="outlined" className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition duration-200 ">
                    Log In
                </Button>
                <ProfileMenu />
            </div>
            <MobileNav open={isNavOpen} className="overflow-scroll">
                <NavList />
            </MobileNav>
        </Navbar>
    );
};

export default Navbars;
