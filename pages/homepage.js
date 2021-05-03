import dynamic from 'next/dynamic';

import TextEditor from '../components/crud/Editor';;

const Home = () => {

  const handleBody = bdata => {
    console.log("Return value from Editor Component---->", typeof bdata, bdata);
  };


  return (
    <TextEditor text="Hello Buddy" onChangeProp={handleBody} />
  );
};
export default Home;