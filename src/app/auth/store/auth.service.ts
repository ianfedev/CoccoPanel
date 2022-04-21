import {Injectable} from "@angular/core";
import { Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {CloudAuthModel} from "../model/cloud-auth.model";
import {environment} from "../../../environments/environment.prod";

@Injectable({providedIn: 'root'})
export class AuthService {
    timeoutInterval: any;
    constructor(private http: HttpClient, private store: Store<AppState>) {}

    login(email: string, password: string): Observable<CloudAuthModel> {
        return this.http.post<CloudAuthModel>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebase.apiKey}`,
            { email, password, returnSecureToken: true }
        );
    }

    formatUser(data: CloudAuthModel) {
        /*
        const expirationDate = new Date(
            new Date().getTime() + +data.expiresIn * 1000
        );
        const user = new User(
            data.email,
            data.idToken,
            data.localId,
            expirationDate
        );
        return user;
         */
    }

    getErrorMessage(message: string) {
        switch (message) {
            case 'EMAIL_NOT_FOUND':
                return 'Email Not Found';
            case 'INVALID_PASSWORD':
                return 'Invalid Password';
            case 'EMAIL_EXISTS':
                return 'Email already exists';
            default:
                return 'Unknown error occurred. Please try again';
        }
    }

    /*
    setUserInLocalStorage(user: User) {
        localStorage.setItem('userData', JSON.stringify(user));

        this.runTimeoutInterval(user);
    }
     */

    /*
    runTimeoutInterval(user: User) {
        const todaysDate = new Date().getTime();
        const expirationDate = user.expireDate.getTime();
        const timeInterval = expirationDate - todaysDate;

        this.timeoutInterval = setTimeout(() => {
            this.store.dispatch(autoLogout());
            //logout functionality or get the refresh token
        }, timeInterval);
    }
     */

    /*
    getUserFromLocalStorage() {
        const userDataString = localStorage.getItem('userData');
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            const expirationDate = new Date(userData.expirationDate);
            const user = new User(
                userData.email,
                userData.token,
                userData.localId,
                expirationDate
            );
            this.runTimeoutInterval(user);
            return user;
        }
        return null;
    }
     */

    logout() {
        localStorage.removeItem('userData');
        if (this.timeoutInterval) {
            clearTimeout(this.timeoutInterval);
            this.timeoutInterval = null;
        }
    }
}