import { menuDatas } from "./menuData";
import MenuItems from "./MenuItems";
import "./NavBar.css"
const Navbar = (props) => {
  const getChangedDetails = (data) => {
    console.log(data)
    let Fldata = data.map((each) => {
      return {
        title: each.accountName,
        submenu: each.projects.map((er)=>{
          return {title:er.project}
        }),
      };
    });
    return Fldata;
  };

let formattedData = getChangedDetails(props.mapData);
console.log(formattedData)
  return (
    <nav>
      <input/>
      <ul className="menus">
        {formattedData.map((menu, index) => {
          const depthLevel = 0;
          return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
        })}
      </ul>
    </nav>
  );
};

export default Navbar