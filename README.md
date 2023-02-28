# nostr-stack

Welcome to nostr-stack - a framework agnostic library for building UIs for nostr on the web. This open-source project is designed to provide developers with a collection of easy-to-use primitives for creating common interactions on their clients, such as profile metadata, nip05 verifications, lightning zaps, and more.

The goal of nostr-stack is to simplify the process of building UIs by providing pre-built components that developers can easily plug into their projects. The library is designed to be flexible and adaptable to a wide range of use cases, making it ideal for both small and large-scale web applications.

In addition to providing a set of primitives, nostr-stack also offers adapters for specific frameworks, allowing developers to easily integrate the library into their existing projects.

nostr-stack was inspired by the success of [TanStack](https://github.com/TanStack) and aims to build on their innovative approach to web development. We hope that by providing developers with a powerful set of tools, we can help make web development more accessible and enjoyable for everyone.

## Getting Started

This repo uses node 18 (LTS) and [pnpm workspaces](https://pnpm.io/workspaces)

- Clone this repo
- Install Dependencies `pnpm install`
- You're good to go!

## Testing

[Vitest](https://vitest.dev/)

Out of the box, this will expect a relay to be running at `ws://localhost:8080`. This can be easily spun up with `docker` by running

```
docker compose up -d relay
```

at the root of this repo.

This is less than ideal, but it's easier than mocking for now.
