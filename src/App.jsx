import { useState, useRef } from 'react';
import styles from './app.module.css';

const passwordRegEx = /^(?=.*[A-Z])(?=.*\d)/;
const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regEx = /^[\w_]*$/;

export const App = () => {
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [confirmPasswordError, setConfirmPasswordError] = useState('');

	const submitButtonRef = useRef(null);

	const onEmailChange = ({ target }) => {
		setEmail(target.value);
		let error = null;

		if (!emailRegEx.test(target.value)) {
			error =
				'Неверный email! Пожалуйста, введите корректный адрес электронной почты.';
		} else {
			error = '';
		}
		setEmailError(error);
	};

	const onPasswordChange = ({ target }) => {
		setPassword(target.value);
		let error = null;

		if (!regEx.test(target.value)) {
			error =
				'Неверный пароль! Пароль должен содержать только латинские буквы, цифры и нижнее подчеркивание.';
		} else if (target.value.length > 16) {
			error = 'Неверный пароль! Пароль должен содержать до 16 символов.';
		} else {
			error = '';
		}

		setPasswordError(error);
	};

	const onConfirmPasswordChange = ({ target }) => {
		setConfirmPassword(target.value);
		let error = null;

		if (password !== target.value) {
			error = 'Пароли не совпадают.';
		} else {
			error = '';
		}

		setConfirmPasswordError(error);
		if (target.value === password && !emailError && !passwordError) {
			submitButtonRef.current.focus();
		}
	};

	const onEmailBlur = () => {
		if (email.length < 5) {
			setEmailError('Неверный email! Email должен содержать не меньше 5 символов.');
		}
	};

	const onPasswordBlur = () => {
		if (!passwordRegEx.test(password)) {
			setPasswordError(
				'Неверный пароль! Пароль должен содержать хотя бы одну заглавную букву и одну цифру.',
			);
		} else if (password.length < 8) {
			setPasswordError(
				'Неверный пароль! Пароль должен содержать не меньше 8 символов.',
			);
		}
	};

	const onConfirmPasswordBlur = () => {
		if (password !== confirmPassword) {
			setConfirmPasswordError('Пароли не совпадают.');
		}
	};

	const onSubmit = (event) => {
		event.preventDefault();
		if (!emailError && !passwordError && !confirmPasswordError) {
			console.log('Email: ', email);
			console.log('Password: ', password);
			console.log('Confirm password: ', confirmPassword);
		}
	};

	return (
		<div className={styles.app}>
			<div className={styles.formContainer}>
				<form onSubmit={onSubmit}>
					<h2>Введите свои данные!</h2>
					{emailError && (
						<div className={styles.validationError}>{emailError}</div>
					)}
					<input
						type="email"
						name="email"
						placeholder="Email"
						value={email}
						onChange={onEmailChange}
						onBlur={onEmailBlur}
					/>
					{passwordError && (
						<div className={styles.validationError}>{passwordError}</div>
					)}
					<input
						type="password"
						name="password"
						placeholder="Пароль"
						value={password}
						onChange={onPasswordChange}
						onBlur={onPasswordBlur}
					/>
					{confirmPasswordError && (
						<div className={styles.validationError}>
							{confirmPasswordError}
						</div>
					)}
					<input
						type="password"
						name="confirmPassword"
						placeholder="Повторите пароль"
						value={confirmPassword}
						onChange={onConfirmPasswordChange}
						onBlur={onConfirmPasswordBlur}
					/>
					<button
						type="submit"
						disabled={
							emailError !== '' ||
							passwordError !== '' ||
							confirmPasswordError !== ''
						}
						ref={submitButtonRef}
					>
						Зарегистрироваться
					</button>
				</form>
			</div>
		</div>
	);
};
