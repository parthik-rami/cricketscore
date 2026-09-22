import { Match } from '../types/cricket';

export function createDemoMatch(): Match {
  const teamAPlayers = [
    { id: 'p-a1', name: 'Shubman Gill', jerseyNumber: '77', isCaptain: true },
    { id: 'p-a2', name: 'Hardik Pandya', jerseyNumber: '33' },
    { id: 'p-a3', name: 'Sai Sudharsan', jerseyNumber: '23' },
    { id: 'p-a4', name: 'David Miller', jerseyNumber: '10' },
    { id: 'p-a5', name: 'Rahul Tewatia', jerseyNumber: '9' },
    { id: 'p-a6', name: 'Rashid Khan', jerseyNumber: '19' },
    { id: 'p-a7', name: 'Mohammed Shami', jerseyNumber: '11' },
    { id: 'p-a8', name: 'Mohit Sharma', jerseyNumber: '18' },
  ];

  const teamBPlayers = [
    { id: 'p-b1', name: 'Rohit Sharma', jerseyNumber: '45', isCaptain: true },
    { id: 'p-b2', name: 'Ishan Kishan', jerseyNumber: '32' },
    { id: 'p-b3', name: 'Suryakumar Yadav', jerseyNumber: '63' },
    { id: 'p-b4', name: 'Tilak Varma', jerseyNumber: '72' },
    { id: 'p-b5', name: 'Hardik Patel', jerseyNumber: '21' },
    { id: 'p-b6', name: 'Jasprit Bumrah', jerseyNumber: '93' },
    { id: 'p-b7', name: 'Piyush Chawla', jerseyNumber: '40' },
    { id: 'p-b8', name: 'Gerald Coetzee', jerseyNumber: '62' },
  ];

  const matchId = 'demo-match-ahmedabad-warriors';
  const inningsId = 'inn-1-demo';

  // Bumrah is b6, Shami is b8 (let's use b6 Jasprit Bumrah for over 0, b8 Gerald Coetzee for over 1)
  const bowlerBumrah = 'p-b6';
  const bowlerCoetzee = 'p-b8';

  const deliveries = [
    // Over 0: Bowled by Jasprit Bumrah
    // Ball 1: Hardik on strike, 0 runs (dot)
    {
      id: 'd-1',
      ballNumberInInnings: 1,
      legalBallNumber: 1,
      overNumber: 0,
      ballInOver: 1,
      batsmanId: 'p-a2', // Hardik
      nonStrikerId: 'p-a1', // Shubman
      bowlerId: bowlerBumrah,
      runsBat: 0,
      extras: 0,
      extraType: 'none' as const,
      isLegal: true,
      isWicket: false,
      timestamp: '18:01:10',
      note: 'Good length, pushed to mid-off',
    },
    // Ball 2: Hardik 1 run (swap strike)
    {
      id: 'd-2',
      ballNumberInInnings: 2,
      legalBallNumber: 2,
      overNumber: 0,
      ballInOver: 2,
      batsmanId: 'p-a2',
      nonStrikerId: 'p-a1',
      bowlerId: bowlerBumrah,
      runsBat: 1,
      extras: 0,
      extraType: 'none' as const,
      isLegal: true,
      isWicket: false,
      timestamp: '18:01:45',
      note: 'Dabbed to third man for a quick single',
    },
    // Ball 3: Shubman 4 runs!
    {
      id: 'd-3',
      ballNumberInInnings: 3,
      legalBallNumber: 3,
      overNumber: 0,
      ballInOver: 3,
      batsmanId: 'p-a1', // Shubman
      nonStrikerId: 'p-a2',
      bowlerId: bowlerBumrah,
      runsBat: 4,
      extras: 0,
      extraType: 'none' as const,
      isLegal: true,
      isWicket: false,
      timestamp: '18:02:20',
      note: 'Glorious cover drive speeding to the rope!',
    },
    // Ball 4: Wide (+1 extra, legal ball remains 3)
    {
      id: 'd-4',
      ballNumberInInnings: 4,
      legalBallNumber: 3,
      overNumber: 0,
      ballInOver: 3,
      batsmanId: 'p-a1',
      nonStrikerId: 'p-a2',
      bowlerId: bowlerBumrah,
      runsBat: 0,
      extras: 1,
      extraType: 'wide' as const,
      isLegal: false,
      isWicket: false,
      timestamp: '18:02:55',
      note: 'Fired down leg side, signaled wide',
    },
    // Ball 5: Shubman 6 runs!
    {
      id: 'd-5',
      ballNumberInInnings: 5,
      legalBallNumber: 4,
      overNumber: 0,
      ballInOver: 4,
      batsmanId: 'p-a1',
      nonStrikerId: 'p-a2',
      bowlerId: bowlerBumrah,
      runsBat: 6,
      extras: 0,
      extraType: 'none' as const,
      isLegal: true,
      isWicket: false,
      timestamp: '18:03:30',
      note: 'MASSIVE SIX over deep midwicket into the stands!',
    },
    // Ball 6: No Ball (+1 extra + 2 bat runs = 3 runs total, legal ball remains 4)
    {
      id: 'd-6',
      ballNumberInInnings: 6,
      legalBallNumber: 4,
      overNumber: 0,
      ballInOver: 4,
      batsmanId: 'p-a1',
      nonStrikerId: 'p-a2',
      bowlerId: bowlerBumrah,
      runsBat: 2,
      extras: 0,
      extraType: 'noBall' as const,
      isLegal: false,
      isWicket: false,
      timestamp: '18:04:15',
      note: 'Overstepped crease + 2 bat runs taken. Free hit signaled!',
    },
    // Ball 7: Free hit single, Shubman 1 run (swap strike)
    {
      id: 'd-7',
      ballNumberInInnings: 7,
      legalBallNumber: 5,
      overNumber: 0,
      ballInOver: 5,
      batsmanId: 'p-a1',
      nonStrikerId: 'p-a2',
      bowlerId: bowlerBumrah,
      runsBat: 1,
      extras: 0,
      extraType: 'none' as const,
      isLegal: true,
      isWicket: false,
      timestamp: '18:05:00',
      note: 'Free hit sliced to deep point for 1',
    },
    // Ball 8: WICKET! Hardik bowled!
    {
      id: 'd-8',
      ballNumberInInnings: 8,
      legalBallNumber: 6,
      overNumber: 0,
      ballInOver: 6,
      batsmanId: 'p-a2',
      nonStrikerId: 'p-a1',
      bowlerId: bowlerBumrah,
      runsBat: 0,
      extras: 0,
      extraType: 'none' as const,
      isLegal: true,
      isWicket: true,
      wicket: {
        dismissedPlayerId: 'p-a2',
        wicketType: 'bowled' as const,
        bowlerId: bowlerBumrah,
      },
      timestamp: '18:05:40',
      note: 'Clean bowled with a vicious in-swinging yorker!',
    },

    // Over 1: Bowled by Gerald Coetzee
    // New batsman: Sai Sudharsan ('p-a3') joins Shubman ('p-a1')
    // After end of over, Shubman is striker because odd run was taken on ball 7, and Hardik out on ball 8!
    // Ball 9: Shubman 2 runs
    {
      id: 'd-9',
      ballNumberInInnings: 9,
      legalBallNumber: 7,
      overNumber: 1,
      ballInOver: 1,
      batsmanId: 'p-a1',
      nonStrikerId: 'p-a3',
      bowlerId: bowlerCoetzee,
      runsBat: 2,
      extras: 0,
      extraType: 'none' as const,
      isLegal: true,
      isWicket: false,
      timestamp: '18:07:00',
      note: 'Pushed into the gap at deep midwicket for a brace',
    },
    // Ball 10: Shubman 0 runs (dot)
    {
      id: 'd-10',
      ballNumberInInnings: 10,
      legalBallNumber: 8,
      overNumber: 1,
      ballInOver: 2,
      batsmanId: 'p-a1',
      nonStrikerId: 'p-a3',
      bowlerId: bowlerCoetzee,
      runsBat: 0,
      extras: 0,
      extraType: 'none' as const,
      isLegal: true,
      isWicket: false,
      timestamp: '18:07:35',
      note: 'Defended solidly back to the bowler',
    },
    // Ball 11: Shubman 4 runs!
    {
      id: 'd-11',
      ballNumberInInnings: 11,
      legalBallNumber: 9,
      overNumber: 1,
      ballInOver: 3,
      batsmanId: 'p-a1',
      nonStrikerId: 'p-a3',
      bowlerId: bowlerCoetzee,
      runsBat: 4,
      extras: 0,
      extraType: 'none' as const,
      isLegal: true,
      isWicket: false,
      timestamp: '18:08:12',
      note: 'Pulled away with immense authority to deep square leg boundary!',
    },
  ];

  const auditLog = [
    {
      id: 'aud-1',
      timestamp: '18:00:00',
      action: 'match_started' as const,
      description: 'Match started: Ahmedabad Strikers vs Gujarat Warriors (10 Overs)',
    },
    {
      id: 'aud-2',
      timestamp: '18:01:10',
      action: 'ball_added' as const,
      description: 'Ball 0.1: 0 runs (Dot ball)',
    },
    {
      id: 'aud-3',
      timestamp: '18:02:20',
      action: 'ball_added' as const,
      description: 'Ball 0.3: FOUR runs by Shubman Gill',
    },
    {
      id: 'aud-4',
      timestamp: '18:02:55',
      action: 'ball_added' as const,
      description: 'Ball 0.3: Wide conceded (+1 run)',
    },
    {
      id: 'aud-5',
      timestamp: '18:03:30',
      action: 'ball_added' as const,
      description: 'Ball 0.4: SIX runs by Shubman Gill!',
    },
    {
      id: 'aud-6',
      timestamp: '18:04:15',
      action: 'ball_added' as const,
      description: 'Ball 0.4: NO BALL (+2 bat runs)',
    },
    {
      id: 'aud-7',
      timestamp: '18:05:40',
      action: 'ball_added' as const,
      description: 'Ball 1.0 (0.6): WICKET! Hardik Pandya bowled by Jasprit Bumrah',
    },
  ];

  return {
    id: matchId,
    name: 'Ahmedabad Premier Trophy - Night League',
    teamA: {
      id: 'team-a',
      name: 'Ahmedabad Strikers',
      shortName: 'AMS',
      players: teamAPlayers,
    },
    teamB: {
      id: 'team-b',
      name: 'Gujarat Warriors',
      shortName: 'GJW',
      players: teamBPlayers,
    },
    overs: 10,
    matchType: 'T10',
    tossWinnerTeamId: 'team-a',
    tossDecision: 'bat',
    currentInningsIndex: 0,
    status: 'live',
    innings: [
      {
        id: inningsId,
        inningsNumber: 1,
        battingTeamId: 'team-a',
        bowlingTeamId: 'team-b',
        deliveries,
        currentStrikerId: 'p-a1', // Shubman
        currentNonStrikerId: 'p-a3', // Sai Sudharsan
        currentBowlerId: bowlerCoetzee,
        isCompleted: false,
      },
    ],
    auditLog,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
