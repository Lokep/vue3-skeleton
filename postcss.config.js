export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*'], // 设置px转换成rem的属性值，*表示所有属性的px转换为rem
      unitPrecision: 5, // 保留rem小数点多少位
      exclude: (file) => {
        const ignore = ['views', 'node_modules/vant'];
        return Boolean(ignore.find((item) => file.indexOf(item) !== -1));
      },
    },
  },
};
