import React from 'react';
import 'rbx/index.css';
import { Button } from 'rbx';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import { timeParts, hasConflict, getCourseNumber, getCourseTerm } from './times';

const firebaseConfig = {
    apiKey: "AIzaSyCsjAJXqoQMIwaB3PhModhZumX5QiKiUnc",
    authDomain: "quick-19927.firebaseapp.com",
    databaseURL: "https://quick-19927.firebaseio.com",
    projectId: "quick-19927",
    storageBucket: "quick-19927.appspot.com",
    messagingSenderId: "1029706821355",
    appId: "1:1029706821355:web:ab060bf1bc4cd8cb0c98ae"
  };

firebase.initializeApp(firebaseConfig);

const db = firebase.database().ref();

const buttonColor = selected => (
  selected ? 'success' : null
);

const moveCourse = course => {
  const meets = prompt('Enter new meeting data, in this format:', course.meets);
  if (!meets) return;
  const {days} = timeParts(meets);
  if (days) saveCourse(course, meets); 
  else moveCourse(course);
};

const saveCourse = (course, meets) => {
  db.child('courses').child(course.id).update({meets})
    .catch(error => alert(error));
};

const Course = ({ course, state, user }) => (
  <Button color={ buttonColor(state.selected.includes(course)) }
    onClick={ () => state.toggle(course) }
    onDoubleClick={ user ? () => moveCourse(course) : null }
    disabled={ hasConflict(course, state.selected) }
    >
    { getCourseTerm(course) } CS { getCourseNumber(course) }: { course.title }
  </Button>
);

export { Course, buttonColor , db };