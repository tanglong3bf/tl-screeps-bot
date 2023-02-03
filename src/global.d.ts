declare module NodeJS {
    interface globalThis {
        Game: Game
        Memory: Memory
        _: _.LoDashStatic
    }
}
