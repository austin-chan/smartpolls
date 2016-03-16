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
        - {pollKey}: true
  - polls
    - {poll id}
      - poll_key: The phrase key of the poll (string)
      - uid: The user id of the owner of the poll (string)
      - vote_count: The number of votes the entire poll has received (number)
      - voter_count: The number of voters who have voted (number)
      - locked: Whether or not the active poll is locked (bool)
      - active_question: The id of the active question (string)
      - questions
        - {question id}: true
  - question
    - {question id}
      - poll_id: The id of the poll the question belongs to (string)
      - uid: The user id of the owner of the poll (string)
      - vote_count: The number of votes the poll has received (number)
      - voter_count: The number of voters who have voted (number)
      - a_count: The number of votes for A (number)
      - d_count: The number of votes for B (number)
      - c_count: The number of votes for C (number)
      - d_count: The number of votes for D (number)
      - e_count: The number of votes for E (number)
  - votes
    - {voter id}
      - {poll id}
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
  - awaitingPayload: Whether waiting for poll data to arrive (bool)
  - awaitingNameChange: Whether waiting for poll to change name (bool)
  - polls
    - {poll key}: true
    - {poll key}
      - {question key}
        - vote_count: The number of votes the poll has received (number)
        - voter_count: The number of voters who have voted (number)
        - a_count: The number of votes for A (number)
        - d_count: The number of votes for B (number)
        - c_count: The number of votes for C (number)
        - d_count: The number of votes for D (number)
        - e_count: The number of votes for E (number)
- vote
  - voterId: Id for the current voter (string)
  - awaitingResponse: Whether checking for poll key existence (bool)
  - errorPollKey: Poll key that was found to not exist (string)
```