import React, { useEffect, useState } from 'react'
import SelectDomain from '../../components/selectDomain/SelectDomain'
import './SelectDomainPage.css'
import BFSIIcon from '../../assets/SelectDomain/BFSI.svg'
import TelecomIcon from '../../assets/SelectDomain/Telecom.svg'
import ECommerceIcon from '../../assets/SelectDomain/E-Commerce.svg'
import HealthCareIcon from '../../assets/SelectDomain/HealthCare.svg'
import Navigationbar from '../../components/navigationbar/Navigationbar'
//import CreateAccount from '../CeateAccount/CreateAccount'
import { useSelector, useDispatch } from 'react-redux';
import {getDomainNameData} from '../../actions/SelectDomainNameAction';
import {getAllDomain} from "../../actions/SelectDomainApiAction";
import { IAppState } from '../../store/store';
import { useHistory } from "react-router-dom";
import Account from '../account/Account'


function SelectDomainPage() {
  const[nextAccountPage , setNextAccountPage] = useState(true)
  const[alldomain , setAllDomain] = useState("")
  const[details , setDetails] =useState({Icon:"",Name:""})

  const totalData = useSelector((state: IAppState) => state.selectDomainApiData.selectDomainApi);
  const accountPageState =useSelector((state: IAppState) => state.pushAccountState.pushState)


//  useEffect(()=>{
//   console.log(accountPageState)
//   if(accountPageState){
//     setNextAccountPage(false)
//   }
//  },[accountPageState])

  let DomainArr = [{
       Icon : BFSIIcon,
       Name : "BFSI"
  },
  {
    Icon : HealthCareIcon,
    Name : "Health Care"
  },
  {
    Icon : TelecomIcon,
    Name : "Telecom"
  },
  {
    Icon : ECommerceIcon,
    Name : "E-Commerce"
  }]
 const dispatch = useDispatch();
  const NextPage = (g:{Icon:any,Name:any}) => {
    return setDetails({
        Icon : g.Icon,
        Name : g.Name
      }),
      setNextAccountPage(false),
      dispatch(getDomainNameData(g.Name))
  }
 const tosetDomainPageprev = () => {
  setNextAccountPage(prev => true)
 }

 const toGoAccountPage=()=>{
  setNextAccountPage(prev=> false)
 }
 let history = useHistory();

 useEffect(
  () => {
       getAllDomain(dispatch)

  },[]
)
useEffect(
  () => {
    setAllDomain(totalData)
  },[totalData]
)

const toPrevPage =() => {
  setNextAccountPage(prev => true)

}

  return (
     <div>
        {/* <Navigationbar/> */}
        {nextAccountPage ?
    <div className='childDiv DomainComponenWrapper'>

        <div className='heading-div'><p>Select 	&nbsp; Domain</p></div>
        <div className='div-DomainconatainerFlex'>
        <div className='DomainComponentContainer'>
          {DomainArr.map((e) =>{
          return  <div onClick = {() => NextPage(e)}>
          <SelectDomain Icon = {e.Icon} DomainName = {e.Name}
          />
          </div>

        })}
        </div>
        </div>

    </div>
    // :  <CreateAccount Icon ={details.Icon} Name = {details.Name}
    //   // tosetDomainPage = {tosetDomainPageprev()}
    //   closeAccount={()=>{hideCreateAccount()}}
    // />
      : <Account Icon ={details.Icon} Name = {details.Name}
      toPrevPage = {() => toPrevPage()}
      />
    }
    </div>
  )
}

export default SelectDomainPage