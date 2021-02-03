
//Can default a blank search to pull up random jobs. limit is 500.
fetch("http://api.dataatwork.org/v1/jobs?limit=100").then(function(response){
    if(response.ok){
        response.json().then(function(apidata){
            console.log("base response")
            console.log(apidata);
            
        })
    }
})

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
