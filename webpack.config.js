module.exports = (env) => {
  return require(`./webpack.${env.target}.js`);
};
