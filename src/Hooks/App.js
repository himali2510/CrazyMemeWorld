import React, { useState, useEffect } from "react";
import { Meme } from './Meme';

 // Array of strings in key-values for pass in queary as param
const ObjectToQuearyParam = obj => {
  const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`);
  return "?" + params.join("&")// & in between each key value pair 
}


function App() {
    //StateHook[useState] For Bring/To use state in functional component multy time
    const [Templates, setTemplates] = useState([]);//All images
    const [Template, setTemplate] = useState(null);//selected img
    const [Toptext, setToptext] = useState("");//top text
    const [Bottomtext, setBottomtext] = useState("");//bottom text
    const [meme, setMeme] = useState(null);//Created Meme

    
    //EffectHook(16.7+)=For respond to lifecycle events//didmountDidupdt with class components
    useEffect(() => {
      fetch("https://api.imgflip.com/get_memes").then(apiData =>
      apiData.json().then(response =>
            setTemplates(response.data.memes))
        );
    }, []);
    /*2nd param empty aray bcoz,fncallsupplied in UseEffect with that array, 
            is chnged so oput needs to be rerender again
            retriving the data from bckend should only once
            means func supplied here is only called or executed once at the beginning
            when 1st render is going to hpn
          */



    // Customized Image or Meme
    if (meme) {
      return (<div style={{textAlign:"center"}}>
        <img style={{minHeight: 600 ,minWidth: 600, maxWidth: 600 ,maxHeight: 600}} src={meme} alt="Custom Meme" />
      </div>);
    }


    return (
        <div style={{ textAlign: "center" }} >
        {/*When Image Template Is Selected*/}
        {Template && (
          <form 
          onSubmit={async e => {
            e.preventDefault();
            //add logic to create meme from api
            const params = {
              template_id: Template.id,
              text0: Toptext,
              text1: Bottomtext,
              username: 'xzk03017',
              password: 'xzk03017@cndps.com'
            };
            const response = await fetch(
              `https://api.imgflip.com/caption_image${ObjectToQuearyParam(
                params
              )}`
            );
            const json = await response.json();
           console.log(json);
            
            setMeme(json.data.url);
   
          }}>

             {/* ReUse Style of image using Meme */}
            <Meme Template={Template} />
            <input
              placeholder="Top Text"
              value={Toptext}
              onChange={e => setToptext(e.target.value)} />
            <input
              placeholder="Bottom Text"
              value={Bottomtext}
              onChange={e => setBottomtext(e.target.value)} />
            <button
              type="submit" >Create Meme</button>
          </form>
        )}

        {/* All Templates */}
        {!Template && (
          <>
            <h1>Pick a Image</h1>
            {Templates.map(template => {
              return (
                <Meme
                  Template={template}
                  onclick={() => {
                    setTemplate(template);
                  }}
                />
              );
            })}
          </>
        )}
        </div>
    );
}

export default App;
