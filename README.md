## React component library

## 使用 React+typescript 从零到一打造一套你自己的组件库

```bash
//启动本地环境
npm run stroybook

//跑单元测试
npm test

//build可发布静态文件
npm run build

//发布到 npm
npm run publish
```

note: jest, 是一个测试框架，又称为一个断言库,
可以通过 npx jest jest.test.js --watch 命令让其一直跑测试用例
React 官方推荐 React Testing Library 还有另外一款测试工具叫 Enzyme
其中 jest / React Testing Library 都是脚手架自带的
文档地址为:https://pjchender.dev/react/note-react-testing/

jesting-library 其中有三个比较主要的部分
"@testing-library/jest-dom" 提供更多断言
"@testing-library/react"
"@testing-library/user-event"

写完测试用例之后直接跑 yarn run test,会调用 react-script 执行测试用例
