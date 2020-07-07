//import MockData from './MockData.json';
import React from "react";

class Project_overview extends React.Component {
    constructor(){
        super();
        this.state = {
            items: [{startDate: null, endDate: null, description: null}]
        }
    }

    componentDidMount(){
        this.getItems();
    }

    getItems(){
        fetch("http://localhost:8080/MockData.json")
        .then(results => results.json())
        .then(data => {
        console.log(data)
        this.setState({ items: data })
})
.catch(e => console.error(e))
    }


    render() {
        //maybe try looping this 5 times or something
        return(
            <div>
            <form className = "form-container">
              {this.state.items.map(item =>
                <div> 
                <label>Start Date: {item.startDate} </label>
                <label>End Date: {item.endDate}</label>
                <label>Description: </label>
                <p>{item.description}</p>
                </div>
              )
              }
            </form>
            </div> 
          );
          
    }
}




export default Project_overview;