import Firebase from 'firebase';
import namer from './namer';

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
  const key = namer();

  pollRef.update({
    key
  });

  console.log('hi');
};

login('auscwork@gmail.com', 'testing');
// newUser('auscwork@gmail.com', 'dudeman1');
