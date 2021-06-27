import * as React from "react"
import { Frame, addPropertyControls, ControlType, Color } from "framer"

// Learn more: https://framer.com/api

export function Shape3D(props) {
    const {
        topColor,
        bottomColor,
        frontColor,
        backColor,
        rightColor,
        leftColor,
        onTap,
    } = props
    var lastMouseX = 0
    var lastMouseY = 0
    var rotX = props.rotationX,
        rotY = props.rotationY
    var scaleRatio = props.type === "CUBE" ? props.scale / 2 : props.scale
    const invisBG = Color({ r: 255, g: 255, b: 255, a: 0 })

    console.log(this)

    const getId = () => {
        var randLetter = String.fromCharCode(
            65 + Math.floor(Math.random() * 26)
        )
        var uniqid = randLetter + Date.now()
        return uniqid
    }
    const _id = getId()
    const css =
        `
      
  #` +
        _id +
        ` .container {
    width: 200px;
    height: 200px;
    perspective: none;
    
    top: 0px;
    left: 0px;
    position: relative;
  }
#` +
        _id +
        ` .cube {
  transform-style: preserve-3d;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
 
  transform: rotateX(` +
        props.rotationX +
        `deg) rotateY(` +
        props.rotationY +
        `deg) scaleX(` +
        scaleRatio +
        `) scaleY(` +
        scaleRatio +
        `)
    scaleZ(` +
        scaleRatio +
        `);
}

#` +
        _id +
        ` .face {
  position: absolute;
  width: 100%;
  height: 100%;
  
  background-color: #800000;
}

#` +
        _id +
        ` .top {
  transform: rotateX(90deg) translateZ(100px);

  background-color: ` +
        props.topColor +
        `;
    background-image: url(` +
        props.texture +
        `);
    background-size: cover;
}
#` +
        _id +
        ` .bottom {
  transform: rotateX(-90deg) translateZ(100px);
  background-color: ` +
        props.bottomColor +
        `;
     background-image: url(` +
        props.texture +
        `);
    background-size: cover;
}

#` +
        _id +
        ` .right {
  transform: rotateY(90deg) translateZ(100px);
  background-color: ` +
        props.rightColor +
        `;
     background-image: url(` +
        props.texture +
        `);
    background-size: cover;
}
#` +
        _id +
        ` .left {
  transform: rotateY(-90deg) translateZ(100px);
  background-color: ` +
        props.leftColor +
        `;
     background-image: url(` +
        props.texture +
        `);
    background-size: cover;
}

#` +
        _id +
        ` .front {
  transform: rotateX(0deg) translateZ(100px);
  background-color: ` +
        props.frontColor +
        `;
     background-image: url(` +
        props.texture +
        `);
    background-size: cover;
}
#` +
        _id +
        ` .back {
  transform: rotateX(-180deg) translateZ(100px);
  background-color: ` +
        props.backColor +
        `;
     background-image: url(` +
        props.texture +
        `);
    background-size: cover;
}
#` +
        _id +
        ` .wrap {
  width: 150px;
  height: 130px;
  /*margin: 30% auto;*/
  text-align: center;
  z-index: 100;
  position: absolute;
  transform: scaleX(` +
        scaleRatio +
        `) scaleY(` +
        scaleRatio +
        `) scaleZ(` +
        scaleRatio +
        `)  translateX(-50%) translateY(-50%);
       
    left: 50%;
    top: 50%;
}
#` +
        _id +
        ` .triangle {
  position: absolute;
  width: 0;
  height: 0;
  border-left: 75px solid transparent;
  border-right: 75px solid transparent;
  border-bottom: 130px solid ` +
        props.frontColor +
        `;
  
  transform-origin: 75px 0;
  /* perspective: 150px; */
  perspective-origin: 50% 50%;
}
#` +
        _id +
        ` .face-1 {
  transform-origin: 75px 0;
  transform: rotateY(0deg) rotateX(19.5deg);
  border-bottom-color: ` +
        props.frontColor +
        `;
    
}
#` +
        _id +
        ` .face-2 {
  transform-origin: 75px 0;
  transform: rotateY(120deg) rotateX(19.5deg);
  animation: color1 2s infinite linear;
  animation-delay: 1s;
  border-bottom-color: ` +
        props.backColor +
        `;
     
}
#` +
        _id +
        ` .face-3 {
  transform-origin: 75px 0;
  transform: rotateY(240deg) rotateX(19.5deg);
  animation: color1 2s infinite linear;
  animation-delay: 0s;
  border-bottom-color: ` +
        props.rightColor +
        `;
    
}
#` +
        _id +
        ` .face-4 {
  /* bottom face */
  transform-origin: 0 0px;
  transform: rotateX(90deg) translateY(-87px) translateZ(-122px);
  animation: color1 2s infinite linear;
  animation-delay: 1s;
  border-bottom-color: ` +
        props.bottomColor +
        `;
     

}

#` +
        _id +
        ` .rotor-x {
  width: 150px;
  height: 130px;
  transform-origin: 75px 65px;
  transform-style: preserve-3d;
  animation: spinX 6s infinite linear;
}
#` +
        _id +
        ` .rotor-y {
  width: 150px;
  height: 130px;
  transform-origin: 75px 65px;
  transform-style: preserve-3d;
  animation: spinY 12s infinite linear;
}
#` +
        _id +
        ` .rotor-z {
  width: 150px;
  height: 130px;
  transform-origin: 75px 65px;
  transform-style: preserve-3d;
  animation: spinZ 18s infinite linear;
  transform: rotateX(` +
        props.rotationX +
        `deg) rotateY(` +
        props.rotationY +
        `deg);
}  `

    var dragEnabled = false
    const ref = React.useRef<HTMLDivElement>()

    const onMouseDown = (ev) => {
        console.log("mouse down")
        lastMouseX = ev.clientX
        lastMouseY = ev.clientY
        dragEnabled = true
    }
    const onMouseUp = () => {
        console.log("mouse up")
        dragEnabled = false
    }

    const onMouseMove = (ev) => {
        if (dragEnabled === false) return
        var deltaX = ev.pageX - lastMouseX
        var deltaY = ev.pageY - lastMouseY

        lastMouseX = ev.pageX
        lastMouseY = ev.pageY

        rotY -= deltaX * 0.1
        rotX += deltaY * 0.1

        ref.current.style.transform =
            "rotateX( " +
            rotX +
            "deg) rotateY(" +
            rotY +
            "deg) scaleX(" +
            scaleRatio +
            ") scaleY(" +
            scaleRatio +
            ") scaleZ(" +
            scaleRatio +
            ")"
    }

    React.useEffect(() => {
        if (props.interactive === true) {
            document.addEventListener("pointerdown", onMouseDown)
            document.addEventListener("pointerup", onMouseUp)
            document.addEventListener("pointermove", onMouseMove)

            return () => {
                document.removeEventListener("pointerdown", onMouseDown)
                document.removeEventListener("pointerup", onMouseUp)
                document.removeEventListener("pointermove", onMouseMove)
            }
        }
    }, [])

    const getShape = () => {
        if (props.type === "CUBE") {
            return (
                <div className="cube cube1" ref={ref} id="cube">
                    <div className="face front"></div>
                    <div className="face back"></div>
                    <div className="face right"></div>
                    <div className="face left"></div>
                    <div className="face top"></div>
                    <div className="face bottom"></div>
                </div>
            )
        } else if (props.type === "TRIANGLE") {
            return (
                <div className="wrap">
                    <div className="rotor-x">
                        <div className="rotor-y" ref={ref}>
                            <div className="rotor-z">
                                <div className="triangle face-1"></div>
                                <div className="triangle face-2"></div>
                                <div className="triangle face-3"></div>
                                <div className="triangle face-4"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    return (
        <Frame background={invisBG} size="100%" id={_id}>
            <Frame
                width={200}
                height={200}
                className="parent3d"
                background={invisBG}
                radius={25}
                center={true}
            >
                <Frame
                    className="container"
                    background={invisBG}
                    radius={25}
                    center={true}
                >
                    {getShape()}
                </Frame>
            </Frame>
            <style>{css}</style>
        </Frame>
    )
}

Shape3D.defaultProps = {
    height: 200,
    width: 200,
    tint: "#09F",
    rotationX: -30.1,
    rotationY: -48.3,
    type: "CUBE",
}

addPropertyControls(Shape3D, {
    type: {
        title: "Shape Type",
        type: ControlType.Enum,
        options: ["CUBE", "TRIANGLE"],
        optionTitles: ["CUBE", "TRIANGLE"],
    },
    topColor: {
        title: "Top Color",
        type: ControlType.Color,
        defaultValue: "#ff0000",
    },
    bottomColor: {
        title: "Bottom Color",
        type: ControlType.Color,
        defaultValue: "#800000",
    },
    frontColor: {
        title: "Front Color",
        type: ControlType.Color,
        defaultValue: "#800000",
    },
    backColor: {
        title: "Back Color",
        type: ControlType.Color,
        defaultValue: "#800000",
    },
    leftColor: {
        title: "Left Color",
        type: ControlType.Color,
        defaultValue: "#660000",
    },
    rightColor: {
        title: "Right Color",
        type: ControlType.Color,
        defaultValue: "#990000",
    },
    texture: {
        title: "Texture Image",
        type: ControlType.Image,
    },
    rotationX: {
        title: "Rotation X",
        type: ControlType.Number,
        min: -360,
        max: 360,
        defaultValue: -30.1,
    },
    rotationY: {
        title: "Rotation Y",
        type: ControlType.Number,
        min: -360,
        max: 360,
        defaultValue: -48.3,
    },
    scale: {
        title: "Scale",
        type: ControlType.Number,
        min: 0,
        max: 1,
        step: 0.01,
        displayStepper: true,
        defaultValue: 1,
    },
    interactive: {
        title: "Interactive?",
        type: ControlType.Boolean,
        defaultValue: true,
    },
    onTap: {
        type: ControlType.EventHandler,
    },
})
