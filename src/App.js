import Button from "./components/Button/button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";

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
        <Menu
          defaultIndex={0}
          onSelect={(index) => {
            alert(index);
          }}
        >
          <MenuItem index={1}>cool link</MenuItem>
          <MenuItem index={2} disabled>
            cool link 2
          </MenuItem>
          <MenuItem index={3}>cool link3</MenuItem>
        </Menu>
      </header>
    </div>
  );
}

export default App;
