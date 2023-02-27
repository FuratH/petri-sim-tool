import React from 'react'
import Sidebar from '../Sidebar';

import {
    Text,
    Divider,
    Spacer,
  } from '@chakra-ui/react'
import NavigationItem from './NavigationItem';

import {
    FiStar,
    FiSettings,
    FiPower,
    FiDownload,
    FiPlay,
    FiUser
  } from 'react-icons/fi';

  import saveAs from 'file-saver';
  import BPMNSwitcher from './BPMNSwitcher';
  import ScenarioSwitcher from './ScenarioSwitcher';

  function Navigation({setCurrent, data, bpmns,setScenario, currentScenario, setBpmn, scenarios, current, currentBpmn, setStarted, setName}) {


    // Define Navigation items that will be displayed at the top of the navigation

    const LinkItems = [
        { name: 'Scenario Parameters', icon: FiSettings, path: '/scenario', event: () =>  setCurrent("Scenario Parameters") },
        { name: 'Resource Parameters', icon: FiUser, path: '/resource', event: () =>  setCurrent("Resource Parameters") },
        { name: 'Modelbased Parameters', icon: FiStar, path: '/modelbased', event: () =>  setCurrent("Modelbased Parameters") },
        { name: 'Run Simulation', icon: FiPlay, path: '/simulation', event: () =>  setCurrent("Run Simulation") }
      ];

      // Define Navigation items that will be displayed at the bottom of the navigation
     
      const LinkItems2 = [
        { name: 'Close project', icon: FiPower, path: '/#', event: () => close() },
        { name: 'Download parameters', icon: FiDownload, path: '/#', event: () => save() },
      ];

      
    const Nav = () => {
        return <Text fontSize={{base: "xs", md:"sm"}} textAlign="center" color="RGBA(0, 0, 0, 0.80)" fontWeight="bold">PetriSim</Text> 
      };


      // function to download the internal data as a json file
      const save = () =>{
        const jsonData = JSON.stringify(data);
        const blob = new Blob([jsonData], { type: "application/json" });
        saveAs(blob, "data.json");
      }

      const close = () =>{
        setStarted("false")
        setName("")
        sessionStorage.setItem('st', false);
        sessionStorage.removeItem('currentProject');
      }
      
  return (
        <>
          <Sidebar side="left" backgroundColor="white" title={<Nav/>} 
            content={
                  <>
                  <NavigationItem current={current}  items={LinkItems} clickedcolor="#AEC8CA" color="#FFFF" exitButton={false} setCurrent={setCurrent}  />
                  
                  <Divider/>
                      <BPMNSwitcher bpmns={bpmns} currentBpmn={currentBpmn} setBpmn={setBpmn} scenarios={scenarios} data={data} currentScenario={currentScenario}/>
                      <ScenarioSwitcher currentScenario={currentScenario} setScenario={setScenario} scenarios={scenarios} data={data}  />
                  <Divider/>
                  <Spacer/>
                  <NavigationItem items={LinkItems2} clickedColor="blackAlpha.400" color="blackAlpha.00" bottom="0" setStarted={setStarted} exitButton={true} />                    
                  </>
              } 
          />
        </>
  )
}

export default Navigation;