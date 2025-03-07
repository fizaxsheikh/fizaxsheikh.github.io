import React from 'react';
import ThreeScene from '../components/ThreeScene';

const IndexPage = () => (
  <main style={{ textAlign: 'center', padding: '2rem' }}>
    <h1>You just couldn’t resist clicking, could you?</h1>
    <h2 className="big-heading">Welcome to Fiza's Personal Page :)</h2>
    <p style={{ maxWidth: '600px', margin: '0 auto' }}>
        Right now, I'm a work in progress, but soon, you'll be able to learn about all of Fiza's
        hobbies, interests, and everything that makes them tick outside of work!
    </p>
    <ThreeScene />
  </main>
);

export default IndexPage;
