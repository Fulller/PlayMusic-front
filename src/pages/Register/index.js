import { useState, useRef } from 'react';
import style from './Register.module.scss';
import className from 'classnames/bind';
import { Link } from 'react-router-dom';
import register from '../../services/register';

let cx = className.bind(style);
function Register() {
    function validate(selector) {
        let group = document.querySelector(`.${selector}`);
        let input = group.querySelector('input');
        let message = group.querySelector('p');
        if (input.value.trim() == '') {
            message.style.visibility = 'visible';
            return false;
        } else {
            if (selector == 'repassword') {
                let password = document.querySelector('.password');
                let passwordinput = password.querySelector('input');
                if (input.value != passwordinput.value) {
                    message.style.visibility = 'visible';
                    return false;
                }
            }
            message.style.visibility = 'hidden';
            return input.value.trim();
        }
    }
    async function handleSubmit() {
        let groupSelector = ['username', 'name', 'password', 'repassword'];
        let value = [];
        for (let selector of groupSelector) {
            value.push(validate(selector));
            if (!validate(selector)) return;
        }
        let data = await register(value[0], value[1], value[2]);
        if (data.errCode == 0) {
            window.location = '/login';
        } else {
            let messageform = document.getElementById('messageform');
            messageform.style.visibility = 'visible';
            messageform.innerText = data.message;
        }
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('register')}>
                <h1 className={cx('title')}>REGISTER ACCOUNT</h1>
                <div className={cx('form')}>
                    <div className={cx(['input-group', 'username'])}>
                        <label>Username</label>
                        <input
                            spellCheck="false"
                            type="text"
                            placeholder="Username"
                            onInput={() => validate('username')}
                            onBlur={() => validate('username')}
                        ></input>
                        <p className={cx('message')}>Please enter Usename</p>
                    </div>
                    <div className={cx(['input-group', 'name'])}>
                        <label>Name</label>
                        <input
                            spellCheck="false"
                            type="text"
                            placeholder="Name"
                            onBlur={() => validate('name')}
                            onInput={() => validate('name')}
                        ></input>
                        <p className={cx('message')}>Pleasae enter Name</p>
                    </div>
                    <div className={cx(['input-group', 'password'])}>
                        <label>Password</label>
                        <input
                            spellCheck="false"
                            type="text"
                            placeholder="Password"
                            onBlur={() => validate('password')}
                            onInput={() => validate('password')}
                        ></input>
                        <p className={cx('message')}>Please enter Password</p>
                    </div>
                    <div className={cx(['input-group', 'repassword'])}>
                        <label>Re-password</label>
                        <input
                            spellCheck="false"
                            type="text"
                            placeholder="Re-password"
                            onBlur={() => validate('repassword')}
                            onInput={() => validate('repassword')}
                        ></input>
                        <p className={cx('message')}>Password note same</p>
                    </div>
                </div>
                <div className={cx('messageform')} id="messageform">
                    Error
                </div>
                <footer>
                    <Link to="/login" className={cx('to-login')}>
                        Login
                    </Link>
                    <button className={cx('submit')} type="submit" onClick={handleSubmit}>
                        Register
                    </button>
                </footer>
            </div>
        </div>
    );
}
export default Register;
