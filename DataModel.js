import { InfoCircleFilled } from "@ant-design/icons";
import { useLinkTo } from "@react-navigation/native";
import { initializeApp, getApps } from "firebase/app";
import {
  initializeFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  addDoc,
  setDoc,
  updateDoc
} from "firebase/firestore";
import { firebaseConfig } from "./Secrets";

let app;
if (getApps().length == 0) {
  app = initializeApp(firebaseConfig);
}
const db = initializeFirestore(app, {
  useFetchStreams: false,
});

class DataModel {
  constructor() {
    this.users = [];
    this.userListeners = [];
    this.chatListeners = [];
    this.initUsersOnSnapshot();
  }

  addUserListener(callbackFunction) {
    const listenerId = Date.now();
    const listener = {
      id: listenerId,
      callback: callbackFunction,
    };
    this.userListeners.push(listener);
    callbackFunction(); // have the caller check right away
    return listenerId;
  }

  removeUserListener(listenerId) {
    let idx = this.userListeners.findIndex((elem) => elem.id === listenerId);
    this.userListeners.splice(idx, 1);
  }

  notifyUserListeners() {
    for (let ul of this.userListeners) {
      ul.callback();
    }
  }

  initUsersOnSnapshot() {
    onSnapshot(collection(db, "users"), (qSnap) => {
      if (qSnap.empty) return;
      let userList = [];
      qSnap.forEach((docSnap) => {
        let user = docSnap.data();
        user.key = docSnap.id;
        userList.push(user);
      });
      this.users = userList;
      this.notifyUserListeners();
    });
  }

  getUsers() {
    return this.users;
  }

  getUserForID(id) {
    for (let u of this.users) {
      if (u.key === id) {
        return u;
      }
    }
    return null;
  }

  async getUserForAuthUser(authUser) {
    const userAuthId = authUser.uid;
    for (let u of this.users) {
      if (u.authId === userAuthId) {
        return u;
      }
    }
    // if we got here, it's a new user
    let newUser = await this.createUser(authUser);
    return newUser;
  }

  async createUser(authUser) {
    let newUser = {
      displayName: authUser.providerData[0].displayName,
      authId: authUser.uid,
      // budget: info.budget,
      // breakfast:info.breakfast,
      // lunch:info.lunch,
      // dinner:info.dinner
    };
    const userDoc = await addDoc(collection(db, "users"), newUser);
    newUser.key = userDoc.id;
    this.notifyUserListeners();
    return newUser;
  }

  async updateItem(key,info) {
    await updateDoc(doc(db, "users", key), info
    
    );
    this.notifyUserListeners();
  }
}

let theDataModel = undefined;

export function getDataModel() {
  if (!theDataModel) {
    theDataModel = new DataModel();
  }
  return theDataModel;
}
