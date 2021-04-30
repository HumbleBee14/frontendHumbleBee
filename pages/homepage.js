import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('../components/crud/Editor'), { ssr: false });

const Home = () => {
  return (
    <Editor value="" onChange={(v) => console.log("Check----<>", v)} />
  );
};
export default Home;