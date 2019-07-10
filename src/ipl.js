
const fs = require('fs');
const csv = require('csvtojson');

csv()
.fromFile("ipl/matches.csv")
.then((objMatches) => {
    csv()
    .fromFile("ipl/deliveries.csv")
    .then((objDeliveries) => {
        let ipl = {
            noOfMatechesplayed : getNoOfMatchesPlayed(objMatches),
            eachTeamNoOfMatchesWon : getNoOfMatchesWonPerTeamPerYear(objMatches),
            extraRunInYear : getExtraRunsPerTeamForYear(objMatches,objDeliveries),
            ecoBowlerInYear :getEconomicalBowlersForYear(objMatches,objDeliveries),
            Rcb : rcbplayers(objMatches,objDeliveries)
        }

        fs.writeFile("iplAllFunc2.json",JSON.stringify(ipl, null,10),(err)=>{
            if (err){
            console.log("err");
            }
        });
        
    })
})

 const getNoOfMatchesPlayed = (objMatches) => {
    let matchesPlayPerYear = objMatches.reduce( (YearNplayed,obj) => {
        if(YearNplayed.hasOwnProperty(obj.season))
               {
                   YearNplayed[obj.season]++;
               }
               else{
                   YearNplayed[obj.season]=1;
               }  
               
               return YearNplayed;
    },{});  
     return matchesPlayPerYear;
    };
   

 


 const getNoOfMatchesWonPerTeamPerYear = (objMatches) => {
 let wonMatchesPerTeam = objMatches.reduce((noOfWonPerTeam,obj) => {

     if(noOfWonPerTeam.hasOwnProperty(obj.season))
      {
        if(noOfWonPerTeam[obj.season].hasOwnProperty(obj.winner))
        {
            noOfWonPerTeam[obj.season][obj.winner]++;
        }
        else if(obj.winner != undefined)
        {
            noOfWonPerTeam[obj.season][obj.winner]=1;
        }
      }
      else{
        noOfWonPerTeam[obj.season]={};
        noOfWonPerTeam[obj.season][obj.winner]=1;
      }
      return noOfWonPerTeam;
         
     },{});
   return wonMatchesPerTeam;
 };
 //console.log(getNoOfMatchesWonPerTeamPerYear(objMatches));



 const getExtraRunsPerTeamForYear = (objMatches,objDeliveries) => {
 const ExtraRunsPerTeam = objMatches.reduce((extraRunNteam,obj) =>{
        if(obj.season == 2016)
              {
                //for( j=0;j<objDeliveries.length; j++)
                objDeliveries.map((objDel) => {
                    if(obj.id == objDel.match_id)
                    {
                        if(extraRunNteam.hasOwnProperty(objDel.batting_team))
                        {
                            extraRunNteam[objDel.batting_team]+= parseInt(objDel.extra_runs);
                        }
                        else{
                            extraRunNteam[objDel.batting_team] = parseInt(objDel.extra_runs);
                        }
                    }
                });
            }
            return extraRunNteam;
            
        },{})

        
 return ExtraRunsPerTeam;
 };
//console.log( getExtraRunsPerTeamForYear(objMatches,objDeliveries));
 
 const getEconomicalBowlersForYear = (objMatches,objDeliveries) => {
    const EconomicalBowlers = objMatches.reduce((bowlersRunOver,obj) => {
        if(obj.season == 2015)
         {
             objDeliveries.map((objDel) =>
             {
                 if(obj.id == objDel.match_id)
                 {
                     if(bowlersRunOver.hasOwnProperty(objDel.bowler))
                     {
                        bowlersRunOver[objDel.bowler].total_runs+= parseInt(objDel.total_runs);
                         if(objDel.ball == 6)
                         {
                            bowlersRunOver[objDel.bowler].overs++; 
                         }
                     }
                     else{
                         bowlersRunOver[objDel['bowler']]={};
                         bowlersRunOver[objDel.bowler]['total_runs'] = parseInt(objDel.total_runs);
                         bowlersRunOver[objDel.bowler]['overs'] = 0;
                     }    
                 }
             })
         }
         return bowlersRunOver;
    },{})

     let EcoAvg = Object.keys(EconomicalBowlers).map((name) =>{
         return  [name,EconomicalBowlers[name]['total_runs']/EconomicalBowlers[name]['overs']];
     })
       
     EcoAvg.sort((firstArray,secondArray) => {
       return firstArray[1]-secondArray[1];
      });
     EcoAvg=EcoAvg.splice(0,10);    
     let EcoKeyValue = EcoAvg.reduce((keyVal,arrayVal) =>{
       keyVal[arrayVal[0]] = arrayVal[1];
       return keyVal;
      },{});
    return EcoKeyValue;  
};
 //getEconomicalBowlersForYear(objMatches,objDeliveries) 
//console.log( getEconomicalBowlersForYear(objMatches,objDeliveries));

//  const rcbplayers = (objMatches,objDeliveries) =>
//  {
//      let rcbPlayer = objMatches.reduce((playedPerYear,obj) => {
//          if(obj.team1 == "Royal Challengers Bangalor" || obj.team2 == "Royal Challengers Bangalor")
//          {
//              objDeliveries.map((bowlerBatsman) => {
//                  if(bowlerBatsman.match_id == obj.id )
//                  {
//                      if(bowlerBatsman.batting_team == "Royal Challengers Bangalor")
//                      {
//                          if(playedPerYear.hasOwnProperty(obj.season))
//                          {
//                              playedPerYear[obj.season][bowlerBatsman.batsman]++;
//                          }
//                          else{
//                              playedPerYear[obj.season]={};
//                              playedPerYear[obj.season][bowlerBatsman.batsman]=1;
//                          }
//                          return bowlerBatsman;
//                      }
//                      else if(bowlerBatsman.bowling_team == "Royal Challengers Bangalor")
//                      {
//                         if(playedPerYear.hasOwnProperty(obj.season))
//                         {
//                             playedPerYear[obj.season][bowlerBatsman.bowler]++;
//                         }
//                         else{
//                             playedPerYear[obj.season]={};
//                             playedPerYear[obj.season][bowlerBatsman.bowler]=1;
//                         }
//                         return bowlerBatsman;
//                      }
//                  }
//                  return bowlerBatsman;
//              });
//          }
//          return playedPerYear
//      },{});

//      console.log(rcbPlayer);

//      return rcbPlayer;

//  }
const rcbplayers = (objDeliveries) =>
 {
     let prev=1;
     let rcbPlayer = objDeliveries.reduce((playedPerYear,obj) => {
           

                console.log(prev);
                if(obj.batting_team == "Royal Challengers Bangalore")
                     {
                         if(playedPerYear.hasOwnProperty(obj.batsman) && obj.match_id != prev)
                         {
                             playedPerYear[obj.batsman]++;
                         }
                         else{
                             playedPerYear[obj.batsman]=1;   
                         }
                         console.log("test string");

                         return playedPerYear;
                     }
                     else if(obj.bowling_team == "Royal Challengers Bangalore")
                     {
                        if(playedPerYear.hasOwnProperty(obj.bowler) && obj.match_id != prev)
                        {
                            playedPerYear[obj.bowler]++;
                        }
                        else{
                            playedPerYear[obj.bowler]=1;
                        }

                        return playedPerYear;
                       
                     } 

                    prev = parseInt(obj.match_id);
                     
                   return playedPerYear;
     },{});

     console.log(rcbPlayer);

     return rcbPlayer;

 }

   module.exports = {
    getNoOfMatchesPlayed,
    getNoOfMatchesWonPerTeamPerYear,
    getExtraRunsPerTeamForYear,
    getEconomicalBowlersForYear
   };


