// TinyMCEclear


import React, { useState, useEffect, useRef } from 'react';

// Note: Import the editor dynamically only on Client Side
import { Editor } from '@tinymce/tinymce-react';


// --------------------------------------------------------------------

export default function MyEditor(props) {

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

  // Check props passed
  // console.log("Props to Editor--> ", props);

  const handleEditorChange = (e) => {
    console.log('Content was updated:', e.target.getContent());

    // Word Count
    // var wordcount = tinymce.activeEditor.plugins.wordcount;

    // console.log("Words --> ", wordcount.body.getWordCount());
    // console.log(wordcount.body.getCharacterCount());
    // console.log(wordcount.body.getCharacterCountWithoutSpaces());

  };
  // -------------------------------------------------------------------------------------
  // Refer: https://www.tiny.cloud/docs/configure/editor-appearance/#mobile

  return (

    <Editor
      apiKey="znu4o7dyg6f3h8xxvb6mpvok4jbytf2i38f16vyllqqetvsx"
      initialValue="<p>This is the initial content of the editor</p>"

      init={{

        init_instance_callback: function (editor) {
          console.log('Editor: ' + editor.id + ' is now initialized.');
        },

        // content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',



        menubar: true,

        placeholder: 'Type here...', // available in higher 5.0+ version

        // plugins: 'autoresize mediaembed',
        plugins: [' lists advlist link table advtable pageembed checklist permanentpen casechange advcode image imagetools code wordcount autosave autolink help',
          'searchreplace visualblocks fullscreen insertdatetime media   paste help',
          'charmap print preview anchor emoticons',
        ],

        toolbar: 'undo redo | bullist numlist link | bold italic styleselect | alignleft aligncenter alignright | lineheight fontsizeselect fontselect outdent indent emoticons | removeformat code casechange formatpainter',

        // toolbar_mode: 'floating', // Possible Values: 'floating', 'sliding', 'scrolling', or 'wrap'
        // toolbar_location: 'bottom', // Possible values: auto, top, bottom
        toolbar_sticky: true,

        // selector: 'textarea',
        // resize: false,  // 'both' - for both vertical and horizontal
        // width: 500,
        // max_width: 500,
        height: 700,
        // min_height: 600,
        // max_height: 800, // use it with autoresize

        branding: false,

        // inline: true,

        // statusbar: false,
        // skin: 'oxide',
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

  );
}
