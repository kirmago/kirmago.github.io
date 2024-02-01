import React from "react";
import { Link } from "react-router-dom";
import "./Credit.scss";
const Credit = () => {
    return (
        <div className="container-home-credit">
            <div className="propow-up">
                <div className="developer">
                    <h4>Developer</h4>
                    <div className="ig">
                        <i className="fa-brands fa-instagram"></i>
                        <Link to="https://instagram.com/chromesavior">
                            @itskindahaunted
                        </Link>
                    </div>
                    <div className="git">
                        <i className="fa-brands fa-github"></i>
                        <Link to="https://github.com/7ryznxx">7ryznxx</Link>
                    </div>
                </div>
                <div className="copyright">
                    <h4>Copyright</h4>
                    <div className="mas">
                        <i className="fa fa-copyright"></i>
                        <Link to="/kirmago-social">Kirmago 2023</Link>
                    </div>
                </div>
            </div>
            <div className="propow-down">
                <h4>Project Powered</h4>
                <div className="masx">
                    <i className="fa-brands fa-github"></i>
                    <Link to="https://pages.github.com/">github pages</Link>
                </div>
            </div>
        </div>
    );
};

export default Credit;
