// function test1(a,b){
//     return a+b;
// }
// console.log(test1(10,20));

// const sum=(a,b)=>a+b;
// console.log(sum(702,404));


function placeOrder(){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve("order placed")
        }, 2000);
    })
}

function processPayment(){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve("payment processed")
        }, 2000);
    })
}

function inventoryupdate(){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve("updated inventory")
        }, 2000);
    })
}

function sendEmail(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>
{reject("Email sent");}
    ,2000);    })
}

placeOrder().then(result=>{
    console.log(result);
    return processPayment();
}).then(result=>{
    console.log(result);
    return inventoryupdate();
}).then(result=>{
    console.log(result);
}).catch(error);
;


// now we try to reject a promise in this nested callback hell