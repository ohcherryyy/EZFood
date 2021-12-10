import { ConsoleSqlOutlined, InfoCircleFilled } from "@ant-design/icons";
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
  getDocs,
  addDoc,
  deleteDoc,
  setDoc,
  updateDoc,
  getAuth,
  where,
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
    this.userinfo = [];
    this.fav = false;
    this.favlist=[]
    this.deletekey;
    this.ressubscribers = [];
    this.recsubscribers = [];
    this.restsearchlist = [];
    this.menulist = [];
    this.showbudget = false;
    this.budgetlist = [];
    this.budgetprice = [];
    this.recipesearchlist = [];
    this.initUsersOnSnapshot();
    this.initResOnSnapshot();
    this.initRecipeOnSnapshot();
  }
  //user

  initOnAuth() {
    if (this.userSnapshotUnsub) {
      this.userSnapshotUnsub();
    }
    this.userSnapshotUnsub = onSnapshot(collection(db, "users"), (qSnap) => {
      let updatedUsers = [];
      qSnap.forEach((docSnap) => {
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
    const userDocSnap = await getDoc(doc(db, "users", userid));
    const user = userDocSnap.data();
    const list = [];
    list.push(
      user.displayName,
      user.budget,
      user.day,
      user.breakfast,
      user.lunch,
      user.dinner
    );
    return list;
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

  async updateItem(key, info) {
    await updateDoc(doc(db, "users", key), info);
    this.notifyUserListeners();
  }

  favOnsnapshot(key) {
    const q = doc(db, "users", key);
    const favRef = collection(q, "favorite");
    onSnapshot(favRef, (qSnap) => {
      let favList = [];
      qSnap.forEach((docSnap) => {
        let fav = docSnap.data();
        fav.key = docSnap.id;
        favList.push(fav);
      });
      this.favlist = favList;
      this.updateResSubscribers();
    });
  }

  getfav(){
    console.log("get")
    console.log(this.favlist)
    return this.favlist
  }

  initfavlist(key, info) {
    var added = true;
    const q = doc(db, "users", key);
    const favRef = collection(q, "favorite");
    onSnapshot(query(favRef, where("id", "==", info)), (qSnap) => {
      if (qSnap.empty) {
        added = false;
      } else {
        added = true;
        qSnap.forEach((docSnap) => {
          let fav = docSnap.data();
          fav.key = docSnap.id;
          this.deletekey = fav.key;
        });
      }
      this.fav = added;
    });
    this.updateResSubscribers();
    return this.fav;
  }

  async addtofav(key, favinfo) {
    const q = doc(db, "users", key);
    const favRef = collection(q, "favorite");
    await addDoc(favRef, favinfo);
  }

  async removefav(key) {
    const q = doc(db, "users", key);
    const favRef = doc(q, "favorite",this.deletekey);
    console.log(this.deletekey);
    if (this.deletekey) {
      await deleteDoc(favRef);
    }
  }

  //restaurant info

  subscribeToResUpdates(callback) {
    this.ressubscribers.push(callback);
  }

  updateResSubscribers() {
    for (let sub of this.ressubscribers) {
      sub(); // just tell them there's an update
    }
  }

  searchRestaurants(text) {
    if (text) {
      const q = query(
        collection(db, "restaurants"),
        where("name", ">=", text),
        where("name", "<=", text + "\uf8ff")
      );
      onSnapshot(q, (qSnap) => {
        if (qSnap.empty) return;
        let recList = [];
        qSnap.forEach((docSnap) => {
          let rec = docSnap.data();
          rec.key = docSnap.id;
          recList.push(rec);
        });
        this.restsearchlist = recList;
        this.updateResSubscribers();
      });
    } else {
      this.initResOnSnapshot();
    }
  }

  getBudget(key) {
    for (u of this.users) {
      if (u.key === key) {
        let month = u.budget;
        let day = u.day;
        let breakfast = u.breakfast;
        let lunch = u.lunch;
        let dinner = u.dinner;
        let b = (month * (breakfast * 0.01)) / day;
        let l = (month * (lunch * 0.01)) / day;
        let d = (month * (dinner * 0.01)) / day;
        let budgetlist = [b, l, d];
        this.budgetprice = budgetlist;
      }
    }
  }

  getbugetlist() {
    return this.budgetprice;
  }

  initResOnSnapshot() {
    onSnapshot(collection(db, "restaurants"), (qSnap) => {
      if (qSnap.empty) return;
      let resList = [];
      qSnap.forEach((docSnap) => {
        let res = docSnap.data();
        res.key = docSnap.id;
        if (this.showbudget) {
          for (u of this.budgetlist) {
            if (res.key === u) {
              resList.push(res);
            }
          }
        } else {
          resList.push(res);
        }
      });
      this.restsearchlist = resList;
      this.updateResSubscribers();
    });
  }

  getshowbudget() {
    return this.showbudget;
  }

  changeshowbudget() {
    this.showbudget = !this.showbudget;
    this.updateResSubscribers();
  }

  budgetRes(i) {
    bug = this.budgetprice[i];
    var q = query(collection(db, "menu"), where("price", "<=", bug));
    onSnapshot(q, (qSnap) => {
      let reslist = [];
      let menulist = [];
      qSnap.forEach((docSnap) => {
        let res = docSnap.data();
        res.key = docSnap.id;
        if (!reslist.includes(res.resid)) {
          reslist.push(res.resid);
        }
        menulist.push(res.key);
      });
      this.budgetlist = reslist;
      this.menulist = menulist;
      console.log(this.menulist);
      this.updateResSubscribers();
      this.initResOnSnapshot();
    });
  }

  async getresinfo(id) {
    const resDocSnap = await getDoc(doc(db, "restaurants", id));
    const res = resDocSnap.data();
    // this.updateResSubscribers();
    return res;
  }

  async menuOnSnapshot(id) {
    const q = query(collection(db, "menu"), where("resid", "==", id));
    var menulist = [];
    var newlist = [];
    const menuDocRep = await getDocs(q);
    menuDocRep.forEach((doc) => {
      const res = doc.data();
      res.key = doc.id;
      menulist.push(res);
    });
    // console.log(this.comparemenu(menulist))
    this.updateResSubscribers();
    return this.comparemenu(menulist);
  }

  comparemenu(menulist) {
    var nowlsist = this.menulist;
    for (u of menulist) {
      if (nowlsist.includes(u.key)) {
        u.req = true;
      } else {
        u.req = false;
      }
    }
    return menulist;
  }

  getRes() {
    return this.restsearchlist;
  }

  //recipe list
  subscribeToRecUpdates(callback) {
    this.recsubscribers.push(callback);
  }

  updateRecSubscribers() {
    for (let sub of this.recsubscribers) {
      sub(); // just tell them there's an update
    }
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
      this.updateRecSubscribers();
    });
  }

  getRecipes() {
    return this.recipesearchlist;
  }

  searchRecipes(text) {
    if (text) {
      const q = query(
        collection(db, "recipes"),
        where("name", ">=", text),
        where("name", "<=", text + "\uf8ff")
      );
      onSnapshot(q, (qSnap) => {
        if (qSnap.empty) return;
        let recList = [];
        qSnap.forEach((docSnap) => {
          let rec = docSnap.data();
          rec.key = docSnap.id;
          recList.push(rec);
        });
        this.recipesearchlist = recList;
        this.updateRecSubscribers();
      });
    } else {
      this.initRecipeOnSnapshot();
    }
  }

  filterRecipes(category, min, max) {
    if (min && max != null) {
      var q = query(
        collection(db, "recipes"),
        where(category, ">=", min),
        where(category, "<", max)
      );
      console.log("0-30");
    } else if (!min) {
      var q = query(collection(db, "recipes"), where(category, "==", max));
    } else if (max === null) {
      var q = query(collection(db, "recipes"), where(category, ">", min));
      console.log("60");
    }
    onSnapshot(q, (qSnap) => {
      var recList = [];
      if (qSnap.empty) {
        recList = [{ name: "No result" }];
      }
      qSnap.forEach((docSnap) => {
        let rec = docSnap.data();
        rec.key = docSnap.id;
        recList.push(rec);
      });
      this.recipesearchlist = recList;
      this.updateRecSubscribers();
    });
  }
}

let theDataModel = undefined;

export function getDataModel() {
  if (!theDataModel) {
    theDataModel = new DataModel();
  }
  return theDataModel;
}
