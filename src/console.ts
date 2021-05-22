import { typeStringDelayed, keyTap } from "robotjs";

export type GameConsoleConfig = {
    bindings: {
        toggleConsole: string;
        enter: string;
    }
}

export class GameConsole {
    private config: GameConsoleConfig;

    constructor(config: GameConsoleConfig) {
        this.config = config;
    }

    private typeString(str: string) {
        typeStringDelayed(str, 100);
    }

    private keyTap(key: string) {
        keyTap(key);
    }

    private toggleConsole() {
        this.keyTap(this.config.bindings.toggleConsole);
    }

    /**
     * Enter a command into the game console
     * @param str
     */
    enterCommand(str: string) {
        this.toggleConsole();
        this.typeString(str);
        this.keyTap(this.config.bindings.enter);
        this.toggleConsole();
    }

    /**
     * Enter multiple commands into the console in succession
     * @param strs
     */
    enterCommands(strs: string[]) {
        this.toggleConsole();
        strs.forEach((s) => {
            this.typeString(s);
            this.keyTap(this.config.bindings.enter);
        });
        this.toggleConsole();
    }
}
