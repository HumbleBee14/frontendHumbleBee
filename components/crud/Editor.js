import React, { useState, useEffect, useRef } from 'react';



// -----------------------------------------------------------------------

export default function MyEditor(props) {

  // const [text, setText] = useState("");

  const editorRef = useRef();

  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, InlineEditor } = editorRef.current || {};


  // To Make Sure to import and Run (& import modules) this Rich Text Editor only on the page render - client side, we are using useEffect
  useEffect(() => {
    editorRef.current = {

      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
      // ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
      InlineEditor: require('@ckeditor/ckeditor5-build-inline')
    };
    setEditorLoaded(true);
  }, []);

  // Check props passed
  console.log("Props to Editor--> ", props);


  // --------------------------------------------

  return editorLoaded ? (

    <CKEditor
      editor={InlineEditor}
      // data='<p>Hello from CKEditor 5!</p>'
      data={props.text}
      // data={(text) ? text : ""}
      // data=""

      config={{ placeholder: "Let's Write something amazing today ..." }}

      onReady={editor => {
        // You can store the "editor" and use when it is needed.
        console.log('Editor is Now ready to use!', editor);

        // Insert the toolbar before the editable area.
        editor.ui.view.editable.element.parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.view.editable.element,
        );

        // to change Editable area Editor Height
        editor.editing.view.change(writer => {
          writer.setStyle(
            "height",
            "500px",
            editor.editing.view.document.getRoot()
          );
        });
      }}

      onChange={(event, editor) => {
        const data = editor.getData(); // Text Box Area data

        // console.log({ event, editor, data });
        console.log(event);

        // Passing back the Editor Data to handle it (Save and update in state and send to backend)
        props.onChangeProp(data); // Returning Editor Body data to callback function 

        // setText(data);
      }}

    // onBlur={(event, editor) => {
    //   console.log('Blur.', editor);
    // }}
    // onFocus={(event, editor) => {
    //   console.log('Focus.', editor);
    // }}

    />
  ) : (
    <div> <h2>Editor Loading . . .</h2></div>
  );
}


{/* 
Note that CKEditor uses the window object of the browser and
therefore cannot be rendered on the server (on the server side of NextJS).
So make sure that the 'WYSIWYGCKEditor' is imported (dynamically)
and used only in the browser of your NextJS application.
    */}