/*  Imports from Redux:
 applyMiddleware: Applies middleware to the dispatch method of the Redux store
 combineReducers: Merges reducers into one
 createStore: Creates a Redux store that holds the state tree
 Store: The TS Type used for the store, or state tree
 */
import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
/*  Thunk
Redux Thunk middleware allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. The inner function receives the store methods dispatch and getState as parameters.
*/
import RoleTogglerRedux from "../reducers/roleToggler";
import thunk from "redux-thunk";
// Import reducers and state type
// import
import { homeState, homeReducer } from "../reducers/homeReducers";
import {
  accountNameState,
  accountNameReducer,
} from "../reducers/AccountNameReducers";
import {
  domainNameState,
  domainNameReducer,
} from "../reducers/SelectDomainNameReducers";
import {
  selectDomainApiState,
  selectDomainApiReducer,
} from "../reducers/SelectDomainApiReducers";
import {
  getAllAccountbyDomainApiState,
  getAllAccountByDomainApiReducer,
} from "../reducers/GetAllAccountByDomainApiReducers";
import {
  messageListState,
  navigationReducer,
} from "../reducers/NavigationReducers";
import {
  getAllAccountbyAccountNameApiState,
  getAllAccountByAccountNameApiReducer,
} from "../reducers/GetAllAccountByAccountNameReducers";
import {
  getAllTableDataApiState,
  getAllTableDataApiReducer,
} from "../reducers/GetAllTableApiReducers";
import {
  getAllConversationApiState,
  getAllConversationDataApiReducer,
} from "../reducers/GetAllConversationReducers";
import {
  assignProjectState,
  assignProjectApiReducer,
} from "../reducers/AssignProjectReducers";
import { landingState, landingReducer } from "../reducers/LandingReducers";
import {
  pushAccountState,
  PushAccountPageReducer,
} from "../reducers/PushAccountPageReducer";
import {
  popupState,
  popupUploadoadReducer,
} from "../reducers/PopupUploadFileReducer";
import { loginState, loginReducer } from "../reducers/loginReducers";
import {
  lodderUpdateState,
  lodderUpdateReducer,
} from "../reducers/LodderUpdatesReducer";
import { IUserState, userReducer } from "../reducers/SetUserReducer";
import {
  AssignTaskState,
  assignTaskReducer,
} from "../reducers/SetAssignTaskReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import { RoleTogglerState } from "../reducers/roleToggler/roleToggler";
import { DemoReducer } from "../reducers/demo/Demo.reducer";
import { DemoState } from "../reducers/demo/Demo.interface";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./rootSaga";

const persistAccountDataConfig = {
  key: "Account",
  storage: storage,
  whitelist: ["accountName"],
};

const persistDomainNameconfig = {
  key: "Domain",
  storage: storage,
  whitelist: ["domainName"],
};
const persistSelectDomainNameconfig = {
  key: "Selectdomain",
  storage: storage,
  whitelist: ["selectDomainApi"],
};
const persistAllAccountconfig = {
  key: "Allaccount",
  storage: storage,
  whitelist: [
    "getAllAccountBydomain",
    "projectsList",
    "projectDetail",
    "selectedProjectName",
  ],
};

const persistNavigationconfig = {
  key: "Navigation",
  storage: storage,
  whitelist: ["messageList", "conversationId"],
};

const persistAllConversationDataconfig = {
  key: "Conversation",
  storage: storage,
  whitelist: ["getAllConversationData", "selectedMessage"],
};

const persistAllTableDataconfig = {
  key: "TableData",
  storage: storage,
  whitelist: ["getAllTableData", "getAllTableDatabyProject"],
};

const persistUserSelectedConfig = {
  key: "UserCheckedData",
  storage: storage,
  whitelist: ["check"],
};

const persistAssignTaskConfig = {
  key: "AssignTaskData",
  storage: storage,
  whitelist: ["AssignTask"],
};

const persistAllAccountyByAccountNameconfig = {
  key: "Account",
  storage: storage,
  whitelist: ["getAllAccountByAccountName"],
};

const persistProjectconfig = {
  key: "Project",
  storage: storage,
  whitelist: [
    "assignedProjectList",
    "assignedProjectListClientWise",
    "assignedProjectDetails",
    "assignedAccountName",
    "allLanguageList",
  ],
};

const persistLandingconfig = {
  key: "Landing",
  storage: storage,
  whitelist: ["conversationList", "selectConversationInfo", "listLoader"],
};

const persistAccountPageconfig = {
  key: "AccountPage",
  storage: storage,
  whitelist: ["pushState"],
};

const persistPopUpConfig = {
  key: "PopUpPage",
  storage: storage,
  whitelist: [
    "filename",
    "filedata",
    "fileurl",
    "languages",
    "datatype",
    "datalevel",
    "audioformat",
  ],
};

const persistLoginConfig = {
  key: "LoginInfo",
  storage: storage,
  whitelist: ["logInData"],
};
const persistConfigRoleToggler = {
  key: "roleToggler",
  storage: storage,
};
const persistLodderUpdateConfig = {
  key: "LodderUpdate",
  storage: storage,
  whitelist: ["lodderupdate"],
};

// Create an interface for the application state
export interface IAppState {
  demoReducer: DemoState;
  homeState: homeState;
  accountNameState: accountNameState;
  domainNameState: domainNameState;
  selectDomainApiData: selectDomainApiState;
  getAllAccountByDomainState: getAllAccountbyDomainApiState;
  messageListState: messageListState;
  getAllAccountbyAccountNameApiState: getAllAccountbyAccountNameApiState;
  getAllTableDataApiState: getAllTableDataApiState;
  getAllConversationApiState: getAllConversationApiState;
  assignProjectDataState: assignProjectState;
  conversationLandingState: landingState;
  pushAccountState: pushAccountState;
  popupState: popupState;
  loginState: loginState;
  lodderUpdateState: lodderUpdateState;
  IUserState: IUserState;
  AssignTaskState: AssignTaskState;
  RoleToggler: RoleTogglerState;
}

// Create the root reducer
const rootReducer = combineReducers({
  demoReducer: DemoReducer,
  RoleToggler: persistReducer(
    persistConfigRoleToggler,
    RoleTogglerRedux.reducer
  ),
  homeState: homeReducer,
  IUserState: persistReducer(persistUserSelectedConfig, userReducer),
  AssignTaskState: persistReducer(persistAssignTaskConfig, assignTaskReducer),
  accountNameState: persistReducer(
    persistAccountDataConfig,
    accountNameReducer
  ),
  domainNameState: persistReducer(persistDomainNameconfig, domainNameReducer),
  selectDomainApiData: persistReducer(
    persistSelectDomainNameconfig,
    selectDomainApiReducer
  ),
  getAllAccountByDomainState: persistReducer(
    persistAllAccountconfig,
    getAllAccountByDomainApiReducer
  ),
  messageListState: persistReducer(persistNavigationconfig, navigationReducer),
  getAllAccountbyAccountNameApiState: persistReducer(
    persistAllAccountyByAccountNameconfig,
    getAllAccountByAccountNameApiReducer
  ),
  getAllTableDataApiState: persistReducer(
    persistAllTableDataconfig,
    getAllTableDataApiReducer
  ),
  getAllConversationApiState: persistReducer(
    persistAllConversationDataconfig,
    getAllConversationDataApiReducer
  ),
  assignProjectDataState: persistReducer(
    persistProjectconfig,
    assignProjectApiReducer
  ),
  conversationLandingState: persistReducer(
    persistLandingconfig,
    landingReducer
  ),
  pushAccountState: persistReducer(
    persistAccountPageconfig,
    PushAccountPageReducer
  ),
  popUpState: persistReducer(persistPopUpConfig, popupUploadoadReducer),
  loginState: persistReducer(persistLoginConfig, loginReducer),
  lodderUpdateState: persistReducer(
    persistLodderUpdateConfig,
    lodderUpdateReducer
  ),
});

// // Create a configure store function of type `IAppState`
// export default function configureStore(): Store<IAppState, any> {
//   const store = createStore(rootReducer, applyMiddleware(thunk));
//   return store;
// }

const composeEnhancers = composeWithDevTools({});
const sagaMiddleware = createSagaMiddleware();
const middlewares = [thunk, sagaMiddleware];

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);
  middlewares.push();
}

function confiqureStore() {
  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middlewares))
  );
}

export const store = confiqureStore();
sagaMiddleware.run(rootSaga);
export const persistor = confiqureStore();
