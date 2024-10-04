function isWebTarget(caller) {
    return Boolean(caller && caller.target === "web");
}

function isWebpack(caller) {
    return Boolean(caller && caller.name === "babel-loader");
}

module.exports = (api) => {
    const web = api.caller(isWebTarget);
    const webpack = api.caller(isWebpack);

    return {
        presets: [
            "@babel/preset-react",
            [
                "@babel/preset-env",
                {
                    useBuiltIns: web ? "entry" : undefined,
                    targets: !web ? { node: "current" } : undefined,
                    modules: webpack ? false : "commonjs",
                },
            ],
            "@babel/preset-typescript",
        ],
        plugins: [
            ["@loadable/babel-plugin"],
            ["babel-plugin-typescript-to-proptypes", { comments: true }],
            ["@babel/plugin-transform-runtime"],
        ],
    };
};

/*
{
    "presets": [
        [
            "@babel/preset-env",
            { "targets": { "browsers": ["last 2 versions", ">= 5% in KR"] } }
        ],
        "@babel/react",
        "@babel/typescript"
    ],
    "plugins": [
        ["babel-plugin-typescript-to-proptypes", { "comments": true }],
        ["@babel/plugin-transform-runtime"]
    ]
}
*/
