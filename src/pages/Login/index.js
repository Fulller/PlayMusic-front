import { useState, useRef } from 'react';
import style from './Login.module.scss';
import className from 'classnames/bind';
import { Link } from 'react-router-dom';

import login from '../../services/login';
import setLocalStorage from '../../tools/setLocalStorage';

let cx = className.bind(style);
function Login() {
    let [eye, setEye] = useState('visibility_off');
    function handleSeePassword() {
        let password = document.querySelector('.password input');
        if (eye == 'visibility_off') {
            password.type = 'text';
            password.focus();
            setEye('visibility');
        } else {
            password.type = 'password';
            password.focus();

            setEye('visibility_off');
        }
    }
    function validate(selector) {
        let group = document.querySelector(`.${selector}`);
        let input = group.querySelector('input');
        let message = group.querySelector('p');
        if (input.value.trim() == '') {
            message.style.visibility = 'visible';
            return false;
        } else {
            message.style.visibility = 'hidden';
            return input.value.trim();
        }
    }
    async function handleLogin() {
        let groupSelector = ['username', 'password'];
        let value = [];
        for (let selector of groupSelector) {
            value.push(validate(selector));
            if (!validate(selector)) return;
        }
        let data = await login(value[0], value[1]);
        if (data.errCode == 0) {
            setLocalStorage('userpm', data.user);
            setLocalStorage('loginpm', true);
            window.location = '/home';
        } else {
            let messageform = document.getElementById('messageformlogin');
            messageform.style.visibility = 'visible';
            messageform.innerText = data.message;
        }
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('login')}>
                <h1 className={cx('title')}>LOG IN</h1>
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

                    <div className={cx(['input-group', 'password'])}>
                        <label>Password</label>
                        <input
                            spellCheck="false"
                            type="password"
                            placeholder="Password"
                            onBlur={() => validate('password')}
                            onInput={() => validate('password')}
                        ></input>
                        <span class="material-symbols-outlined" onClick={handleSeePassword}>
                            {eye}
                        </span>
                        <p className={cx('message')}>Please enter Password</p>
                    </div>
                </div>
                <div className={cx('messageform')} id="messageformlogin">
                    Error
                </div>
                <footer>
                    <Link to="/register" className={cx('to-register')}>
                        Register
                    </Link>
                    <button className={cx('submit')} type="submit" onClick={handleLogin}>
                        Log in
                    </button>
                </footer>
            </div>
        </div>
    );
}
export default Login;
