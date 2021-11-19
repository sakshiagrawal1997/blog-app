import React, { useEffect } from 'react';
import './style.css';
import { useState } from 'react';

function Comment(params){
    var blogId = params.blogId;
    const [comment,setComment] = useState();
   
    var commentList = localStorage.getItem("commentList");
    var comment_h;
    console.log(commentList);
    function renderComment(){
        commentList = localStorage.getItem("commentList");
        console.log("Render Comment");
        if(commentList != null){
            var {comments} = JSON.parse(commentList);
            comments = comments.filter((comment) => comment.blogid === blogId);
            console.log(comments);
            comment_h = comments.map((item)=>{
                return(

                        <div class="comment mt-4 text-justify float-left">
                            <h4>{item.name}</h4> <br></br>
                            <p>{item.comment}</p>
                        </div>

            
            );
            });
            console.log(comment_h);
            setComment(comment_h);
        };
    }
    useEffect(()=>{
        renderComment();
    },[]);
    // setComment(comment_h);
    useEffect(() => {
        setComment(comment_h);
    }, [comment_h]);
    

    var blogId = params.blogId;
    let globalStore = [];
 
    const loadInitialCardData = () => {
        //loaclStorage to get tasky card data
        const commentList = localStorage.getItem("commentList");
        if(commentList != null){
            //convert to normal object
            const {comments} = JSON.parse(commentList);
        
            //loop over those array of task object to create HTML card, inject it to DOM
            comments.map((comment) => {
                // taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));
        
                //update our globalStore
                globalStore.push(comment);
            });
        }
    
    };
    loadInitialCardData();
    // else glo
    function saveChanges() {
        const commentData = {
            id:  `${Date.now()}`, //Date.now() generates a unique id every second
            comment: document.getElementById("comment").value,  //document is the parent of html
            name: document.getElementById("name").value,
            blogid : blogId
            // taskTitle: document.getElementById("tasktitle").value,
            // taskType: document.getElementById("tasktype").value,
            // teaskDescription: document.getElementById("taskdescription").value
        } 
    
        // taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData));
        console.log(commentData);
        globalStore.push(commentData);
        console.log(globalStore);
        
        localStorage.setItem("commentList",JSON.stringify({comments : globalStore})); //localStorage -> represents our local storage, setItems-> setting whatever is in second parameter to local storage
        renderComment();
        //push cant be used in localStorage
        //tasky -> specific id so that we get only our data in local storage
    };
    // else glo
    return(

        <div class="container">
            <div class="row">
                <div class="col-sm-5 col-md-6 col-12 pb-4">
                    <h1>Comments</h1>
                    {comment}
                </div>
                <div className="col-lg-4 col-md-5 col-sm-4 offset-md-1 offset-sm-1 col-12 mt-4">
                    <form id="algin-form">
                        <div className="form-group">
                        <h4>Leave a comment</h4> <label htmlFor="message">Message</label> <textarea name="msg" id="comment" msg cols={30} rows={5} className="form-control color-white" style={{backgroundColor: 'black'}} defaultValue={""} />
                        </div>
                        <div className="form-group"> <label htmlFor="name">Name</label> <input type="text" name="name" id="name" className="form-control focus_black color-white" /> </div>
                        {/* <div className="form-group"> <label htmlFor="email">Email</label> <input type="text" name="email" id="email" className="form-control focus_black color-white" /> </div> */}
                        <div className="form-group"> <button type="button" classname="btn btn-primary" onClick={saveChanges}>Post Comment</button> </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Comment;