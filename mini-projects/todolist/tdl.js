(function (){

    const todo=[];

    const todocontainer=document.getElementById("todo");
    const todoinput=document.createElement("input");
    todoinput.type="text";
    todoinput.placeholder="Enter task..."
    const addbtn=document.createElement("button");
    addbtn.textContent="ADD";
    todocontainer.append(todoinput,addbtn);

    const searchinput=document.createElement("input");
    searchinput.type="text";
    searchinput.placeholder="Search task..."
    const searchbtn=document.createElement("button");
    searchbtn.textContent="Search";


    searchbtn.addEventListener("click",function(){
        const query=searchinput.value.trim().toLowerCase();
        const items=todolist.querySelectorAll("div");
        // if search is empty show all tasks
        if(!query){
            for(let i=0;i<items.length;i++){
                items[i].style.display="";
            }
            return;
        }
        let found=false;
        for(let i=0;i<items.length;i++){
            const text=items[i].querySelector("p");
            if(text && text.textContent.toLowerCase().includes(query)){
                items[i].style.display="";
                found=true;
            } else {
                items[i].style.display="none";
            }
        }
        if(!found){
            alert("No matching task found!");
            // show all tasks back
            for(let i=0;i<items.length;i++){
                items[i].style.display="";
            }
        }
    })

    const todolist=document.createElement("div");
    todolist.style.border="2px solid black"
    todocontainer.append(searchinput,searchbtn,todolist);

    searchinput.addEventListener("keydown",function(e){
        if(e.key==="Enter") searchbtn.click();
    })

    // get next unique id from localStorage
    let nextId=parseInt(localStorage.getItem("todo_nextId")) || 0;

    function rendertask(task,id){
        const todoitem=document.createElement("div");
        todoitem.style.border="2px solid red";
        todoitem.style.margin="10px";

        const p=document.createElement("p");
        p.textContent=task;
        const deletebtn=document.createElement("button");
        deletebtn.textContent="Delete";
        const editbtn=document.createElement("button");
        editbtn.textContent="Edit";
        const completebtn=document.createElement("button");
        completebtn.textContent="Complete";

        completebtn.addEventListener("click",function(){
            todoitem.style.borderColor="green";
            completebtn.disabled=true;
        })
        
        editbtn.addEventListener("click",function(){
            const editinput=document.createElement("input");
            editinput.value=p.textContent;
            const savebtn=document.createElement("button");
            savebtn.textContent="Save";
            todoitem.prepend(editinput,savebtn);
            editinput.focus();
            savebtn.addEventListener("click",function(){
                const updatedtask=editinput.value;
                if(!updatedtask){
                    return;
                }
                p.textContent=updatedtask;
                // update in array
                const index=todo.indexOf(task);
                if(index!==-1) todo[index]=updatedtask;
                task=updatedtask;
                // update this task in localStorage
                localStorage.setItem("todo_"+id,updatedtask);
                console.log("todo array:",todo);
                editinput.remove();
                savebtn.remove();
            })
        })

        deletebtn.addEventListener("click",function(){
            // remove from array
            const index=todo.indexOf(p.textContent);
            if(index!==-1) todo.splice(index,1);
            localStorage.removeItem("todo_"+id);
            todoitem.remove();
            console.log("todo array:",todo);
        })
        todoitem.append(p,completebtn,deletebtn,editbtn);
        todolist.prepend(todoitem);
        
    }

    function addtodo(){
        const task=todoinput.value;
        if(!task){
            return;
        }
        localStorage.setItem("todo_"+nextId,task);
        // add to array
        todo.push(task);
        rendertask(task,nextId);
        console.log("todo array:",todo);
        nextId++;
        localStorage.setItem("todo_nextId",nextId);
        todoinput.value="";
        todoinput.focus();
    }

    addbtn.addEventListener("click",addtodo);
    todoinput.addEventListener("keydown",function(e){
        if(e.key==="Enter"){
            addtodo();
        }
    })

    for(let i=0;i<nextId;i++){
        const task=localStorage.getItem("todo_"+i);
        if(task){
            todo.push(task);
            rendertask(task,i);
        }
    }
    console.log("todo array:",todo);

})()