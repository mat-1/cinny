import EventEmitter from 'events';
import * as sdk from 'matrix-js-sdk';
import Olm from '@matrix-org/olm';
// import { logger } from 'matrix-js-sdk/lib/logger';

import { secret } from './state/auth';
import RoomList from './state/RoomList';
import AccountData from './state/AccountData';
import RoomsInput from './state/RoomsInput';
import Notifications from './state/Notifications';
import { cryptoCallbacks } from './state/secretStorageKeys';
import navigation from './state/navigation';

global.Olm = Olm;

// logger.disableAll();

class InitMatrix extends EventEmitter {
  constructor() {
    super();

    navigation.initMatrix = this;
  }

  async init() {
    if (this.matrixClient) {
      console.warn('Client is already initialized!')
      return;
    }

    await this.startClient();
    this.setupSync();
    this.listenEvents();
  }

  async startClient() {
    const indexedDBStore = new sdk.IndexedDBStore({
      indexedDB: global.indexedDB,
      localStorage: global.localStorage,
      dbName: 'web-sync-store',
    });
    await indexedDBStore.startup();

    this.matrixClient = sdk.createClient({
      baseUrl: secret.baseUrl,
      accessToken: secret.accessToken,
      userId: secret.userId,
      store: indexedDBStore,
      cryptoStore: new sdk.IndexedDBCryptoStore(global.indexedDB, 'crypto-store'),
      deviceId: secret.deviceId,
      timelineSupport: true,
      cryptoCallbacks,
      verificationMethods: [
        'm.sas.v1',
      ],
    });

    await this.matrixClient.initCrypto();

    await this.matrixClient.startClient({
      lazyLoadMembers: true,
    });
    this.matrixClient.setGlobalErrorOnUnknownDevices(false);
  }

  setupSync() {
    const sync = {
      NULL: () => {
        console.log('NULL state');
      },
      SYNCING: () => {
        console.log('SYNCING state');
      },
      PREPARED: (prevState) => {
        console.log('PREPARED state');
        console.log('Previous state: ', prevState);
        // TODO: remove global.initMatrix at end
        global.initMatrix = this;
        if (prevState === null) {
          this.roomList = new RoomList(this.matrixClient);
          this.accountData = new AccountData(this.roomList);
          this.roomsInput = new RoomsInput(this.matrixClient, this.roomList);
          this.notifications = new Notifications(this.roomList);
          this.emit('init_loading_finished');
          this.notifications._initNoti();
        } else {
          this.notifications?._initNoti();
        }
      },
      RECONNECTING: () => {
        console.log('RECONNECTING state');
      },
      CATCHUP: () => {
        console.log('CATCHUP state');
      },
      ERROR: () => {
        console.log('ERROR state');
      },
      STOPPED: () => {
        console.log('STOPPED state');
      },
    };
    this.matrixClient.on('sync', (state, prevState) => sync[state](prevState));
  }

  listenEvents() {
    this.matrixClient.on('Session.logged_out', async () => {
      this.matrixClient.stopClient();
      await this.matrixClient.clearStores();
      window.localStorage.clear();
      window.location.reload();
    });
  }

  async logout() {
    this.matrixClient.stopClient();
    try {
      await this.matrixClient.logout();
    } catch {
      // ignore if failed to logout
    }
    await this.matrixClient.clearStores();
    window.localStorage.clear();
    window.location.reload();
  }

  clearCacheAndReload() {
    this.matrixClient.stopClient();
    this.matrixClient.store.deleteAllData().then(() => {
      window.location.reload();
    });
  }
}

const initMatrix = new InitMatrix();

export default initMatrix;
