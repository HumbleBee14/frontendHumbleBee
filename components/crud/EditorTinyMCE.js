// TinyMCE Rich Text Editor


import React, { useState, useRef } from 'react';

import { Editor } from '@tinymce/tinymce-react';


// -----------------------------------------------------------------------

export default function MyEditor(props) {

  // const editorRef = useRef(null);
  // const log = () => {
  //   if (editorRef.current) {
  //     console.log(editorRef.current.getContent());
  //   }
  // };


  // Check props passed
  // console.log("Props to Editor--> ", props);

  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.src = "https://cloud.tinymce.com/stable/tinymce.min.js";
  //   script.async = true;
  //   document.body.appendChild(script);
  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  // const [text, setText] = useState("");

  const handleEditorChange = (e) => {

    // console.log('Content was updated:', e.target.getContent());

    // Return back the Data entered in the Editor to callback function (to save data in localstorage and state variable to Send data to backend DB)

    const data = e.target.getContent(); // Text Box Area data

    // Passing back the Editor Data to handle it (Save and update in state and send to backend)
    props.onChangeProp(data); // Returning Editor Body data to callback function 


    // // -------------- Word Count API ----------------------
    // var wordcount = tinymce.activeEditor.plugins.wordcount;

    // console.log("Words --> ", wordcount.body.getWordCount());
    // console.log(wordcount.body.getCharacterCount());
    // console.log(wordcount.body.getCharacterCountWithoutSpaces());
  };

  // Refer:  // Refer: https://www.tiny.cloud/docs/configure/editor-appearance/#mobile

  //-----------------------------------------------------------------------------

  return (
    // <>

    <Editor
      apiKey="znu4o7dyg6f3h8xxvb6mpvok4jbytf2i38f16vyllqqetvsx"

      // onInit={(evt, editor) => editorRef.current = editor}

      // initialValue="<p>This is the initial content of the editor</p>"
      // initialValue={props.text}

      init={{

        init_instance_callback: function (editor) {
          tinymce.activeEditor.setContent(props.text); // to load locally saved data 
          console.log('Editor: ' + editor.id + ' is now initialized.');
        },
        // content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',

        menubar: true,

        placeholder: 'Type here...', // available in higher 5.0+ version

        // plugins: 'autoresize mediaembed help pageembed permanentpen checklist casechange',
        // toolbar: 'formatselect formatpainter',
        plugins: [' lists advlist link table advtable pageembed advcode image imagetools code wordcount blockquote autosave autolink codesample',
          'searchreplace visualblocks fullscreen insertdatetime media   paste fullpage hr pagebreak',
          'charmap print preview anchor emoticons casechange',
        ],

        toolbar: 'bold italic underline backcolor forecolor blockquote | bullist numlist superscript subscript link image | styleselect | alignleft aligncenter alignright | outdent indent lineheight casechange | fontsizeselect | fontselect | codesample emoticons removeformat code fullpage | hr pagebreak | undo redo',

        // For different custom Styled Blokquotes or other content, refer: https://www.tiny.cloud/blog/blockquote-css-and-styling-in-tinymce/

        codesample_global_prismjs: true,

        codesample_languages: [
          { text: 'HTML/XML', value: 'markup' },
          { text: 'JavaScript', value: 'javascript' },
          { text: 'CSS', value: 'css' },
          { text: 'Python', value: 'python' },
          { text: 'Java', value: 'java' },
          { text: 'C', value: 'c' },
          { text: 'C++', value: 'cpp' }
        ],

        // Note: Prism.js and prism.css need to be added to a page for syntax highlighting to work (as created by the Code Sample plugin)
        /*
        <link rel="stylesheet" type="text/css" href="prism.css">
        <script src="prism.js"></script>
        <pre class="language-markup"><code>...</code></pre>
 */

        end_container_on_empty_block: true,

        toolbar_mode: 'wrap',
        // toolbar_mode: 'floating', // Possible Values: 'floating', 'sliding', 'scrolling', or 'wrap'
        // toolbar_location: 'bottom', // Possible values: auto, top, bottom
        toolbar_sticky: true,

        // selector: 'textarea',
        // resize: false,  // 'both' - for both vertical and horizontal
        // width: 500,
        // max_width: 500,
        height: 700,
        // height: 'calc(100vh - 2rem)',
        // min_height: 600,
        // max_height: 800, // use it with autoresize

        branding: false,

        // inline: true,

        // statusbar: false,
        // skin: 'oxide',
        skin: "oxide-dark",
        // skin: (window.matchMedia("(prefers-color-scheme: dark)").matches ? "oxide-dark" : ""),

        // content_css: (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : ""),
        // theme: 'silver',

        // contextmenu: 'link image table',
        // draggable_modal: true,
        // contextmenu_never_use_native: true,

        // font_formats: 'Arial=arial,helvetica,sans-serif; Courier New=courier new,courier,monospace; AkrutiKndPadmini=Akpdmi-n',
        // fontsize_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt',
        // lineheight_formats: '1 1.1 1.2 1.3 1.4 1.5 2',
        // block_formats: 'Paragraph=p; Header 1=h1; Header 2=h2; Header 3=h3',



        // ---------------------------------------------------------------
        image_caption: true,

        image_uploadtab: true,

        // images_file_types: 'svg,jpeg,jpg,jpe,jfi,jif,jfif,png,gif,bmp,webp', 
        // Note: SVGs (Scalable Vector Graphics) are not supported in TinyMCE to protect our users and their end-users. SVGs can be used to perform both client-side and server-side attacks.

        // image_description: false,

        /* enable title field in the Image dialog*/
        image_title: true,
        /* enable automatic uploads of images represented by blob or data URIs*/
        automatic_uploads: true,

        paste_data_images: true,

        /*
    URL of our upload handler (for more details check: https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_url)
    images_upload_url: 'postAcceptor.php',
    here we add custom filepicker only to Image dialog
  */
        file_picker_types: 'image',
        /* and here's our custom image picker*/
        file_picker_callback: function (cb, value, meta) {
          var input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');

          /*
            Note: In modern browsers input[type="file"] is functional without
            even adding it to the DOM, but that might not be the case in some older
            or quirky browsers like IE, so you might want to add it to the DOM
            just in case, and visually hide it. And do not forget do remove it
            once you do not need it anymore.
          */

          input.onchange = function () {
            var file = this.files[0];

            var reader = new FileReader();
            reader.onload = function () {
              /*
                Note: Now we need to register the blob in TinyMCEs image blob
                registry. In the next release this part hopefully won't be
                necessary, as we are looking to handle it internally.
              */
              var id = 'blobid' + (new Date()).getTime();
              var blobCache = tinymce.activeEditor.editorUpload.blobCache;
              var base64 = reader.result.split(',')[1];
              var blobInfo = blobCache.create(id, file, base64);
              blobCache.add(blobInfo);

              /* call the callback and populate the Title field with the file name */
              cb(blobInfo.blobUri(), { title: file.name });
            };
            reader.readAsDataURL(file);
          };

          input.click();
        },

        images_upload_handler: function (blobInfo, success, failure) {
          success("data:" + blobInfo.blob().type + ";base64," + blobInfo.base64());
        },

        imagetools_toolbar: "rotateleft rotateright | flipv fliph | editimage imageoptions",

        // ---------------------------------------------------------------
        file_browser_callback_types: 'file image media',

        file_picker_types: 'file image media',



        // ---------------------------------------------------------------
        // Text colours 
        /*
                textcolor_map: [
                  "000000", "Black",
                  "993300", "Burnt orange",
                  "333300", "Dark olive",
                  "003300", "Dark green",
                  "003366", "Dark azure",
                  "000080", "Navy Blue",
                  "333399", "Indigo",
                  "333333", "Very dark gray",
                  "800000", "Maroon",
                  "FF6600", "Orange",
                  "808000", "Olive",
                  "008000", "Green",
                  "008080", "Teal",
                  "0000FF", "Blue",
                  "666699", "Grayish blue",
                  "808080", "Gray",
                  "FF0000", "Red",
                  "FF9900", "Amber",
                  "99CC00", "Yellow green",
                  "339966", "Sea green",
                  "33CCCC", "Turquoise",
                  "3366FF", "Royal blue",
                  "800080", "Purple",
                  "999999", "Medium gray",
                  "FF00FF", "Magenta",
                  "FFCC00", "Gold",
                  "FFFF00", "Yellow",
                  "00FF00", "Lime",
                  "00FFFF", "Aqua",
                  "00CCFF", "Sky blue",
                  "993366", "Red violet",
                  "FFFFFF", "White",
                  "FF99CC", "Pink",
                  "FFCC99", "Peach",
                  "FFFF99", "Light yellow",
                  "CCFFCC", "Pale green",
                  "CCFFFF", "Pale cyan",
                  "99CCFF", "Light sky blue",
                  "CC99FF", "Plum"
                ],
        */
        // ---------------------------------------------------------------
        // ---------------------------------------------------------------
        // ---------------------------------------------------------------
        // menu: {
        //   file: { title: 'File', items: 'newdocument restoredraft | preview | print ' },
        //   edit: { title: 'Edit', items: 'undo redo | cut copy paste | selectall | searchreplace' },
        //   view: { title: 'View', items: 'code | visualaid visualchars visualblocks | spellchecker | preview fullscreen' },
        //   insert: { title: 'Insert', items: 'image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime' },
        //   format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align lineheight | forecolor backcolor | removeformat' },
        //   tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | code wordcount' },
        //   table: { title: 'Table', items: 'inserttable | cell row column | tableprops deletetable' },
        //   help: { title: 'Help', items: 'help' }
        // },

        // content_security_policy: "default-src 'self'",

        // external_plugins: {
        //   'testing': 'http://www.testing.com/plugin.min.js',
        //   'maths': 'http://www.maths.com/plugin.min.js'
        // },

      }}

      onChange={handleEditorChange}
    />

    //   <button onClick={log}>Log editor content</button>
    // </>

  );
};

