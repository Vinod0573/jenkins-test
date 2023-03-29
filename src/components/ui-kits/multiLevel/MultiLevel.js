import React,{useRef} from 'react';
import Dropdown from "react-multilevel-dropdown";
import DropIcon from "../../../assets/dropdownIcon.svg";
import "./MultiLevel.css"

function MultiLevel(props) {
   
        const ref=useRef()
      const getChangedDetails = (data) => {
        console.log(data)
        let Fldata = data.map((each) => {
          return {
            name: each.accountName,
            children: each.projects.map((er)=>{
              return {name:er.project}
            }),
          };
        });
        return Fldata;
      };
      function showDropdown(e) {
        if (ref.current) {
          ref.current.toggle(e);
        }
      }
    
  
  let formattedData = getChangedDetails(props.mapData);
  const menus=[{
      name: props.selectedParentChild?.length>0?props.selectedParentChild:"Select Client",
      children:formattedData
  }]


  
  console.log(formattedData)
      return (
        <div className='multi-level-dropdown'>
          {menus.map((menu) => (
            <Dropdown
            ref={ref}
              title={menu.name}
              menuClassName="text-14 py-8 px-5 my-0 mx-16 border-b-1 border-solid border-blue hover:border-black"
            >
              {menu.children &&
                menu.children.map((item) => (
                  <Dropdown.Item className={`${props.parent==item.name?"activeDrop":""}`}>
                    {item.name}
                    <Dropdown.Submenu position={props.position ? props.position : "right"} >
                    {item.children &&
                      item.children.map((submenu) => (
                          <Dropdown.Item className={`${props.child==submenu.name?"activeDrop":""}`} onClick={()=>{props.selectedData(item.name,submenu.name)}}>{submenu.name}</Dropdown.Item>
                      ))}
                      </Dropdown.Submenu>
                  </Dropdown.Item>
                ))}
            </Dropdown>
          ))}
          <img src={DropIcon} onClick={showDropdown}/>
        </div>
      );
}

export default MultiLevel
