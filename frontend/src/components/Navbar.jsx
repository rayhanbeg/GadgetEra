import { NavLink } from "react-router-dom";

const Navbar = ({containerStyles, onClick}) => {
    const navLinks = [
        {path:'/', title:'Home'},
        {path:'/collection', title:'collection'},
        {path:'/blog', title:'Blog'},
        {path:'/contact', title:'Contact'},
    ]

    return (
        <nav className={`${containerStyles}`}>
           {navLinks.map((link) => (
            <NavLink key={link.title}
            to={link.path}
            className={({isActive}) => `${isActive ? "active-link" : ""} px-3 py-2 rounded-full`}
            onClick={onClick}
            >
                {link.title}
            </NavLink>
           ))}
        </nav>
    );
};

export default Navbar;