import React from 'react';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li><a href="/fraud">Fraud Detection</a></li>
                {/*<li><a href="/bias">Bias Detection</a></li>*/}
                <li><a href="/about">About</a></li>
                <li><a href="/spam">Spam Detection</a></li>
                {/*<li><a href="/reports">Reports</a></li>*/}
            </ul>
        </nav>
    );
}

export default Navbar;
