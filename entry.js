import Firebase from 'firebase';
console.log('i');

const baseRef = new Firebase('https://smartpolls.firebaseio.com/base/');

const newUser = (email, password) => {
  baseRef.createUser({
    email,
    password,
  }, (error, userData) => {
    if (error) {
      console.log(error);
    } else {
      login(email, password);
      console.log(userData.uid);
    }
  });
};

const login = (email, password) => {
  baseRef.authWithPassword({
    email,
    password,
  }, (error, authData) => {
    if (error) {
      console.log(error);
    } else {
      console.log(authData);
    }
  });
};

const newPoll = () => {
  const pollRef = baseRef.child('polls').push();

  pollRef.update({
    key: 'yo',
    jo: 'yo',
  });

  console.log('hi');
};

newUser('auscwork@gmail.com', 'dudeman1');
