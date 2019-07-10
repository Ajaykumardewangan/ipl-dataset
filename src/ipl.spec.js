import {
  getNoOfMatchesPlayed,
  getNoOfMatchesWonPerTeamPerYear,
  getExtraRunsPerTeamForYear,
  getEconomicalBowlersForYear
} from "./ipl";

describe("IPL module", () => {
  describe("No. of matches played per team for all years, getNoOfMatchesPlayed", () => {
    const matchesSample = [
      {
        season: 2008
      },
      {
        season: 2009
      },
      {
        season: 2008
      }
    ];
    const expectedResult = {
      2008: 2,
      2009: 1
    };
    test("should exist", () => {
      expect(getNoOfMatchesPlayed).toBeDefined();
    });
    test("should return an object", () => {
      expect(getNoOfMatchesPlayed(matchesSample)).toBeDefined();
      expect(typeof getNoOfMatchesPlayed(matchesSample)).toEqual("object");
      expect(getNoOfMatchesPlayed(matchesSample)).toEqual(expectedResult);
    });
  });

  
  describe("No. of matches won per team per year, getNoOfMatchesWonPerTeamPerYear", () => {
    const wonPerTeam = [
      {
        season:2008,
        winner:"BLR"
      },
      {
        season:2008,
        winner:"MUMBAI"
      },
      {
        season:2008,
        winner:"BLR"
      },
      {
        season:2009,
        winner:"CSK"
      },
      {
        season:2009,
        winner:"CSK"
      },
      {
        season:2009,
        winner:"MUMBAI"
      }
    ];
    const expectedResult = {
      2008 : {
        "BLR":2,
        "MUMBAI":1
      },
      2009:{
        "CSK":2,
        "MUMBAI":1
      }
    }
    test("should exist", () => {
      expect(getNoOfMatchesWonPerTeamPerYear).toBeDefined();
    });
    test("should return an object", () => {
      expect(getNoOfMatchesWonPerTeamPerYear(wonPerTeam)).toBeDefined();
      expect(typeof getNoOfMatchesWonPerTeamPerYear(wonPerTeam)).toEqual("object");
      expect(getNoOfMatchesWonPerTeamPerYear(wonPerTeam)).toEqual(expectedResult);
    });

  });

  
  describe("Extra runs conceeded per team for year, getExtraRunsPerTeamForYear", () => {
    const objMatches = [
      {
         season:2016,
         id :1  
      },
      {
        season:2017,
        id:2,
      }

    ];

    const objDeliveries = [
      {
          match_id:1,
          batting_team:"KKR",
          extra_runs:2,
      },
      {
          match_id:1,
          batting_team:"KKR",
          extra_runs:3,
      },
      {
          match_id:1,
          batting_team:"MUMBAI",
          extra_runs:1,
      },
      {
        match_id:2,
        batting_team:"RPS",
        extra_runs:2,
      },
      {
        match_id:2,
        batting_team:"KKR",
        extra_runs:2,
      }

    ];

    const expectedResult = {
      "KKR" : 5,
      "MUMBAI" : 1

    }
    test("should exist", () => {
      expect(getExtraRunsPerTeamForYear).toBeDefined();
    });
    test("should return an object", () => {
      expect(getExtraRunsPerTeamForYear(objMatches,objDeliveries)).toBeDefined();
      expect(typeof getExtraRunsPerTeamForYear(objMatches,objDeliveries)).toEqual("object");
      expect(getExtraRunsPerTeamForYear(objMatches,objDeliveries)).toEqual(expectedResult);
    });
  });

  describe("Economical bowlers for year, getEconomicalBowlersForYear", () => {
    const objMatches = [
        {
          id : 5,
          season : 2015

        }
    ]

    const objDeliveries = [
      {
        match_id : 5,
        bowler : 'J YADAV',
        total_runs : 2,
        ball : 1
      },
      {
        match_id : 5,
        bowler : 'J YADAV',
        total_runs : 0,
        ball : 2
      },
      {
        match_id : 5,
        bowler : 'J YADAV',
        total_runs : 1,
        ball : 3
      },
      {
        match_id : 5,
        bowler : 'J YADAV',
        total_runs : 0,
        ball : 4
      },
      {
        match_id : 5,
        bowler : 'J YADAV',
        total_runs : 4,
        ball : 5
      },
      {
        match_id : 5,
        bowler : 'J YADAV',
        total_runs : 1,
        ball : 6
      }

    ]

     const expectedResult = {
       'J YADAV' : 8,
     }
    test("should exist", () => {
      expect(getEconomicalBowlersForYear).toBeDefined();
    });
    test("should return an object", () => {
      expect(getEconomicalBowlersForYear(objMatches,objDeliveries)).toBeDefined();
      expect(typeof getEconomicalBowlersForYear(objMatches,objDeliveries)).toEqual("object");
      expect(getEconomicalBowlersForYear(objMatches,objDeliveries)).toEqual(expectedResult);
    });
  });
});
