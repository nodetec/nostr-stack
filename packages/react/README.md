# nostr-stack/react

This package contains binding to use nostr inside of react. This is built on top of `@nostr/core`.

There is a collection of hooks that provide easy APIs for fetching things like `UserProfile` data.

## API

### Relay

`useRelays` - Used to deal with sending and reading messages from multiple relays. Relays can be customized per request, or all relays can be used.

`useRelay` - Used to connect to a single relay. This is just a wrapper around the relay pool used in `useRelays`

### User

`useProfile` - Get a profile from a pubkey. You can specify `{cache: true}` to persist for just the session, or `{cache: true, persist: true}` to save profiles to localstorage

`useProfiles` - Simlar to `useProfile`, but will fetch multiple profiles in a single request.
