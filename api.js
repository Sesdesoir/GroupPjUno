//use this "http://api.dataatwork.org/v1/jobs/autocomplete?contains=" + search-entry; 
fetch("http://api.dataatwork.org/v1/jobs/autocomplete?contains=teacher").then(function(response){
    if(response.ok){
        response.json().then(function(apidata){
            console.log("Jobs:");
            console.log(apidata);
        })
    }
})
// use this "http://api.dataatwork.org/v1/skills/autocomplete?contains=" + skills-search-entry;
//this appears to list skill only with no reference to the job?
fetch("http://api.dataatwork.org/v1/skills/autocomplete?contains=javascript").then(function(response){
    if(response.ok){
        response.json().then(function(apidata){
            console.log("skills:")
            console.log(apidata);
        })
    }
})
