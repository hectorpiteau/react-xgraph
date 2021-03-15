/*
 * File: react-xgraph/src/Components/GraphView.tsx
 * Project: react-xgraph
 * Created Date: Friday 14 March 2021
 * Author: Hector PITEAU
 * -----
 * Last Modified: Friday 14 March 2021
 * Modified By: Hector PITEAU
 * -----
 * 
 * Copyright © <Friday 14 March 2021>, <Hector PITEAU>
 * 
 * LICENSED UNDER THE X11 MIT LICENSE
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy 
 * of this software and associated documentation files (the “Software”), to deal 
 * in the Software without restriction, including without limitation the rights 
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
 * copies of the Software, and to permit persons to whom the Software is 
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in 
 * all copies or substantial portions of the Software.
 *
 * The Software is provided “as is”, without warranty of any kind, express or 
 * implied, including but not limited to the warranties of merchantability, 
 * fitness for a particular purpose and noninfringement. In no event shall the 
 * authors or copyright holders Hector PIEAU be liable for any claim, damages or 
 * other liability, whether in an action of contract, tort or otherwise, arising 
 * from, out of or in connection with the software or the use or other dealings 
 * in the Software.
 *
 * Except as contained in this notice, the name of the <copyright holders> shall 
 * not be used in advertising or otherwise to promote the sale, use or other 
 * dealings in this Software without prior written authorization from 
 * the <copyright holders>.
 */

import React, { useEffect } from 'react';

export interface GNode {
    /** The id of the node. Must be unique. */
    id:number,
    /** 
     * The type of the node. By default it' "default". The type refers to 
     * the name of the shape defined in //TODO include predef shapes 
     * */
    type:string,
    /** The x coordinate of the node in the graph. */
    x:number,
    /** The y coordinate of the node in the graph. */
    y:number,
    /** Any Meta information that you want to get back on events. */
    meta?:any,
    backgroundColor?:string,
    borderColor?:string,
    text?:string,
    subtext?:string,
    textColor?:string
}

export interface GEdge {
    /** The id of the edge. Must be unique. */
    id:number,
    /** 
     * The type of the edge. By default it's "default". The type refers to 
     * the name of the shape defined in //TODO include predef shapes 
     * */
    type:string,
    /** The id of the node at the origin of the edge. */
    from:number,
    /** The id of the node at the end of the edge. */
    to:number
}

export interface GraphViewProps {
    nodes?:GNode[],
    edges?:GEdge[],
    height?:number,
    width?:number,
    onMoveNode?:(node:GNode)=>void,
    onMoveNodeComplete?:(node:GNode)=>void,
    onSelecteNode?:(node:GNode)=>void,
    onSelecteEdge?:(node:GEdge)=>void,
    onCreateNode?:(node:GNode)=>void,
    onClickOnBackground?:(x:number,y:number)=>void
}


interface RenderNodeProps {
    node:GNode;
    onMouseDown:(node:GNode,e:React.MouseEvent<SVGElement, MouseEvent>)=>void,
    onClick:(node:GNode)=>void
}

const RenderNode:React.FC<RenderNodeProps> = (props) =>{
    const [xPos,setXPos] = React.useState<number>(0);
    const [yPos,setYPos] = React.useState<number>(0);
    const clickPos = React.useRef({x:0,y:0});
    const width = React.useRef(150);
    const height = React.useRef(30);
    const clicked = React.useRef(false);

    useEffect(()=>{
        setXPos(props.node.x);
        setYPos(props.node.y);
    },[props]);

    const handleMouseMove = (e:React.MouseEvent<SVGRectElement, MouseEvent>) =>{
        if(clicked.current){
            console.log("onmousemove");
            let dx = e.clientX - clickPos.current.x; 
            let dy = e.clientY - clickPos.current.y; 
            setXPos(xPos+dx);
            setYPos(yPos+dy);
            clickPos.current = {x:e.clientX,y:e.clientY};
        }
    }

    return (
        <g
            xmlns="http://www.w3.org/2000/svg"
            key={`xgraph-node-${props.node.id}-key`}
            id={`xgraph-node-${props.node.id}`}
            width={width.current}
            height={height.current}
            // x={xPos - width.current/2}
            // y={yPos - height.current/2}
            onClick={(e)=>{
                e.stopPropagation();
                props.onClick(props.node);
            }}
            onMouseDown={(e)=>{
                e.stopPropagation();
                clickPos.current = {x:e.clientX,y:e.clientY};
                clicked.current = true;
                props.onMouseDown(props.node,e);
            }}
            onMouseUp={(e)=>{
                clicked.current = false;
            }}
        >

            <rect
                x={xPos - width.current/2}
                y={yPos - height.current/2}
                // onMouseMove={(e)=>handleMouseMove(e)}
                width={width.current}
                height={height.current}
                rx="10" 
                ry="10"
                style={{
                    fill:props.node.backgroundColor?props.node.backgroundColor:"red",
                    stroke:props.node.borderColor?props.node.borderColor:"black",
                    strokeWidth:5,
                    opacity:1
                }}
            >
            </rect>
            <text
                x={xPos - width.current/2 + 10}
                y={yPos + 5}
                style={{userSelect:"none"}}
            >
                {props.node.text?props.node.text:""}
            </text>
            <foreignObject
                height={props.node.subtext?(props.node.subtext.length/30)*16:0}
                width={width.current}
                x={xPos - width.current/2}
                y={yPos + 20}
            >
                <p
                    style={{
                        userSelect:"none",
                        margin:"0px",
                        fontSize:"0.7rem",
                        overflowWrap:"anywhere",
                        backgroundColor:"#121212",
                        borderRadius:"4px",
                        color:"white"
                    }}
                >
                    {props.node.subtext?props.node.subtext:""}
                </p>

            </foreignObject>
        </g>
    );
}


const renderEdge = (from:{x:number,y:number},to:{x:number,y:number}) => {
     
    let dir = {x:(to.x-from.x), y:(to.y-from.y)};
    let norm = Math.sqrt(dir.x*dir.x+dir.y*dir.y);
    dir = {x:dir.x/norm,y:dir.y/norm};
    // console.log(dir)
    let middle = {x:from.x+(to.x-from.x)/2, y:from.y+(to.y-from.y)/2};
    
    let perp = {x:-dir.y,y:dir.x};

    let size = 10;

    let p1 = {x:middle.x+(size*dir.x),y:middle.y+(size*dir.y)};
    let p2 = {x:middle.x-perp.x*size,y:middle.y-perp.y*size};
    let p3 = {x:middle.x+perp.x*size,y:middle.y+perp.y*size};
    return(
        <React.Fragment>
            <line 
                x1={from.x} 
                y1={from.y}
                x2={to.x} 
                y2={to.y} 
                style={{stroke:"#2974F2",strokeWidth:2}} 
            />
            {/* <line 
                x1={middle.x} 
                y1={middle.y}
                x2={middle.x+dir.x*20} 
                y2={middle.y+dir.y*20} 
                style={{stroke:"#FF0000",strokeWidth:2}} 
            />
            <line 
                x1={middle.x} 
                y1={middle.y}
                x2={middle.x+perp.x*20} 
                y2={middle.y+perp.y*20} 
                style={{stroke:"#FFFF00",strokeWidth:2}} 
            /> */}
            <polygon 
                points={`${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`} 
                style={{fill:"#2974F2",stroke:"#319CDB",strokeWidth:1}} 
            />
        </React.Fragment>
    );
}


let selectedGNode:GNode|undefined=undefined;
let clickOnGNodePos:{x:number,y:number}|undefined = undefined;

const GraphView:React.FC<GraphViewProps> = (props) => {
    const [nodes,setNodes] = React.useState<GNode[]>([]);
    const [edges,setEdges] = React.useState<GEdge[]>([]);
    const created = React.useRef(0);
    const ini_height = React.useRef<number>(0);
    const ini_width = React.useRef<number>(0);
    const asp_ratio = React.useRef<number>(1);
    const [curHeight,setCurHeight] = React.useState<number>(0);
    const [curWidth,setCurWidth] = React.useState<number>(0);
    const bg_clicked = React.useRef<boolean>(false);
    const bg_clicke_pos = React.useRef<{x:number,y:number}>({x:0,y:0});
    const [screenOrigin,setScreenOrigin] = React.useState<{x:number,y:number}>({x:0,y:0});


    useEffect(()=>{
        ini_height.current = props.height ? props.height : 500;
        setCurHeight(ini_height.current);
        ini_width.current = props.width ? props.width : 800;
        setCurWidth(ini_width.current);
        asp_ratio.current = ini_height.current/ini_width.current;
        setNodes(props.nodes?props.nodes:[]);
        setEdges(props.edges?props.edges:[]);
        if(props.nodes) goToCenterOfNodes(props.nodes);
    }, [props.nodes, props.edges,props.height,props.width]);


    const goToCenterOfNodes = (nodes:GNode[]) =>{
        let size = nodes.length ? nodes.length : 1;
        let sum_x = 0;
        for(let i=0;i<nodes.length;i++){
            sum_x += nodes[i].x;
        }
        let sum_y = 0;
        for(let i=0;i<nodes.length;i++){
            sum_y += nodes[i].y;
        }
        setScreenOrigin({
            x: (sum_x/size) - ini_width.current/2,
            y: (sum_y/size) - ini_height.current/2
        });
        
    }

    const onClickOnNode = (node:GNode) => {
        selectedGNode = node;
        console.log("On click on node :"+node.id);
    }
    
    const onMouseDownOnNode = (node:GNode,e:React.MouseEvent<SVGElement, MouseEvent>) => {
        console.log("On mouse down on node :"+node.id+" clientX:" + e.clientX + " clientY:"+e.clientY);
        selectedGNode = node;
        clickOnGNodePos = {x:e.clientX,y:e.clientY};
    }

    const moveOnNodePosition = (id:number,dx:number,dy:number) => {
        let nodes_t = nodes.map((n)=>{
            if(n.id===id){
                n.x += dx;
                n.y += dy;
            }
            return n;
        });
        setNodes(nodes_t);
    }
    
    const onMouseUpHandler = (e:React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        // if(selectedGNode !== undefined && clickOnGNodePos !== undefined){
        //     let dx = clickOnGNodePos.x - e.clientX; 
        //     let dy = clickOnGNodePos.y - e.clientY; 
        //     console.log("MOVE NODE deltax:"+dx+" deltay:"+dy);
        //     moveOnNodePosition(selectedGNode.id,-dx,-dy);
        // }
        console.log("release")
        selectedGNode = undefined;
        clickOnGNodePos = undefined;
        bg_clicked.current = false;
    }

    const getPositionOfGNode:(id:number)=>{x:number,y:number} = (id:number) => {
        let pos = {x:0,y:0};
        let node = nodes.find(n=>n.id===id);
        if(node !== undefined) pos = {x:node.x,y:node.y};
        return pos;
    }

    const handleMouseMove = (e:React.MouseEvent<SVGSVGElement, MouseEvent>) =>  {
        if(selectedGNode !== undefined && clickOnGNodePos !== undefined){
            console.log("Move node " + !!selectedGNode)
            let zoom = curHeight/ini_height.current;
            let dx = e.clientX - clickOnGNodePos.x; 
            let dy = e.clientY - clickOnGNodePos.y; 
            moveOnNodePosition(selectedGNode.id,dx*zoom,dy*zoom);
            clickOnGNodePos = {x:e.clientX,y:e.clientY};
        }
        if(bg_clicked.current){
            let zoom = curHeight/ini_height.current;
            let dx = bg_clicke_pos.current.x - e.clientX;
            let dy = bg_clicke_pos.current.y - e.clientY;
            setScreenOrigin({x:screenOrigin.x+dx*zoom,y:screenOrigin.y+dy*zoom});
            bg_clicke_pos.current = {x:e.clientX,y:e.clientY};
        }
    }

    const handleClickOnBackground = (e:React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        selectedGNode = undefined;
        console.log("Click on background");
        if(e.shiftKey){
            created.current += 1;
            let n:GNode = {id:-created.current,type:"default",x:e.nativeEvent.offsetX,y:e.nativeEvent.offsetY}
            if(props.onCreateNode)props.onCreateNode(n);
            setNodes([...nodes,n]);
        }
    }

    const handleMouseWheel = (e:React.WheelEvent<SVGSVGElement>) => {
        console.log(e.deltaY)
        setCurHeight(curHeight+ e.deltaY*asp_ratio.current); 
        setCurWidth(curWidth+ e.deltaY);  
    }

    const handleMouseDownBackGround = (e:React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        bg_clicked.current = true;
        bg_clicke_pos.current = {x:e.clientX,y:e.clientY};
    }

    const handleMouseLeave = (e:React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        selectedGNode = undefined;
        bg_clicked.current = false;
        clickOnGNodePos = undefined;
    }

    const handleClickOnEdge = (e:GEdge) => {

    }

    return (
        <svg 
            height={ini_height.current} 
            width={ini_width.current}
            onMouseDown={e=>handleMouseDownBackGround(e)}
            onMouseUp={e=>onMouseUpHandler(e)}
            onMouseMove={e=>handleMouseMove(e)}
            onMouseLeave={e=>handleMouseLeave(e)}
            onClick={e=>handleClickOnBackground(e)}
            style={{
                backgroundColor:"#232323"
            }}
            onWheel={(e)=>handleMouseWheel(e)}
            viewBox={`${screenOrigin.x} ${screenOrigin.y} ${curWidth} ${curHeight}`}
        >
            {
                edges?.map((e)=>renderEdge(getPositionOfGNode(e.from),getPositionOfGNode(e.to)))
            }
            {
                nodes?.map((n)=>
                    <RenderNode
                        key={`rnode-xgraph-${n.id}`}
                        node={n}
                        onClick={onClickOnNode}
                        onMouseDown={onMouseDownOnNode}
                    />
                )
            }
        </svg>
    );
}

export default GraphView;