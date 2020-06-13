# Building Hermes

Apple ID credentials go in a .env file in project root

```text
APPLEID=XXXXX
APPLEIDPASS=XXXXX
```

To build the app:

```text
npm run dist
```

Debugging the app on osX:

```text
lldb /path/to/Hermes.app
run --remote-debugging-port=8315
```

To publish a release to Github:

```text
npm run publish
```
