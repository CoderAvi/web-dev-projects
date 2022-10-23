import React,{Component} from 'react';
//
import BubbleSort from './algorithms/BS';
// Icons 
import Play from '@material-ui/icons/PlayCircleFilledOutlined';
import  Forward from '@material-ui/icons/SkipNextRounded';
import Backward from '@material-ui/icons/SkipPreviousRounded';  
import  RotateLeft  from '@material-ui/icons/RotateLeft';
import Bar from './components/Bar';
import './App.css';
// props--> properties that are passed in



// Issues facing
// 1. Color wala 
// 2. sort hone ke baad rukta nhi h
class App extends Component{
    state={// state is an object
        array: [],
        arraySteps: [],
        colorKey:[],
        colorSteps:[],
        currentSteps:0,
        count:20,
        delay:10,
        algorithm:'Bubble Sort',
        timeouts: [],
    
    };

    ALGORITHMS = {
        'Bubble Sort': BubbleSort,
    }

// function for calling the genrate randam array
    componentDidMount(){
        this.generateArray();
   }
   // function to generate steps 
   generateSteps = () =>{
    let array = this.state.array.slice();
    let steps = this.state.arraySteps.slice();
    let colorSteps = this.state.colorSteps.slice();
    this.ALGORITHMS[this.state.algorithm](array, 0, steps, colorSteps);
    this.setState({
        arraySteps: steps,
        colorSteps:colorSteps
    })
   }
   clearTimeouts = ()=>{
    this.state.timeouts.forEach((timeout)=>clearTimeout(timeout));
    this.setState({
        timeouts:[]
    });
   }

    clearColorKey=()=>{
        let blankKey= new Array(this.state.count).fill(0);
        this.setState({
            colorKey:blankKey,
            colorSteps:[blankKey]
        })
    }

    // function to generate an random array
    generateRandomNum=(min, max)=>{
        return Math.floor(Math.random() * (max-min)+min); //more than the minimum value and less than the max 
    };
    generateArray=() =>{
        this.clearTimeouts();
        this.clearColorKey()
        const count=this.state.count;
        const temp =[];// empty array

        for(let i=0 ;i<count;i++){
  
            
            temp.push(this.generateRandomNum(50,200));
        }
    //   console.log(temp)
    this.setState({
        array:temp,
        arraySteps: [temp],
        currentStep:0,
    },()=>{
        this.generateSteps();
    });
    };
    changeArray=(index,value)=>{
        let arr = this.state.array;
        arr[index]= value;
        this.setState({
            array:arr,
            arraySteps:[arr],
            currentStep:0
        },
        ()=>{
            this.generateSteps();
        } 
        );

    };

    previousStep=()=>{
        let currentStep= this.state.currentSteps;
        if(currentStep===0) return;
        currentStep -=1;
        this.setState({
            currentStep:currentStep,
            array:this.state.arraySteps[currentStep],
            colorKey:this.state.colorSteps[currentStep]
        });
    };
    nextstep =()=>{
        
        let currentStep= this.state.currentSteps;
        if(currentStep>=this.state.arraySteps.length-1) return;
        currentStep +=1;
        this.setState({
            currentStep:currentStep,
            array:this.state.arraySteps[currentStep],
            colorKey:this.state.colorSteps[currentStep]
        });
    };
    start =()=>{
        let steps = this.state.arraySteps;
        let colorSteps= this.state.colorSteps;
        this.clearTimeouts();


        let timeouts = [];
        let i =0;
        while(i<steps.length - this.state.currentSteps){
            let timeout = setTimeout(()=>{
                let currentStep = this.state.currentSteps;
                this.setState({
                    array: steps[currentStep],
                    colorKey: colorSteps[currentStep],
                    currentStep: currentStep+1,

                });
                timeouts.push(timeout);
                }, this.state.delay*i);
                i++;
                
        }

        this.setState({
            timeouts:timeouts,
        });

    };
    render(){
        let bars = this.state.array.map((value,index)=>(
           
          <Bar 
           key = {index} 
           index = {index}
           length = {value}
           color =  {this.state.colorKey[index]}
           changeArray ={this.changeArray}
           />

            


        )); 
        
        let playButton;
        if(this.state.arraySteps.length===this.state.currentStep){
            playButton=(
               <button className="controller" onClick={this.generateArray}>
               <RotateLeft/>
               </button>
            );
        }else{
            playButton=(
                <button className="controller" onClick={this.start}>
                    <Play/>
                </button>
            )
        }

        // h1 cannot include the div/components
        return (
            <div className='app'>
                <div className="frame">
                    <div className="barsDiv container card "> {bars}</div>
                </div>
                <div className="control-pannel">
                <div className='control-buttons'>
                    <button className="controller" onClick={this.previousStep}>
                        <Backward/>
                    </button>
                        {playButton}
                    <button className="controller" onClick={this.nextstep}>
                        <Forward/>
                    </button>
                    </div> 

                </div>
                <div className="pannel"></div>
                </div>
            
      );
    }
}

export default App;