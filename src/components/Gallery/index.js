import React, { Component } from 'react'
import axios from 'axios'
import './Gallery.css'

class Gallery extends Component{

    state = {
        src: "https://picsum.photos/200/300/?random",
        imageInBase64: '',
        amount: 1
    }

    componentDidMount(){

        axios.get(this.state.src, { responseType:"blob" })
            .then(response => {

                const reader = new FileReader();
                reader.readAsDataURL(response.data);
                reader.onload = ()=> {
                    const imageDataUrl = reader.result;
                    this.setState({
                        imageInBase64: "url("+imageDataUrl+")"
                    })
                }
            });
    }

    addImageCopy = () =>{
       this.setState({
           amount: this.state.amount + 1
       })
    }

    subtractImageCopy = () =>{
        if(this.state.amount !== 0){
            this.setState({
                amount: this.state.amount - 1
            })
        }
    }

    render(){
        const style = {

            backgroundImage: this.state.imageInBase64,

        }
        let images =''
        if (this.state.amount){
            images = [...Array(this.state.amount)].map((_, index) =>{
                return <div className="newImage" style={style} key={index}/>
            })
        }else{
            images = <p>There are no images yet.</p>
        }
        return(
            <div className="Gallery">
                <div className="Images">
                    {images}
                </div>
                <div className="Amount">
                    {this.state.amount}
                </div>
                <div className="Buttons">
                    <button onClick={this.addImageCopy}>+</button>
                    <button onClick={this.subtractImageCopy}>-</button>
                </div>
            </div>
        )
    }

}

export default Gallery