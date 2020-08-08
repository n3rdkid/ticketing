// Setting up webpack to bring every directory and files in them every 300 ms rather than listening for change

module.exports = {
    webpackDevMiddleware: (config) => {
        config.watchOptions.poll = 300;
        return config;
    }
}