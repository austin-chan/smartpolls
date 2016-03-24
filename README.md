# [Smartpolls](http://smartpolls.co/)

[Initial Design Case Study](./design/study/CASESTUDY.md)

[First Design Spec](./design/study/FIRSTSPEC.md)

To run on your machine, cd to the project directory:

`npm install`

`npm run dev`

and then in another tab

`npm run start`

Firebase data structure documentation


```
- base
  - users
    - {user id}
      - name (string): The display name of the user
      - polls
        - {poll id}: true
  - polls
    - {poll id}
      - pollKey: The phrase key of the poll (string)
      - uid: The user id of the owner of the poll (string)
      - voteCount: The number of votes the entire poll has received (number)
      - voterCount: The number of voters who have voted (number)
      - questions
        - {question id}: true
  - question
    - {question id}
      - pollId: The id of the poll the question belongs to (string)
      - uid: The user id of the owner of the poll (string)
      - voteCount: The number of votes the poll has received (number)
      - voterCount: The number of voters who have voted (number)
      - locked: Whether or not the active poll is locked (bool)
      - aCount: The number of votes for A (number)
      - dCount: The number of votes for B (number)
      - cCount: The number of votes for C (number)
      - dCount: The number of votes for D (number)
      - eCount: The number of votes for E (number)
  - votes
    - {voter id}
      - {question id}: The option selected (A, B, C, D, E)
```

Redux data structure documentation
```
- routing: ...data related to react-router-redux
- user
  - isUser: If the user is logged in or not (bool)
  - showSignup: Whether the modal is for signup or login (bool)
  - showModal: Whether or not to display the modal (bool)
  - error: The type of error to display for login or signup (string)
  - uid: The id of the logged in user (bool|null)
  - awaitingAuthResponse: Whether in the process of querying the auth (bool)
- poll
  - awaitingInitialLoad: Whether the whole poll object needs to be loaded
  - polls
    - {poll id}
      - awaitingNameChange: Whether waiting for poll to change name (bool)
      - isPollLoaded: Whether the initial poll information has been loaded (bool)
      - isQuestionLoaded: Whether the initial question information has been loaded (bool)
      - voteCount: The number of votes the entire poll has received (number)
      - voterCount: The number of voters who have voted (number)
      - questionRefs
        - {question id}: true
      - questions
        - {question id}
          - voteCount: The number of votes the poll has received (number)
          - voterCount: The number of voters who have voted (number)
          - locked: Whether or not the active poll is locked (bool)
          - aCount: The number of votes for A (number)
          - dCount: The number of votes for B (number)
          - cCount: The number of votes for C (number)
          - dCount: The number of votes for D (number)
          - eCount: The number of votes for E (number)
- vote
  - voterId: Id for the current voter (string)
  - awaitingResponse: Whether checking for poll key existence (bool)
  - errorPollKey: Poll key that was found to not exist (string)
  - notFound: Poll key requested in URL is not found
  - questions
    - {question id}
      - voteCount: The number of votes the poll has received (number)
      - voterCount: The number of voters who have voted (number)
      - locked: Whether or not the active poll is locked (bool)
      - aCount: The number of votes for A (number)
      - dCount: The number of votes for B (number)
      - cCount: The number of votes for C (number)
      - dCount: The number of votes for D (number)
      - eCount: The number of votes for E (number)
    }
  - votes
    - {poll id}
      - {question id}: The option selected (A, B, C, D, E)
```