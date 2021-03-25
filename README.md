# react-xgraph

# Brief
This component is used to represent a directed or undirected graph. It can be 
used to display a set of custom nodes and links between thoses nodes.

The tool includes multiple shortcuts for simplifying the creation and edition
of such graph. 

With react-xgraph, you can customise each node's style and modify it shape,
add information on nodes, and on links. 

## Demo 
A demo of this tool is available [demo](http://demo.demo)

## Usage 
React component used to show nodes and links.   

```ts
    const nodes = [
        {
            id:1,

        }
    ]

    interface MyProps {
        /* your props */
    }

    export const Example:React.FC<MyProps> = (props) => {
        return (
            <XGraphView
                nodes={nodes}
                edges={edges}
            />
        );
    }
```

# Graph input props :

| Prop name     | Type          |   Description     |
| :--------     | :----------   | :----------       |
| nodes         | `GNode[]` (optional)       | The list of nodes |
| edges         | `GEdge[]` (optional)       | The list of edges |
| height        | `?number` (optional)  |
| width         | `?number` (optional)  |
| onMoveNode    | `?(node:GNode)=>void` (optional) |
| onMoveNodeComplete    | `?(node:GNode)=>void` (optional) |
| onSelecteNode | `?(node:GNode)=>void` (optional)  | 
| onSelecteEdge | `?(node:GEdge)=>void` (optional)  |
| onCreateNode  | `?(node:GNode)=>void` (optional)  |
| onClickOnBackground   | `?(x:number,y:number)=>void` (optional) |
|

## Interfaces 

By using react-xgraph you will interact with a dedicated interface. Here is a
list of 

### GNode

The interface is exported as `interface GNode` from the file `GNode.ts`. Here is the list of its fields:


| field     | type          | Description       |
| :-------- | :----------   | :----------       |
| id        | `number`        | The id of the node. Must be unique.|
| type      | `string`        | The type of the node. By default it' "default". The type refers to the name of the shape defined in ... | 
| x         | `number`        | The x coordinate of the node in the graph. | 
| y         | `number`        | The y coordinate of the node in the graph. | 
| meta      | `?any (optional)`           | Any Meta information that you want to get back on events. | 
| backgroundColor      | `?string (optional)`        | The color in hexadecimal format describing the color of the background of the node. Ex:"#1299EE"| 
| borderColor      | `?string (optional)`        | The color in hexadecimal format describing the color of the node's border. Ex:"#1299EE"| 
| text      | `?string (optional)`        | The text to display in the middle of the node. It is the primary text of the node.| 
| subtext   | `?string (optional)`        | The secondary text displayed under the node. | 
| textColor | `?string (optional)`        | The color of the texts. Hex format. | 
|
 

> If you want to type your meta informations, you can use `GXNode<T>` exported from `GNode.ts`, and replace T by an interface describing your meta informations. It will improve the typing of your code.


 ## GEdge
     
The interface is exported as `interface GEdge` from the file `GEdge.ts`. Here is the list of its fields:


| field     | type          | Description       |
| :-------- | :----------   | :----------       |
| id        | `number`        | The id of the edge. Must be unique.|
| type      | `string`        | The type of the edge. By default it' "default". The type refers to the name of the shape defined in ... | 
| meta      | `any`        | Any Meta information that you want to get back on events. | 
| from      | `number`        | The id of the GNode where the link starts. | 
| to        | `number`        | The id of the GNode where the link ends. | 


> Same thing than for nodes, if you want to type your meta informations, you can use `GXEdge<T>` exported from `GEdge.ts`, and replace T by an interface describing your meta informations.


## Contributing

- Improving code quality.
- Improving rendering speed.
- Adding new features.
- Adding examples.

## Licence MIT
