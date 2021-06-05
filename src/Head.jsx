import "./styles.css";
import axios from 'axios'
import urlMetadata from 'url-metadata';
import  Pagination from '@material-ui/lab/Pagination';
import Dictaphone from './mic';
import React, { Component } from 'react'




class Head extends Component{
  
  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.getMetaData = this.getMetaData.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      currentPage:0,
      totalResults:0,
      showDropdown:false,
      isLoading:true,
      data:[],
      suggestions:[],
      appropriateSuggestions:{},
      chosenIndex:-1,
      userInput:"",
    };
}

componentDidMount()
{
  axios.get("https://searchengine123.herokuapp.com/history" )
  .then((res) =>  {
    // console.log(res)
    var dict = []  
    res.data.map( item =>
      dict.push(item.word))
    this.setState({
      suggestions:dict,
    })
    // console.log(this.state.suggestions)
  }  
  )
  .catch((err) =>  {
    console.log(err)
  })

}

 fetchData(key){
  axios.get("https://searchengine123.herokuapp.com/findWord/"+key )
  .then((res) =>  {
    console.log("https://searchengine123.herokuapp.com/findWord/"+key)
    // console.log(res)
    if(res.data!=="")
    {
      this.setState({
        urls:res.data.urls,
        userInput:"",
      })
    }
    else{
      this.setState({
        urls:[],
        data:[],
        userInput:"",
      })
    }
    this.getMetaData(this.state.urls);

  }  
  )
  .finally(
    // console.log(this.state.urls),
    this.setState({
      isLoading:false})
  )
 }

 callbackFunction = (childData) => {
   
   if(this.state.userInput !== childData)
   {
    console.log(childData)
     this.setState({
       userInput: childData,
  })
  var event = new Event('onChange');
   var element =document.getElementById("inputMain");
   element.dispatchEvent(event);
  const newSuggestions = this.state.suggestions.filter(
    suggestion =>
      suggestion.toLowerCase().indexOf(childData.toLowerCase()) > -1
  );

  this.setState({
      showDropdown: true,
      appropriateSuggestions:newSuggestions,
    });

   }
}

onChange = e => {
  const input = e.currentTarget.value;
  const newSuggestions = this.state.suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(input.toLowerCase()) > -1
    );

  this.setState({
      showDropdown: true,
      userInput:input,
      appropriateSuggestions:newSuggestions,
    });

}
handleChange = (event, value) => {
      // console.log(value)
    this.setState({
      currentPage:value,
    });
};


 onKeyDown = e => {
    var current=this.state.chosenIndex;
    if (e.keyCode === 13) {
        this.setState({
            isLoading:true,
            chosenIndex:-1,
            showDropdown: false,
          });
          this.fetchData(this.state.userInput);

      }
      else if (e.keyCode === 38) {
        if (current === 0) {
          return;
        }
  
        this.setState({ 
          chosenIndex: current - 1,
          userInput: this.state.appropriateSuggestions[this.state.chosenIndex - 1]

        });
      }
      // down arrow
      else if (e.keyCode === 40) {
        if (current  === this.state.appropriateSuggestions.length - 1 ) {
          return;
        }
        this.setState({
           chosenIndex: current + 1,
           userInput: this.state.appropriateSuggestions[this.state.chosenIndex+ 1]
          });
      }

 }

  
getMetaData(urls)
{
  console.log(urls)
   var meta=Array(urls.length).fill({})
   this.setState({
     data:Array(urls.length).fill({})
   })

   urls.map((url,i) => (
    urlMetadata(url.url).then(res => {
      meta[i]={
        url:res.url,
        description:res.description,
        title:res.title,
      }
      const newData = this.state.data.slice() //copy the array
      newData[i] = meta[i] //execute the manipulations
      this.setState({data: newData}) 
      //set the new state
     })
     .catch(err => {
      console.log(err);
    })
   ))
   
    this.setState({
      //  data:meta,
       totalResults:urls.length,
       currentPage:1
     })
 
}
render(){ 
  document.title ="APT Search Engine";
  // console.log(this.state.currentPage)
  // console.log(this.state.data)
  return (
    <div>
      <div className="header">
      <div className="d-flex justify-content-center" id="inputContainer">
        <div className="d-flex justify-content-center" id="pageTitle">
          How Can we help you ?!
        </div>
        <div className="searchbar">
          <input className="search_input" type="text"  
          id="inputMain"
           placeholder="What's in your mind?!..." 
           onKeyDown={this.onKeyDown}
           value={this.state.userInput}
          onChange={this.onChange}/>
          <div className="search_icon" name="search-btn" >
            <i className="fas fa-search"></i>
            <div className="mic">
              <Dictaphone text={this.callbackFunction} />
            </div>
          </div>
          
          {(this.state.userInput !=="" && this.state.showDropdown=== true)?  (
          <div>

            <ul className="suggestions">
            {this.state.appropriateSuggestions.map((suggestion, index) => {
              let className;

              if (index === this.state.chosenIndex) {
                className = "suggestion-active";
              }
              return (
                <li key={suggestion}  className ={className}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
          </div>):
          (<div></div>) 
          }

      </div>
      
     
    </div>
    </div>
 <div className="lowerContaniner">

   <div>
        {(this.state.isLoading ===false)?
          (<div className="box">
              {
              (this.state.data.length !==0 )? 

               this.state.data.slice((this.state.currentPage - 1) * 10,
                ( (this.state.currentPage * 10) < this.state.totalResults ) ?
                this.state.currentPage * 10 :  this.state.totalResults  ).map(i => (
                  <div className="clearfix search-result">
                      <h4><a href={i.url}>{i.title}</a></h4>
                      <small className="text-success">{i.url}</small>
                      <p>{i.description}</p>
                      <br/>
                  </div>        
                ))
                
                :
                <h2 > Oops !! Not Found </h2>         
              }
              <div className = "d-flex justify-content-center">
                <Pagination count={Math.ceil(this.state.totalResults/10)}
                 defaultPage={1} page={this.state.currentPage} color="secondary"
                 onChange={this.handleChange}
                />
            </div>
          </div>
          
          ) : 
          <div> 
               <div> we are waiting for your search query ..</div>
          </div>           
        }    
  </div>
  </div>
  </div>

  );
}
}


export default Head;