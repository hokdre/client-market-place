import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, selectIsLogin } from '../features/login/login_slice';
import { reset as resetCustomer } from '../features/customer/customer_slice';
import { reset as resetAdmin, selectAdmin } from '../features/admin/admin_slice';
import { reset as resetMerchant } from '../features/merchant/merchant_slice';
import { selectMerchantBasicInfo } from '../features/merchant/merchant_slice';
import DropdownCart from '../components/style_components/dropdown_cart';
import { selectCustomer } from '../features/customer/customer_slice';

export const MenubarContainer = props => {
    return (
        <div className="menubar">{props.children}</div>
    )
}

export const MenubarList = props => {
    let history = useHistory()

    const gotoHomePage= () => {
        history.push(`/`)
    }
    return (
        <ul className="menubar__list">
            <h2 onClick={gotoHomePage} className={"navbar__logo"}>S2L</h2>
            {props.children}
        </ul>
    )
}

export const MenubarItem = props => {
    let { onClick, active, icon } = props
    return (
        <li onClick={onClick} className={ active ? "menubar__item menubar__item--active" :"menubar__item"}>
        <i className={`menubar__icon ${icon}`}></i>
        <h3>{props.children}</h3>
    </li>
    )
}

export const MenubarNavigation = props => {
    let dispatch = useDispatch()
    let history = useHistory()
    const isLogin = useSelector(selectIsLogin)

    const loginType = localStorage.getItem("loginType")
    const userID = localStorage.getItem("userID")
    const merchantID = localStorage.getItem("merchantID")

    const merchantInfo = useSelector(selectMerchantBasicInfo)
    const userInfo = useSelector(selectCustomer)
    const adminInfo = useSelector(selectAdmin)

    const handleMerchant = () => {
        history.push("/merchants")
    }

    const handleCreateMerchant = () => {
        history.push("/merchants/add")
    }

    const handleLogOut = () => {
        dispatch(resetCustomer())
        dispatch(resetMerchant())
        dispatch(resetCustomer())
        dispatch(logOut())
        history.replace("/login")
    }

    return (
        <ul className="menubar__navigation">
            {
                loginType === "CUSTOMER" && (
                    <li className="menubar__item menubar__item--cart">
                        <DropdownCart className="menubar__icon"/>
                    </li>
                )
            }

            <li className="menubar-profile">
                {
                    (loginType === "CUSTOMER" && merchantID ) ? (
                        <div className="menubar-profile__merchant">
                            <Link className="menubar-profile__avatar" to={`/merchants`}>
                                <img src={merchantInfo.avatar}/>
                            </Link>
                            <span onClick={handleMerchant} className="menubar-profile__name">{merchantInfo.name}</span>
                        </div>
                    ) : ""
                }
                {
                    (loginType === "CUSTOMER" && !merchantID ) ? (
                        <div className="menubar-profile__merchant">
                            <div className="menubar-profile__avatar">
                                <img src="https://storage.googleapis.com/ecommerce_s2l_assets/default-merchant.jpeg"/>
                            </div>
                            <span onClick={handleCreateMerchant} className="menubar-profile__name">Create Merchant</span>
                        </div>
                    ) : ""
                }
                {
                    (loginType === "CUSTOMER") && (
                        <>
                        <div className="menubar-profile__user">
                            <div className="menubar-profile__avatar">
                                <Link to={`/${loginType.toLowerCase()}s/${userID}/update`}>
                                    <img src={userInfo.avatar}/>
                                </Link>
                            </div>
                        </div>
                        <span className="menubar-profile__logout" onClick={handleLogOut}>Logout</span>
                        </>
                    )
                }
                {
                    (loginType === "ADMIN") && (
                        <>
                        <div className="menubar-profile__user">
                            <div className="menubar-profile__avatar">
                                <Link to={`/${loginType.toLowerCase()}s/${userID}/update`}>
                                    <img src={adminInfo.avatar}/>
                                </Link>
                            </div>
                        </div>
                        <span className="menubar-profile__logout" onClick={handleLogOut}>Logout</span>
                        </>
                    )
                }
            </li>            
        </ul>
    )
}

const MenuBar = props => {
    return (
        <MenubarContainer>
            <MenubarList>
                {props.children}
            </MenubarList>
            <MenubarNavigation/>
        </MenubarContainer>
    )
}

export default MenuBar