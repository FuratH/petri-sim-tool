import React, { useEffect, useState } from "react";
import Modeler from "bpmn-js/lib/Modeler";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import axios from "axios";

import {
  ButtonGroup,
  IconButton,
  Flex,
  Center,
  Box
} from '@chakra-ui/react'

import { MinusIcon, AddIcon } from '@chakra-ui/icons'

function BpmnView(props) {



        const [diagram, diagramSet] = useState("");
        var container = document.getElementById("container");
        const [clickedElement, clickedSet] = useState({});
        const [modelerRef, setModeler] = useState(null)
        
        useEffect(() =>{
          if (container){
            container.innerHTML = ""
            container = document.getElementById("container");
            diagramSet("")
            setModeler("")
          }

        },[props.currentBpmn])
       
        useEffect(() => {
          if (diagram.length === 0) {
            axios
              .get(
                props.currentBpmn.file
              )
              .then((r) => {
                diagramSet(r.data)
              })
              .catch((e) => {
                console.log(e);
              });
          }
        }, [diagram, container]);
      
      
        useEffect(() =>{
          if(diagram.length > 0){
            var mod = new Modeler({
              container,
              keyboard: {
                bindTo: document
              },
              additionalModules: [
    
                {
                  contextPad: ["value", {}],
                  contextPadProvider: ["value", {}],
                  palette: ["value", {}],
                  paletteProvider: ["value", {}],
                  dragging: ["value", {}],
                  move: ["value", {}],
                  create: ["value", {}],
                  // ...
                }
              ],
            });
        
            setModeler(mod)
          }
        }, [diagram, container])
      
      
        useEffect(() =>{
          if(modelerRef && diagram.length > 0){
            console.log(31)
            modelerRef
            .importXML(diagram)
            .then(({ warnings }) => {
              if (warnings.length) {
                console.log("Warnings", warnings);
              }
              modelerRef.get('canvas').zoom('fit-viewport', 'auto');
          
            })
            .catch((err) => {
              console.log("error", err);
            });
          }
        }, [diagram, modelerRef])
      
      
      
        useEffect(() => {
          if(modelerRef){
    
            modelerRef.get('zoomScroll').stepZoom(-1);

    
            var eventBus = modelerRef.get('eventBus');
            
            eventBus.on("element.click", (event) => {
              clickedSet(event.element.businessObject.name)
              event.stopPropagation()
            });
          }
      }, [modelerRef]);
      
      
          useEffect(() => {
            console.log(clickedElement)
        }, [clickedElement]);
      
      
        function zoomIn(){
          modelerRef.get('zoomScroll').stepZoom(1)
        }
    
        function zoomOut(){
          modelerRef.get('zoomScroll').stepZoom(-1)
        }
      
      
        return (
         
         <Flex>
          <Box id="container" w="100%" pos="absolute" h="95vh">
          </Box>

            <ButtonGroup size='md' spacing='6' variant='unstyled' position="absolute" justifyContent="center" bottom="20px" left="0px" right="0px">
                <IconButton onClick={zoomIn}  icon={<AddIcon />}  bg="white"  rounded="20" shadow="sm"/>
                <IconButton onClick={zoomOut} icon={<MinusIcon />} bg="white" rounded="20" shadow="sm" />
            </ButtonGroup>
      
          </Flex>
        );
}

export default BpmnView;
  