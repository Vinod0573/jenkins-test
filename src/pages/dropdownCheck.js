import React , {useState} from 'react'
import DropdownSaarthi from '../components/ui-kits/dropdownsaarthi2/DropdownSaarthi'
import AssignConversationIcon from "../assets/projectPageIcon/AssignConversationIcon.svg"

function DropdownCheck() {
    const[selectedDropdown , setSelectedDropdown] = useState()
    let arr = ["Mannual","Auto", "Default"]
    const dropdownList = {
        optionList: arr,
        imgSrcLeft: AssignConversationIcon,
        placeHolderText:  "Assign Conversation",
      };
      const OnChangeDropdown = (item) => {
         setSelectedDropdown(prev => item)
      }
  return (
    <div>
      <DropdownSaarthi
       droplist={
        dropdownList
      }
      placeHolderText = {selectedDropdown ? selectedDropdown : " -select-"}
      loading={() => false}
      selectedItem={
        (item) =>
            OnChangeDropdown(item)
      }
      extraClassSelectedArea={"extraStyleSfObject"}
      extraClassToBeSelectedArea={"dropdownStyling"}
      extraClassDropdownSearchArea={"searchIconStyle"}
      />
    </div>
  )
}

export default DropdownCheck