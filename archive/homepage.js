import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

// import TextEditor from '../components/crud/Editor';
// import TextEditor from '../components/crud/EditorTinyMCE';

import { Editor } from '@tinymce/tinymce-react';

import ReactHtmlParser from 'react-render-html';

const Home = () => {

  useEffect(() => {
    const script = document.createElement('script');
    // script.src = "../tinymce/js/tinymce/tinymce.min.js";
    script.src = "../tinymce_custom/tinymce.min.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const [blogData, setblogData] = useState("");

  const handleBody = e => {
    setblogData(e.target.getContent());
    // console.log("Return value from Editor Component ----> ", typeof e, e);
    console.log("Return value from Editor Component ----> ", e.target.getContent());
  };


  return (
    <div>
      <div>
        {/* <TextEditor /> */}

        <Editor
          initialValue="<p>This is the initial content of the editor</p>"
          init={{
            // plugins: 'link image code',
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
          }}
          onChange={handleBody}
        />


      </div>

      <div>
        <h1>Parsed Data</h1>
        <hr />
        {ReactHtmlParser(blogData)}
      </div>
    </div>
  );
};
export default Home;