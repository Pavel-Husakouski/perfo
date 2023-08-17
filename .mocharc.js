module.exports = {
    delay: false,
    package: './package.json',
    require: [
        'ts-node/register',
        'test/bootstrap',
    ],
    ui: 'bdd',
    spec: 'test/**/*.spec.ts',
}
