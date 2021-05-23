# game-recorder
Record videos programmatically. Using OBS and the game of your choice, you can use this library of components to set up automatic recording of videos.

We've used this for recording Dota 2 replays, and now the goal is to extend this to other games.

Currently only for Windows.

## Recording

### `OBSRecorder`

We currently only support OBS, because it is widely known and used. It has a rich feature set and can be interacted with using web sockets, which makes it easy to implement. 

Requires that you install the [`obs-websocket` plugin](https://github.com/Palakis/obs-websocket/releases/tag/4.9.0) into your OBS.

## Interacting with the game process
To interact with your game, you may have to read and write some data to your process.

### `MemoryReader`

For reading/writing game state from/to memory.

Using CheatEngine / Process Hacker, you can find the memory addresses of any game state you'd like to read from your game process, then enter those memory addresses into `MemoryReader`. 

### `GameConsole`

If your game has a console, you can use the `GameConsole` class to interact with it. You need to configure it with some key bindings. This has the limitation that the correct window needs to be focused.
