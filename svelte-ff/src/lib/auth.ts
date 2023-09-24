// auth.ts
import Keycloak from "keycloak-js";

import { userStore } from "./user.store";
import type IUser from "./user.interface";

// Initialize Keycloak instance
const keycloak: Keycloak = new Keycloak({
	url: "http://localhost:8080/",
	realm: "demo",
	clientId: "frontend",
});

// Object.freeze(keycloak);
// Function to initialize Keycloak and return a Promise
export function initAuth(): Promise<boolean> {
	return keycloak
		.init({ onLoad: "login-required" })
		.then(async (auth) => {
			if (auth) {
				await keycloak.updateToken(30);
				const token = keycloak.token;
				// console.log("Token",token);
				const userData = await keycloak.loadUserInfo()
				console.log("User data", userData);
				userStore.setAccessToken(token);
				userStore.setUserData(userData as IUser);
				return true;
			} else {
				return false;
			}
		}).catch(err =>{
			console.error("Error occured while authenticating",err);
			return false;
		});
}

// Function to handle user login
export function login() {
	keycloak.login();
	userStore.setAccessToken(keycloak.idToken);
}

// Function to handle user logout
export function logout() {
	keycloak.logout();
}

// Function to check if the user is authenticated
export function isAuthenticated(): boolean {
	return keycloak.authenticated;
}

// Function to get the user's token
export function getToken() {
	return keycloak.token;
}

export function isTokenExpired():boolean{
	return keycloak.isTokenExpired(30);
}

export function updateToken(){
	return keycloak.updateToken(30);
}
