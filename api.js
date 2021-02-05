//global var because I can't figure out how to use .then return values
var uuids = [];
//use this "http://api.dataatwork.org/v1/jobs/autocomplete?contains=" + search-entry; 
fetch("http://api.dataatwork.org/v1/jobs/autocomplete?contains=teacher").then(function(response){
    if(response.ok){
        response.json().then(function(apidata){
            console.log("Jobs:");
            console.log(apidata);
            for (var i = 0; i<10; i++){
                uuids.push(apidata[i].uuid);
            }
         //This .then was to make sure the .push above was functioning properly 
         //Remove for actual implementation
        }).then(function(){
            console.log("uuids x10");
            for(var i = 0; i<uuids.length;i++){
                console.log(uuids[i]);
            }
        })
        //end remove
    }
    
})

for(var i =0; i<10; i++){
    fetch("http://api.dataatwork.org/v1/jobs/" + uuids[i] + "/related_skills").then(function(response){
        if(response.ok){
            response.json().then(function(apidata){
                console.log("Related skills");
                for(var i = 0; i<10){
                     var randomI= Math.floor(Math.random()*apidata.skills.length)
                console.log(apidata.skills[randomI].skill_name);
                console.log(apidata.skills[randomI].description);
            }
        })
        }
    })
    //should clear the global uuid array variable back to empty for new searches
    uuids = [];
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
