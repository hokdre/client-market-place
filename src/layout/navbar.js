import React from 'react';
import {
    Link, useHistory
} from 'react-router-dom';
import { FormSearchLeft } from '../components/style_components/form_search';
import Container from '../components/UI_components/container';
import { useSelector } from 'react-redux';
import { selectCredential, selectIsLogin } from '../features/login/login_slice';
import { MenubarNavigation } from './menubar';
import SearchSuggestion from '../features/search/search';
const Navbar = props => {
    let { inputKeyword } = props 
    let history = useHistory()

    let isLogin = useSelector(selectIsLogin)
    const gotoHomePage= () => {
        history.push(`/`)
    }

    return (
        <section className={"navbar"}>
            <Container>
                <div className="navbar__wrapper">
                    <h2 onClick={gotoHomePage} className={"navbar__logo"}>S2L</h2>
                    <div className="navbar__search">
                        <SearchSuggestion inputKeyword={inputKeyword}/>
                    </div>
                    <ul className={"navbar__list"}>
                        {!isLogin && (
                            <li className={"navbar__item"}>
                                <Link to="/login" className={"navbar__link"}>LOGIN</Link>
                            </li>
                        )}
                        {!isLogin && (
                            <li className={"navbar__item"}>
                                <Link to="/register" className={"navbar__link"}>REGISTER</Link>
                            </li>
                        )}
                        <MenubarNavigation/>
                    </ul>
                </div>
            </Container>
        </section>
    )
}

export default Navbar;