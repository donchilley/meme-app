import './App.css';
import React, { useEffect, useState, useRef } from 'react'
import ImageUploader from './components/image/imageUploader';

function App() {
  const [imageUrl, setImageUrl] = useState("")

  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const triggerUploadPopup = (value: boolean) => {
    setShowUploadPopup(value);
  }

  const submitImage = (value: string) => {
    setImageUrl(value)
  }

  const [mirror, setMirror] = useState(false);

  const toggleMirror = () => {
    if (imageUrl) {
      setMirror(mirror => !mirror);
    }
  }

  const [editRotate, setEditRotate] = useState(false);
  const [rotateValue, setRotateValue] = useState("0");
  const rotateRef = useRef<HTMLInputElement>(null)
  const toggleRotate = () => {
    if (editScale) {
      setEditScale(false);
    }
    if (imageUrl)
      setEditRotate(rotate => !rotate);
  }

  const rotateImage = () => {
    if (rotateRef.current) {
      console.log(rotateRef.current.value)
      setRotateValue(rotateRef.current.value);
    }
  }

  const width = 40
  const height = 40;
  const [editScale, setEditScale] = useState(false);
  const [scale, setScale] = useState(1);

  const toggleScale = () => {
    if (editRotate) {
      setEditRotate(false)
    }
    if (imageUrl) {
      setEditScale(editScale => !editScale)
    }
  }

  const scaleImage = (scl: number) => {
    setScale(scl);
  }

  const [editText, setEditText] = useState(false)
  const [topText, setTopText] = useState("")
  const [bottomText, setBottomText] = useState("")
  const topTextRef = useRef<HTMLInputElement>(null)
  const bottomTextRef = useRef<HTMLInputElement>(null)

  const addText = () => {
    if (editColor) {
      setEditColor(false)
    }
    if (imageUrl) {
      setEditText(editText => !editText)
    }
  }

  const addTopText = () => {
    if (topTextRef.current && imageUrl) {
      setTopText(topTextRef.current.value)
    }

  }

  const addBottomText = () => {
    if (bottomTextRef.current && imageUrl) {
      setBottomText(bottomTextRef.current.value)
    }
  }

  const [fontColor, setFontColor] = useState("#FFFFFF");
  const [editColor, setEditColor] = useState(false);
  const colorRef = useRef<HTMLInputElement>(null);
  const changeColor = () => {
    if (editText) {
      setEditText(false)
    }
    if (imageUrl) {
      setEditColor(editColor => !editColor);
    }
  }

  const pickColor = () => {
    if (colorRef.current && imageUrl) {
      setFontColor(colorRef.current.value)
    }
  }

  return (
    <div className="App">
      <div className="meme-app">
        <div className="header">
          <div className="upload-section">
            <button disabled={showUploadPopup} onClick={() => { triggerUploadPopup(true) }}>Upload</button>
          </div>
        </div>
      </div>

      <div className='content' style={{ transform: `rotate(${rotateValue}deg)` }}>
        <div className='text top' style={{ color: fontColor }}>{topText}</div>
        {
          imageUrl ? <img style={{ height: `${height * scale}vmin`, width: `${width * scale}vmin` }}
            className={mirror ? 'mirror' : ''} src={imageUrl}></img> :
            <div className='image-container'>
              <span>Click the Upload button above to get started!</span>
            </div>
        }
        <div className='text bottom' style={{ color: fontColor }}>{bottomText}</div>
      </div>
      <div className='editor-btns'>
        <button disabled={!imageUrl} className={mirror ? 'active' : ''} onClick={() => toggleMirror()}>Mirror</button>
        <button disabled={!imageUrl} className={editRotate ? 'active' : ''} onClick={() => toggleRotate()}>Rotate</button>
        <button disabled={!imageUrl} className={editScale ? 'active' : ''} onClick={() => toggleScale()}>Scale</button>
        <button disabled={!imageUrl} className={editText ? 'active' : ''} onClick={() => addText()}>Add Text</button>
        <button disabled={!imageUrl} className={editColor ? 'active' : ''} onClick={() => changeColor()}>Font Color</button>
      </div>
      <div>
        {editRotate &&
          <div className='editor'>
            <input className={'rotate-slider'} type="range" min="0" max="360" ref={rotateRef} value={rotateValue} onChange={() => rotateImage()}></input>
            <span>{rotateValue}&deg;</span>
          </div>
        }
        {
          editScale &&
          <div className='editor'>
            <div className='scale-btns'>
              <button onClick={() => scaleImage(0.5)}>0.5x</button>
              <button onClick={() => scaleImage(1)}>1x</button>
              <button onClick={() => scaleImage(1.5)}>1.5x</button>
            </div>
          </div>
        }
        {editText &&
          <div className='editor'>
            <input placeholder={'Top Text'} type="text" ref={topTextRef} onChange={() => addTopText()}></input>
            <input placeholder={'Bottom Text'} type="text" ref={bottomTextRef} onChange={() => addBottomText()}></input>
          </div>
        }
        {editColor &&
          <div className='editor'>
            <input type="color" ref={colorRef} onChange={() => pickColor()} value={fontColor}></input>
          </div>
        }
      </div>
      <div className={showUploadPopup ? 'image-uploader' : 'hide'}>
        <ImageUploader triggerUploadPopup={triggerUploadPopup} submitImage={submitImage} />
      </div>
    </div>
  );
}

export default App;
