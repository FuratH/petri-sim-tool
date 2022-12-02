import { Input, FormControl, FormLabel, Select } from '@chakra-ui/react';
import React from 'react'
import Field from '../../Field';


class Gateway extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        probabilities: this.props.getData("currentModel").parameters.modelParameter.gateways.find((value) => value.id === this.props.selectedObject.id).outgoing.map((element, index) => this.props.getData("currentModel").parameters.modelParameter.sequences.find((value) => value.id === element).probability)
       
    };
  
    }
  

    handleprobability(index, seq, event) {

        const target = event.target;
        const value = target.value;

        var copy = this.state.probabilities
        copy[index] = value

        this.setState({
            probabilities: copy
          });
       
        this.props.getData("currentModel").parameters.modelParameter.sequences.find((seqq) => seqq.id === seq).probability = this.state.probabilities[index]
        
        console.log(this.props.getData("f"))
      }
  
    render() {
      return ( 
        <>
         <FormControl>
            <FormLabel>Selected Gateway:</FormLabel>
            <Field title="Test date" value={this.props.selectedObject.id? this.props.selectedObject.id : "" } type="inputRead" />
        </FormControl>

        <FormControl>
            <FormLabel>Probability:</FormLabel>
            {this.props.getData("currentModel").parameters.modelParameter.gateways.find((value) => value.id === this.props.selectedObject.id).outgoing.map((element, index) =>{
                
                return <>
                <Field 
                  type="inputRead" 
                  value={element} 
                  w="65%" />
                <Input 
                onChange={this.handleprobability.bind(this, index, element)}
                value={this.state.probabilities[index]} 
                bg="white"  
                w="30%" 
                marginLeft="4%" 
                marginBottom="10px" />
                </>
            })}
        </FormControl>
            
        </>
      );
    }
  }



export default Gateway;