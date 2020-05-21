import React, { Component } from 'react';

class MemeGenerator extends Component {
  constructor() {
    super();
    //Set default value to state param
    this.state = {
      isMemeGenerated: false,
      textTop: '',
      textBottom: '',
      allMemeImgs: [],
      randomImg: 'http://i.imgflip.com/1x6f.jpg'
    };
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleImageChange = this.handleImageChange.bind(this)
  }
  
  // Fetch all the images from imgflip api and store in a state
  async componentDidMount() {
    this.setState({
      isMemeGenerated: true
    });

    await fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(content =>
        this.setState({
          allMemeImgs: content.data.memes,
          isMemeGenerated: false
        })
      );
  }
//Will update state value whenever input text value changes  
  handleInputChange = event => {
    const { name, value } = event.target;
    // Will fetch event.target.name and set value according to it
    this.setState({
      [name]: value
    });
  };

  //Will show image randomly
  handleImageChange = event => {
    event.preventDefault();
    const { allMemeImgs } = this.state;
    const rand =
      allMemeImgs[Math.floor(Math.random() * allMemeImgs.length)].url;
    this.setState({
      randomImg: rand
    });
  };

  render() {
    return (
      <div className='container'>
        <form className="meme-form" onSubmit={this.handleImageChange}>
          <input
            type="text"
            name="textTop"
            placeholder="Top Text"
            value={this.state.textTop}
            onChange={this.handleInputChange}

          />
          <input
            type="text"
            name="textBottom"
            placeholder="Bottom Text"
            value={this.state.textBottom}
            onChange={this.handleInputChange}

          />
          <button>Change </button>

        </form>
        <div className='meme'>
          <img src={this.state.randomImg} alt='' />
          <h2 className='top'>{this.state.textTop}</h2>
          <h2 className='bottom'>{this.state.textBottom}</h2>
        </div>
      </div>
    )
  }
}
export default MemeGenerator;