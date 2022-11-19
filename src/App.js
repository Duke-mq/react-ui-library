import Button from "./components/Button/button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";

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
          <MenuItem>cool link</MenuItem>
          <MenuItem disabled>cool link 2</MenuItem>
          <MenuItem>cool link3</MenuItem>
          <li>1</li>
        </Menu>
        <Menu
          defaultIndex={0}
          mode="vertical"
          onSelect={(index) => {
            console.log(index);
          }}
        >
          <MenuItem>cool link</MenuItem>
          <MenuItem>cool link 2</MenuItem>
          <MenuItem>cool link3</MenuItem>
          <SubMenu title="子菜单">
            <MenuItem>子菜单项1</MenuItem>
            <MenuItem>子菜单项2</MenuItem>
            <MenuItem>子菜单项3</MenuItem>
          </SubMenu>
        </Menu>
      </header>
    </div>
  );
}

export default App;
