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
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  getAuth
} from "firebase/firestore";
import { firebaseConfig } from "./Secrets";

let app;
if (getApps().length == 0) {
  app = initializeApp(firebaseConfig);
}
const db = initializeFirestore(app, {
  useFetchStreams: false,
});

// const auth = getAuth(); 

class DataModel {
  constructor() {
    this.users = [];
    this.userListeners = [];
    this.userSnapshotUnsub = undefined; 
    this.subscribers = [];
    this.restsearchlist=[]
    this.recipesearchlist=[]
    this.initUsersOnSnapshot();
    this.initResOnSnapshot();
    this.initRecipeOnSnapshot();
  }

  initOnAuth() {
    if (this.userSnapshotUnsub) {
      this.userSnapshotUnsub();
    }
    this.userSnapshotUnsub = onSnapshot(collection(db, 'users'), qSnap => {
      let updatedUsers = [];
      qSnap.forEach(docSnap => {
        let user = docSnap.data();
        user.key = docSnap.id;
        updatedUsers.push(user);
      });
      this.users = updatedUsers;
      this.notifyUserListeners();
    });
  }

  disconnectOnSignout() {
    if (this.userSnapshotUnsub) {
      this.userSnapshotUnsub();
      this.userSnapshotUnsub = undefined;
    }
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
      if (u.authId === id) {
        return u.key;
      }
    }
    return null;
  }

  async getCurrentUserDisplayName(userid) {
    // const authUser = auth.currentUser;
    const userDocSnap = await getDoc(doc(db, 'users', userid));
    const user = userDocSnap.data();
    return user.displayName;
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

  subscribeToUpdates(callback) {
    this.subscribers.push(callback);
  }

  updateSubscribers() {
    for (let sub of this.subscribers) {
      sub(); // just tell them there's an update
    }
  }

  initResOnSnapshot() {
    onSnapshot(collection(db, "restaurants"), (qSnap) => {
      if (qSnap.empty) return;
      let resList = [];
      qSnap.forEach((docSnap) => {
        let res = docSnap.data();
        res.key = docSnap.id;
        resList.push(res);
      });
      this.restsearchlist = resList;
      this.updateSubscribers();
    });
  }

  getRes(){
    return this.restsearchlist
  }

  initRecipeOnSnapshot() {
    onSnapshot(collection(db, "recipes"), (qSnap) => {
      if (qSnap.empty) return;
      let recList = [];
      qSnap.forEach((docSnap) => {
        let rec = docSnap.data();
        rec.key = docSnap.id;
        recList.push(rec);
      });
      this.recipesearchlist = recList;
      this.updateSubscribers();
    });
  }

  getRecipes(){
    return this.recipesearchlist
  }
}

let theDataModel = undefined;

export function getDataModel() {
  if (!theDataModel) {
    theDataModel = new DataModel();
  }
  return theDataModel;
}
