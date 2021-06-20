import React, { useRef, useState } from 'react';
import CanvasDraw from "react-canvas-draw";
import metadata from './metadata.js'
import './Canvas.css'
import { SliderPicker } from 'react-color';
//Declare IPFS
//const ipfsClient = require('ipfs-http-client')
//const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

const ipfsAPI = require('ipfs-api')
const ipfs = ipfsAPI('ipfs.infura.io', '5001', { protocol: 'https' })

const INFURA_HTTPS = "https://ipfs.infura.io/ipfs/";
const WIDTH = 1000;
const HEIGHT = 400;

function CanvasComponent  ({ deployedContract, account })  {
    const canvasRef = useRef();
    const download = () => {
        let canvas = canvasRef.current.canvasContainer.children[1];
        let dataUrl = canvas.toDataURL("image/png");
        const buffer = Buffer(dataUrl.split(",")[1], 'base64');
        console.log(buffer)
        ipfs.files.add(buffer, (error, result) => {
            if (result) {
                metadata.image = INFURA_HTTPS + result[0].hash;
                console.log("image uploaded to IPFS image URI:" + metadata.image)
                console.log(metadata)
                let metadataBuffer = Buffer.from(JSON.stringify(metadata));
                ipfs.files.add(metadataBuffer, (error, secondResult) => {
                    if (secondResult) {
                        const tokenURI = INFURA_HTTPS + secondResult[0].hash;
                        console.log("Metadata uploaded to IPFS image as JSON URI:" + tokenURI)
                        deployedContract.methods.createCollectible(tokenURI).send({ from: account }).on('transactionHash', (hash) => {
                            console.log("success, transction hash: ", hash);
                        })
                    }
                    if (error) {
                        console.log(error)
                    }
                })
            }
            if (error) {
                console.log(error)
            }
        })
    }
    

   // const [color, setColor]= useState("#000000");
    const [width, setWidth]= useState(1100);
    const [height,setHeight]= useState(480);
    const [brushRadius,setbrushRadius]= useState(8);
    const [lazyRadius, setlazyRadius]= useState(12);

  // color picker event Handler
    const[color,setColor]=useState('#fff');
    const  handleChangeComplete=(color,event)=>{
        setColor((color.hex));
    }

   const handleChange=(color, event)=> {
       //jdjf
   }

    return (
        <div className="canvas-component">

        <div className="tools-container">
            <p> <h1><b>TOOLS</b></h1></p>
              <div className="tools">
                  <div>
                    <button Click={""}>
                                 Undo
                    </button>
                  <button onClick={""} >
                             Reset
                  </button>
                          </div>
                              <div>
                    <label>Width:</label>
                    <input
                      type="number"
                      value={width}
                      onChange={e => setWidth(parseInt(e.target.value,10))
                      }
                    />
                              </div>
                              <div>
                    <label>Height:</label>
                    <input
                      type="number"
                      value={height}
                      onChange={e => setHeight(parseInt(e.target.value,10))
                      }
                    />
                              </div>
                              <div>
                    <label>Brush-Radius:</label>
                    <input
                      type="range" min="0" max="50"
                       value={brushRadius}
                      onChange={e => setbrushRadius(parseInt(e.target.value, 10))
                      }
                    />
                  </div>
                  <div>
                    <label>Lazy-Radius:</label>
                    <input
                       type="range" min="0" max="50"
                      value={lazyRadius}
                      onChange={e => setlazyRadius(parseInt(e.target.value, 10))
                      }
                    />
                    </div>
                  
                  <div>
                  <label>color:</label>
                      <SliderPicker onChange={handleChange} onChangeComplete={handleChangeComplete} />
                   
                    <input
                      type="string"
                      value={color}
                      onChange={e => setColor((e.target.value))
                      }
                    />
                 </div>
              </div>
            
        </div>

                <p> <h1> <b>CANVAS</b></h1></p>
                <CanvasDraw
                    canvasWidth={width}
                    canvasHeight={height}
                    brushColor={color}
                    brushRadius={brushRadius}
                    lazyRadius={lazyRadius}
                    className="canvas"
                    ref={canvasRef}
                
                />
        

            <div className="button-container">
                <button
                    
                    onClick={download}
                    className="button">
                    MINT NFT
                </button>
            </div>

           
        </div>
    )
}

export default CanvasComponent;
