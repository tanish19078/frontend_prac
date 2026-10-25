function tabs(){

    const[activeTab,setactiveTab]=useState("profile")
    return(
        <>
        <div className="tabs-container">
                <h2>Student Dashboard</h2>
                <div className="tabs">
                    <button onClick={()=> setactiveTab("profile")}>Profile</button>
                    <button onClick={()=> setactiveTab("courses")}>Courses</button>
                    <button onClick={()=> setactiveTab("result")}>Result</button>
                </div>
        </div>

        <div className="tab-content">
{activeTab==='profile' && 
<div>
    <p>WELCOME TO STUDENT DASHBOARD</p>
    }

        </div>
        </>
    )
}
export default tabs;