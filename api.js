//use this "http://api.dataatwork.org/v1/jobs/autocomplete?contains=" + search-entry;
//Updated for titles to work! And the one fifth column is removed. We'll probably want bottom margins.
function getskills(){
        var uuids = [];
        var jobTitles = [];
        var counter=0;
        //first fetch
        fetch("http://api.dataatwork.org/v1/jobs/autocomplete?contains=teacher").then(function(response){
            if(response.ok){
            response.json().then(function(apidata){
                console.log("Jobs:");
                console.log(apidata);
                for(var i=0; i<10; i++){
                uuids.push(apidata[i].uuid);
                jobTitles.push(apidata[i].suggestion);
                }  
            }).then(function(){
                //second fetch
                //
                //I need this part done per job
                for(var i=0; i<uuids.length; i++){
                fetch("http://api.dataatwork.org/v1/jobs/" + uuids[i] + "/related_skills").then(function(respond){
                if(respond.ok){
                respond.json().then(function(data){
                console.log("Related skills");
                 //html element creation
                 var createCardColumn = document.createElement('div');
                 //createCardColumn.className = "card column";
                 var cardHeader = document.createElement('header');
                 cardHeader.className = "card-header";
                 var cardTitle = document.createElement('h2');
                 cardTitle.className = "card-header-title is-centered";
                 var cardContent = document.createElement('div');
                 cardContent.className = "card-content";
                 var innerCardContent = document.createElement('div');
                 innerCardContent.className = "content";
                 var cardFooter = document.createElement('footer');
                 cardFooter.className = "card-footer"; 
                 console.log("value of i "+ counter);  
                 console.log(jobTitles[counter]);
                 cardTitle.textContent = jobTitles[counter];
                 counter++
                 cardHeader.appendChild(cardTitle);   
                for(var j = 0; j<10; j++){
                    //random "i" value to get a random skill and its description
                     var randomI= Math.floor(Math.random()*data.skills.length)
                    console.log(data.skills[randomI].skill_name);
                    console.log(data.skills[randomI].description);
                    var skillName = data.skills[randomI].skill_name;
                    var skillDescription = data.skills[randomI].description;
                    var p4skill =document.createElement("p");
                    var p4description = document.createElement("p");
                    p4skill.className = "pskill";
                    p4description.className = "pdescription";
                    p4skill.textContent = skillName;
                    p4description.textContent = skillDescription;
                    innerCardContent.appendChild(p4skill);
                    innerCardContent.appendChild(p4description); 
                    //end of j for
                    }
                   //Appending content here
                   resultsCards.appendChild(createCardColumn);
                   createCardColumn.appendChild(cardHeader);
                   
                   createCardColumn.appendChild(cardContent);
                   cardContent.appendChild(innerCardContent);
                   createCardColumn.appendChild(cardFooter); 
                }) //end 2nd fetch function data
                } // end 2nd api respond.ok
            }) //end of 2nd fetch
            } //end of for loop
            })
            //end first fetch if(response.ok)
        }
        //end first fetch
        })
        uuids = [];   
 //end function call
}


//Can default a blank search to pull up random jobs. limit is 500.
fetch("http://api.dataatwork.org/v1/jobs?limit=100").then(function(response){
    if(response.ok){
        response.json().then(function(apidata){
            console.log("base response")
            console.log(apidata);
            
        })
    }
})


//Everything after this point is reference






//use this "http://api.dataatwork.org/v1/jobs/autocomplete?contains=" + search-entry; 
fetch("http://api.dataatwork.org/v1/jobs/autocomplete?contains=teacher").then(function(response){
    if(response.ok){
        response.json().then(function(apidata){
            console.log("Jobs:");
            console.log(apidata);
        })
    }
})

// uuid is the attribute we want from the jobs ^^^ to plug into this one for related skills
//From the array we get we go skills -> which gives objects of skills (we want) skill_name & description 
//for each skill object.
// use this "http://api.dataatwork.org/v1/jobs/" + uuid + "/related_skills"
fetch("http://api.dataatwork.org/v1/jobs/2c92effbbca763fc5b05c0afaee2d3ea/related_skills").then(function(response){
    if(response.ok){
        response.json().then(function(apidata){
            console.log("Related skills");
            console.log(apidata);
        })
    }
})

// use this "http://api.dataatwork.org/v1/skills/autocomplete?contains=" + skills-search-entry;
//this appears to list skills only with no reference to the job?
fetch("http://api.dataatwork.org/v1/skills/autocomplete?contains=javascript").then(function(response){
    if(response.ok){
        response.json().then(function(apidata){
            console.log("skills:")
            console.log(apidata);
        })
    }
})
