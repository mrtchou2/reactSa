import { makeAutoObservable } from 'mobx';

export default class UserStore {
    constructor() {
        this._isAuth = true;
        this._user = {};
        this._users = [];
        this._selectedUser = {};
        makeAutoObservable(this);
    };

    setIsAuth(bool) {
        this._isAuth = bool;
    };

    setUser(user) {
        this._user = user;
    };

    setUsers(users) {
        this._users = users;
    };

    setSelectedUser(users) {
        this._users = users;
    };


    get isAuth() {
        return this._isAuth;
    };

    get user() {
        return this._user;
    };

    get users() {
        return this._users;
    };

    get selectedUser() {
        return this._users;
    };
};