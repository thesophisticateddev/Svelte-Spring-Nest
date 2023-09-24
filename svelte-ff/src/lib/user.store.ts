import { writable, type Writable } from "svelte/store";
import  type IUser from "./user.interface";


class UserStore {

	constructor(private accessToken: Writable<string> = writable(''),
		private refreshToken: Writable<string> = writable(''), private data: Writable<IUser> = writable(undefined)) {}

	public setAccessToken(token:string){
		this.accessToken.set(token);
	}

	public getAccessTokenSubscription(){
		return this.accessToken.subscribe;
	}
	public setUserData(userData: IUser){
		this.data.set(userData);
	}

	logout(){

	}
}

export const userStore = new UserStore();