(function (){
    let todos=JSON.parse(localStorage.getItem("todos")) || [];

    function savetodos(){
        localStorage.setItem("todos",JSON.stringify(todos));
    }
    

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
        if(!query) return;
        const items=todolist.querySelectorAll("div");
        for(let i=0;i<items.length;i++){
            const text=items[i].querySelector("p");
            if(text && text.textContent.toLowerCase().includes(query)){
                items[i].scrollIntoView({behavior:"smooth",block:"center"});
                items[i].style.backgroundColor="yellow";
                setTimeout(function(){
                    items[i].style.backgroundColor="";
                },2000);
                return;
            }
        }
        alert("No matching task found!");
    })

    const todolist=document.createElement("div");
    todolist.style.border="2px solid black"
    todocontainer.append(searchinput,searchbtn,todolist);

   

    function rendertask(task){
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
            editinput.value=task;
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
                const index=todos.indexOf(task);
                todos[index]=updatedtask;
                task=updatedtask;
                savetodos();
                editinput.remove();
                savebtn.remove();
            })
        })

        deletebtn.addEventListener("click",function(){
            const index=todos.indexOf(task);
            todos.splice(index,1);
            savetodos();
            todoitem.remove();
        })
        todoitem.append(p,completebtn,deletebtn,editbtn);
        todolist.prepend(todoitem);
        
    }
    function addtodo(){
        const task=todoinput.value;
        console.log(task);
        if(!task){
            return;
        }
        todos.unshift(task);
        savetodos();
     
        rendertask(task);
        todoinput.value="";
        todoinput.focus();


    }
    addbtn.addEventListener("click",addtodo);
    todoinput.addEventListener("keydown",function(e){
        // console.log(e);
        if(e.key==="Enter"){
            addtodo();
        }
    })

    // load saved tasks on page load
    todos.forEach(function(task){
        rendertask(task);
    })

})()