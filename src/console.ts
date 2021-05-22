import robot from "robotjs";

export type ConsoleConfig = {
    bindings: {
        toggleConsole: string;
        enter: string;
    }
}

export class Console {
    private config: ConsoleConfig;

    constructor(config: ConsoleConfig) {
        this.config = config;
    }

    private typeString(str: string) {
        robot.typeStringDelayed(str, 100);
    }

    private keyTap(key: string) {
        robot.keyTap(key);
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
