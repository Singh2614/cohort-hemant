import React from "react";
import { useState } from "react";
import Square from "./Square";
const Board=()=>{
    const [state,setstate]=useState(Array(9).fill(null))
     
    const [isx,setx] =useState(true);
     
    const winnercheck=()=>{
        const winnerlogic=[
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];
        for(let logic of winnerlogic){
            const [a,b,c]=logic;
            if(state[a]!==null && state[a]===state[b] && state[c]===state[a]){
                return state[a];
            }
        }return false;

    }
    const iswinner=winnercheck();
    const fill=()=>{
        for(let i=0;i<9;i++){
            if(state[i]==null){
                return false;
            }
        }return true;
    }
    const handleclick=(index)=>{
        if (state[index] !== null) { return; } 

        const cop=[...state];
        cop[index]=isx?"X":"O";
        setstate(cop);
        setx(!isx);
        if(fill()){
            playgame();
        }
         
         
        
    }
    const playgame=()=>{
        setstate(Array(9).fill(null));
        setx(true);
    }
    console.log(state);
    return(
        <div className="board-container">
            
            
            {iswinner?<>{iswinner} won <><button onClick={playgame}>play agaian</button></> </>:<>
                {isx?<h1>X ki baari</h1>:<h1>O ki baari</h1>}
                <div className="boardrow">
                    <Square onclick={()=>handleclick(0)} value={state[0]} />
                    <Square onclick={()=>handleclick(1)} value={state[1]}/>
                    <Square onclick={()=>handleclick(2)} value={state[2]}/> 
                </div>
                <div className="boardrow">
                    <Square onclick={()=>handleclick(3)} value={state[3]}/>
                    <Square onclick={()=>handleclick(4)} value={state[4]}/>
                    <Square onclick={()=>handleclick(5)} value={state[5]}/> 
                </div>
                <div className="boardrow">
                    <Square onclick={()=>handleclick(6)} value={state[6]}/>
                    <Square onclick={()=>handleclick(7)} value={state[7]}/>
                    <Square onclick={()=>handleclick(8)} value={state[8]}/> 
                </div>
            </>}
            
        </div>
    )
}
export default Board;