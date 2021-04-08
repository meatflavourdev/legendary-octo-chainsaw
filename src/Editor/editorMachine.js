import { Machine, assign } from "xstate";
import { inspect } from "@xstate/inspect";

inspect({
  url: "https://statecharts.io/inspect",
  iframe: false
});

const editorMachine = Machine({
  id: 'editor',
  initial: 'idle',
  context: {
    auth_retries: 0,
    access_retries: 0,
    sync_retries: 0,
  },
  states: {
    idle: {
      on: {
        RESOLVE: 'resolving',
      },
    },
    resolving: {
      on: {
        EXISTS: 'checking_auth',
        NOT_EXISTS: 'failure_404',
      },
    },
    failure_404: {
      on: {
        NAVIGATE: {
          target: 'resolving',
          actions: [
            assign({ auth_retries: (context) => 0 }),
            assign({ access_retries: (context) => 0 }),
            assign({ sync_retries: (context) => 0 }),
          ],
        },
      },
    },
    checking_auth: {
      on: {
        AUTHED: 'accessing',
        NOT_AUTHED: 'authenticating',
      },
    },
    authenticating: {
      on: {
        RESOLVE: 'accessing',
        REJECT: 'failure_auth',
      },
    },
    failure_auth: {
      on: {
        RETRY_AUTH: {
          target: 'authenticating',
          actions: assign({
            auth_retries: (context, event) => context.auth_retries + 1,
          }),
        },
      },
    },
    accessing: {
      on: {
        PUBLIC: 'syncing',
        ACCESS_GRANTED: 'syncing',
        ACCESS_DENIED: 'failure_notauthorized',
        PRIVATE: 'failure_notauthorized',
        REJECT: 'failure_accessing',
      },
    },
    failure_accessing: {
      on: {
        RETRY_ACCESS: {
          target: 'accessing',
          actions: assign({
            access_retries: (context, event) => context.access_retries + 1,
          }),
        },
      },
    },
    failure_notauthorized: {
      on: {
        NAVIGATE: {
          target: 'resolving',
          actions: [
            assign({ auth_retries: (context) => 0 }),
            assign({ access_retries: (context) => 0 }),
            assign({ sync_retries: (context) => 0 }),
          ],
        },
      },
    },
    syncing: {
      on: {
        RESOLVE: 'synced',
        REJECT: 'failure_sync',
      },
    },
    failure_sync: {
      on: {
        RETRY_SYNC: {
          target: 'syncing',
          actions: assign({
            sync_retries: (context, event) => context.sync_retries + 1,
          }),
        },
      },
    },
    synced: {
      on: {
        NAVIGATE: {
          target: 'resolving',
          actions: [
            assign({ auth_retries: (context) => 0 }),
            assign({ access_retries: (context) => 0 }),
            assign({ sync_retries: (context) => 0 }),
          ],
        },
      },
    },
  },
});

export default editorMachine;
