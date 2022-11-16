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
        <Button btnType="link" href="https://google.com">
          link button
        </Button>
        <Button
          btnType="link"
          href="www.baidu.com"
          target="_blank"
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
