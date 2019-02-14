// require js configuration - entry point definition
requirejs.congig({
    baseUrl: './common/js/libs',
    paths: {
        app: '../../../app'
    }
});

requirejs(['app/main']);