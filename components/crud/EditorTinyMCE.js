// TinyMCE Rich Text Editor


import React, { useState, useEffect, useRef } from 'react';

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

  const [editorLoaded, setEditorLoaded] = useState(false); // to show Loading


  // to delay loading the Editor component (so that all state variables are updated meanwhile)
  useEffect(() => {

    setTimeout(function () {

      setEditorLoaded(true);

    }, 2500); // 2 second delay

  }, []);

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

  return editorLoaded ? (
    // <>

    <Editor
      apiKey="o4f1j2u0gdq6a8copn22ik801gm9j9sanxngz40t3ftiytwk"

      // onInit={(evt, editor) => editorRef.current = editor}

      // initialValue="<p>This is the initial content of the editor</p>"
      // initialValue={props.text}

      init={{
                
        init_instance_callback: function (editor) {
          let content = props.text;
      
          // If `props.text` is an array, join it to a string
          if (Array.isArray(content)) {
              content = content.join(" ");  // Convert array to space-separated string
          }
      
          // Ensure it's a string before setting content
          if (typeof content === "string") {
              tinymce.activeEditor.setContent(content);
          } else {
              console.error("TinyMCE: Expected string but got", typeof content, content);
          }
      
          // console.log('Editor initialized with:', content);
        },
        // content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',

        menubar: true,


        placeholder: 'Type here...', // available in higher 5.0+ version

        // plugins: 'codeformat autoresize mediaembed help pageembed permanentpen checklist casechange autosave',
        // toolbar: 'formatselect formatpainter',
        plugins: ['checklist lists advlist link table advtable pageembed advcode image imagetools wordcount autolink codesample',
          'searchreplace visualblocks fullscreen insertdatetime media mediaembed paste hr pagebreak template nonbreaking toc textpattern',
          'charmap print preview anchor emoticons casechange',
        ],

        toolbar: 'code bold italic underline | backcolor forecolor | fontsizeselect | blockquote link | alignleft aligncenter alignright alignnone | outdent indent | bullist numlist checklist |superscript subscript lineheight | codesample | image media | formatselect | fontselect | styleselect | casechange emoticons removeformat fullpage | hr pagebreak | undo redo ',

        // End container block element when pressing enter inside an empty block

        br_in_pre: false,

        custom_undo_redo_levels: 15,



        // toolbar_mode: 'floating',
        toolbar_mode: 'wrap',
        // toolbar_mode: 'floating', // Possible Values: 'floating', 'sliding', 'scrolling', or 'wrap'
        // toolbar_location: 'bottom', // Possible values: auto, top, bottom
        toolbar_sticky: true,

        // selector: 'textarea',
        // resize: false,  // 'both' - for both vertical and horizontal
        // width: 500,
        // max_width: 500,
        height: 600,
        // height: 'calc(100vh - 2rem)',
        // min_height: 600,
        // max_height: 800, // use it with autoresize

        branding: false,

        // inline: true,

        // statusbar: false,
        skin: 'oxide',
        // skin: "oxide-dark",
        // skin: (window.matchMedia("(prefers-color-scheme: dark)").matches ? "oxide-dark" : ""),

        // content_css: (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : ""),
        // theme: 'silver',

        // contextmenu: 'link image table',
        // draggable_modal: true,
        // contextmenu_never_use_native: true,

        // font_formats: 'Arial=arial,helvetica,sans-serif; Courier New=courier new,courier,monospace; AkrutiKndPadmini=Akpdmi-n',
        fontsize_formats: '8pt 10pt 12pt 14pt 16pt 18pt 20pt 22pt 24pt 36pt 48pt',
        // lineheight_formats: '1 1.1 1.2 1.3 1.4 1.5 2',
        // block_formats: 'Paragraph=p; Header 1=h1; Header 2=h2; Header 3=h3',

        end_container_on_empty_block: true,


        // Add list of custom classes you want to add to image img tags
        image_class_list: [
          { title: 'Bootstrap Responsive image', value: 'img-fluid' },
          { title: 'No Class', value: '' },
          { title: 'Bootstrap Image thumbnails', value: 'img-thumbnail' },
        ],

        // Advanced Image Options, using style Formats, which is more powerful

        // style_formats: [
        //   {
        //     title: 'Image Left', selector: 'img', styles: {
        //       'float': 'left',
        //       'margin': '0 10px 0 10px'
        //     }
        //   },
        //   {
        //     title: 'Image Right', selector: 'img', styles: {
        //       'float': 'right',
        //       'margin': '0 10px 0 10px'
        //     }
        //   },
        //   {
        //     title: 'Responsive Image', selector: 'img', styles: {
        //       'max-width': '100%',
        //       'height': 'auto',
        //       'padding': '2px',
        //       'margin': '0 5px 0 5px'
        //     }
        //   },
        //   {
        //     title: 'Blockquote Red Style', selector: 'blockquote', styles: {
        //       "overflow": "hidden",
        //       "padding-right": "1.5em",
        //       "padding-left": "1.5em",
        //       "margin-left": "0",
        //       "margin-right": "0",
        //       "font-style": "italic",
        //       "border-left": "solid 5px hsl(0, 84%, 52%)",
        //     }
        //   },
        // ],


        // OR 

        // Register the cite format
        formats: {
          // Changes the default format for blockquote to have a custom class of 'tinymceBlockQuote'
          blockquote: { block: 'blockquote', classes: 'customClassAdded' },
          cite: { block: 'cite' }
        },

        


        // HTML5 formats
        style_formats: [
          { title: 'Paragraph', block: 'p' },
          { title: 'Title', format: 'h1' },
          { title: 'Heading', format: 'h2' },
          { title: 'Subheading', format: 'h3' },
          { title: 'div', block: 'div' },
          { title: 'blockquote', block: 'blockquote', wrapper: true },
          { title: 'Cite', format: 'cite' },
          { title: 'pre', block: 'pre' },
          { title: 'section', block: 'section', wrapper: true, merge_siblings: false },
          { title: 'article', block: 'article', wrapper: true, merge_siblings: false },
          {
            title: 'aside', block: 'aside', wrapper: true, styles: {
              "width": "30%",
              "padding-left": "15px",
              "margin-left": "15px",
              "float": "right",
              "font-style": "italic",
              "background-color": "lightgray"
            }
          },
          { title: 'figure', block: 'figure', wrapper: true }
        ],


        menu: {
          format: {
            title: 'Format',
            items: 'checklist | bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align lineheight | forecolor backcolor | removeformat'
          }
        },


        // ----------------------------------------------------

        image_list: [
          { title: 'Placeholder Image 150', value: '/static/images/defaultImagePlaceholder.png' },
          { title: 'Placeholder Image 300', value: '/static/images/defaultImagePlaceholder.png' }
        ],




        // Text Patterns ------------------------------
        textpattern_patterns: [
          { start: '*', end: '*', format: 'italic' },
          { start: '**', end: '**', format: 'bold' },
          { start: '#', format: 'h1' },
          { start: '##', format: 'h2' },
          { start: '###', format: 'h3' },
          { start: '####', format: 'h4' },
          { start: '#####', format: 'h5' },
          { start: '######', format: 'h6' },
          { start: '1. ', cmd: 'InsertOrderedList' },
          { start: '* ', cmd: 'InsertUnorderedList' },
          { start: '- ', cmd: 'InsertUnorderedList' },
          { start: '//brb', replacement: 'Be Right Back' }
        ],



        // Table of Content  ---------------
        toc_depth: 3, // table of contents
        toc_header: "div", // case doesn't matter
        toc_class: "mce-toc",
        // Table of Content  ---------------


        // For different custom Styled Blokquotes or other content, refer: https://www.tiny.cloud/blog/blockquote-css-and-styling-in-tinymce/

        // codesample_global_prismjs: true,

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
        // file_browser_callback_types: 'file image media', // Deprecated

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

  ) : (
    <div><h2><span className="spinner-grow spinner-grow-lg"></span> <strong> Editor Loading...</strong></h2></div>
  );
};

