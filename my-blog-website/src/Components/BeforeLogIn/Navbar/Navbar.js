import axios from 'axios';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { API } from '../../../API/Api';
import { bindActionCreators } from 'redux';
import { setIsLogin } from '../../../redux/actions/currencyActions';

class Navbar extends Component {

    componentDidMount = async () => {
        await axios.get(API + "/authentication/loggedIn")
            .then(async (response) => {
                this.props.setIsLogin(response.data.isLogin)
            })
            .catch(async (error) => {
                if (error.response) {
                    if (error.response.data.isLogin)
                        this.props.setIsLogin(false)
                }
            });
            console.log(this.props.isLogin)
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <Link to="/" className='navbar-brand'><i>Ali'nin Notları</i></Link >
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/" className='nav-link active'>AnaSayfa</Link >
                            </li>

                            <li className="nav-item">
                                <Link to="/react" className='nav-link'>React</Link >
                            </li>

                            <li className="nav-item">
                                <Link to="/nodejs" className='nav-link'>Node.Js</Link >
                            </li>

                            <li className="nav-item">
                                <Link to="/javascript" className='nav-link'>JavaScript</Link >
                            </li>

                            <li className="nav-item" >
                                <Link to="/react-native" className='nav-link'>React Native</Link >
                            </li>

                            <li className="nav-item">
                                <Link to="/seo" className='nav-link'>SEO</Link >
                            </li>

                            <li className="nav-item">
                                <Link to="/english-test" className='nav-link'>İngilizce Test</Link >
                            </li>
                        </ul>
                        <form className="d-flex">
                            <div className="footer-social">
                                <ul>
                                    <li >
                                        <a href="/" alt="face" title="face" >
                                            <i className="fa fa-facebook" />
                                        </a>
                                    </li>
                                    <li >
                                        <a href="/" alt="twit" title="twit">
                                            <i className="fa fa-twitter" />
                                        </a>
                                    </li>

                                    <li>
                                        <a href="/" alt="insta" title="insta">
                                            <i className="fa fa-instagram" />
                                        </a>

                                    </li>
                                    <li>
                                        <a href="https://github.com/alitahayurdakul?tab=repositories" alt="git" title="git" target="_blank" rel="noopener noreferrer">
                                            <i className="fab fa-github"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.linkedin.com/in/ali-taha-yurdakul-812530193/" alt="link" title="link" target="_blank" rel="noopener noreferrer">
                                            <i className="fa fa-linkedin" />
                                        </a>
                                    </li>
                                    <li>
                                        <Link to={this.props.isLogin ? "/my-information" : "/sign-in"}>
                                            <i className="fa fa-user" />
                                        </Link>
                                    </li>
                                    {
                                        this.props.isLogin ? <li>
                                            <Link to="/" onClick={async () => {
                                                await axios.get(API + "/authentication/logOut")
                                                    .then(async () => {
                                                        await this.props.setIsLogin(false)
                                                    })
                                            }}>
                                                <i className="fa fa-sign-out"></i>
                                            </Link>
                                        </li> : null
                                    }
                                </ul>
                            </div>
                        </form>
                    </div>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLogin: state.currencyListReducer.isLogin
    }
};

const mapDispatchToProps = dispatch => (
    (
        bindActionCreators({ setIsLogin }, dispatch)
    )
);

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);