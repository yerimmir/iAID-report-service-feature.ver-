const path = require("path");

module.exports = {
    core: {
        //builder: "webpack5",
    },
    webpackFinal: async (config) => {
        config.resolve.modules = [
            ...(config.resolve.modules || []),
            path.resolve(__dirname, "../src"),
        ];

        return config;
    },
    stories: [
        "../src/**/*.stories.mdx",
        "../src/**/*.stories.@(js|jsx|ts|tsx)",
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/preset-scss",
        "@storybook/addon-postcss",
    ],
    typescript: {
        check: false,
        checkOptions: {},
        reactDocgen: "react-docgen-typescript",
        reactDocgenTypescriptOptions: {
            shouldExtractLiteralValuesFromEnum: true,
            propFilter: (prop) =>
                prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
        },
    },
};
