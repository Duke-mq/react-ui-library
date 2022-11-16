import Button from "./components/Button/button";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button btnType="danger">危险按钮</Button>
        <Button btnType="primary" size="lg">
          大号主按钮
        </Button>
        <Button btnType="primary" size="sm">
          中号主按钮
        </Button>
        <Button disabled>禁用按钮</Button>
        <Button
          btnType="link"
          href="www.baidu.com"
          onClick={() => {
            console.log("点击不被禁用的按钮");
          }}
        >
          a按钮不被禁用
        </Button>
        <Button
          btnType="link"
          href="www.baidu.com"
          disabled
          onClick={() => {
            console.log("点击被禁用按钮");
          }}
        >
          a标签按钮禁用
        </Button>
      </header>
    </div>
  );
}

export default App;
