import React from 'react'
import { Link } from 'react-router-dom';
import './Navbar.scss';

function Navbar() {

    return (
        <>
            <div className="area"></div>
            <nav className="main-menu">
                <ul>
                    <li>
                        <Link to="/">
                            <i className="fa fa-home fa-2x"></i>
                            <span className="nav-text">
                                Ana Sayfa
                            </span>
                        </Link>

                    </li>

                    <li>
                        <Link to="/my-information">
                            <i className="fa fa-user fa-2x"></i>
                            <span className="nav-text">
                                Bilgilerim
                            </span>
                        </Link>

                    </li>

                    <li>
                        <Link to="/notes/list">
                            <i className="fa fa-book-open fa-2x"></i>
                            <span className="nav-text">
                                Notlar
                            </span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/english-test/list">
                            <i className="fa fa-sticky-note fa-2x"></i>
                            <span className="nav-text">
                                İngilizce Kelimeler(Test)
                            </span>
                        </Link>
                    </li>
                </ul>

                <ul className="logout">
                    <li>
                        <Link to="/">
                            <i className="fa fa-power-off fa-2x"></i>
                            <span className="nav-text">
                                Çıkış Yap
                            </span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}
export default Navbar;