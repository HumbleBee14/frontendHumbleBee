// CKEditor

// Refer: https://elliottbrand.com/blog/2/Creating-a-Custom-Build-for-CKEditor-5

import React, { useState, useEffect, useRef } from 'react';


// -----------------------------------------------------------------------

export default function MyEditor(props) {

  // const [text, setText] = useState("");

  const editorRef = useRef();

  const [editorLoaded, setEditorLoaded] = useState(false);
  // const { CKEditor, ClassicEditor } = editorRef.current || {};
  const { CKEditor, Editor } = editorRef.current || {};

  const [wordsCount, setWordsCount] = useState();
  const [charactersCount, setCharactersCount] = useState();


  // To Make Sure to import and Run (& import modules) this Rich Text Editor only on the page render - client side, we are using useEffect
  useEffect(() => {
    editorRef.current = {

      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
      Editor: require('ckeditor5-custom-build'),
      // ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),

    };
    setEditorLoaded(true);

    // console.log(Editor.builtinPlugins.map(plugin => plugin.pluginName));
  }, []);

  // Check props passed
  // console.log("Props to Editor--> ", props);

  // Destroying the editor
  // In modern applications, it is common to create and remove elements from the page interactively through JavaScript. In such cases CKEditor instances should be destroyed by using the destroy() method:

  // editor.destroy()
  //   .catch( error => {
  //       console.log( error );
  //   } );

  // -------------------------------------------------------------------------------------

  return editorLoaded ? (

    // <div>

    <CKEditor
      editor={Editor}
      // editor={ClassicEditor}
      // data='<p>Hello from CKEditor 5!</p>'
      data={props.text}
      // data={(text) ? text : ""}
      // data=""



      config={{
        placeholder: "Let's write something amazing today ...",
        // editorConfiguration,

        // plugins: [Paragraph, Bold, Italic, Essentials, Base64UploadAdapter,Clipboard],


        removePlugins: ['Title',],



        // ------------------------------------------------------------------------------------
        // lineHeight: { // specify your otions in the lineHeight config object. Default values are [ 0, 0.5, 1, 1.5, 2 ]
        //   options: [0.5, 1, 1.5, 2, 2.5]
        // },
        // ------------------------------------------------------------------------------------
        // Font Size 
        fontSize: {
          // options: [
          //   'tiny',
          //   'small',
          //   'big',
          //   'huge',
          //   'default',
          // ],

          options: [
            'default',
            9,
            11,
            12,
            14,
            16,
            17,
            18,
            19,
            21,
          ],
          // to allow all font sizes // Warning: This option can be used only in combination with numerical values !!
          supportAllValues: true
        },

        // -------------------------------------------------------------------------------------
        // CKEDITOR Font Family support 
        // Use the special 'default' keyword to use the default font family defined in the web page styles. It removes any custom font family.
        // For example, the following editor supports only two font families besides the default one:

        // fontFamily: {
        //   options: [
        //     'default',
        //      'Ubuntu, Arial, sans-serif',
        //      'Ubuntu Mono, Courier New, Courier, monospace'
        //   ],
        //      supportAllValues: true
        // },

        // You can enable support for all font names by using the config.fontFamily.supportAllValues option.

        // -------------------------------------------------------------------------------------


        // title: {
        //   placeholder: 'My custom placeholder for the title'
        // },


        // --------------------------------------------------------------------
        // --------------------------------------------------------------------
        // Tag users / mention people

        // Requires - plugins: [ Mention, ],

        // It defines the list of names that will be autocompleted after the user types the “@” character.
        // You can also define minimumCharacters after which the autocomplete panel will show up.

        // mention: {
        //   feeds: [
        //     {
        //       marker: '@',
        //       feed: ['@Barney', '@Lily', '@Marshall', '@Robin', '@Ted'],
        //       minimumCharacters: 1
        //     }
        //   ]
        // },

        // Refer: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html

        // --------------------------------------------------------------------
        // Font color / colour

        // by default, we already have more colours available. We can disable it unless we need specific colours

        // fontColor: {
        //   colors: [
        //     {
        //       color: 'hsl(0, 0%, 0%)',
        //       label: 'Black'
        //     },
        //     {
        //       color: 'hsl(0, 0%, 30%)',
        //       label: 'Dim grey'
        //     },
        //     {
        //       color: 'hsl(0, 0%, 60%)',
        //       label: 'Grey'
        //     },
        //     {
        //       color: 'hsl(0, 0%, 90%)',
        //       label: 'Light grey'
        //     },
        //     {
        //       color: 'hsl(0, 0%, 100%)',
        //       label: 'White',
        //       hasBorder: true
        //     },

        //     // ... Add as you wish !!
        //   ],
        //   columns: 3, // so, you can display them in 3 columns.
        // },

        // -----------------------------------------------------------------------
        // Font Background colour / color

        // fontBackgroundColor: {
        //   columns: 6,
        //   colors: [
        //     {
        //       color: 'hsl(0, 75%, 60%)',
        //       label: 'Red'
        //     },
        //     {
        //       color: 'hsl(30, 75%, 60%)',
        //       label: 'Orange'
        //     },
        //     {
        //       color: 'hsl(60, 75%, 60%)',
        //       label: 'Yellow'
        //     },
        //     {
        //       color: 'hsl(90, 75%, 60%)',
        //       label: 'Light green'
        //     },
        //     {
        //       color: 'hsl(120, 75%, 60%)',
        //       label: 'Green'
        //     },

        //     // ... Add as you want !
        //   ],
        // },

        // -----------------------------------------------------------------------------------------

        // ---------------- Image Configuration for toolbar -------------------

        // Refer: https://ckeditor.com/docs/ckeditor5/latest/features/image.html

        image: {

          upload: {
            types: ['jpeg', 'png', 'gif', 'bmp', 'webp', 'tiff', 'svg']
          },


          // Configure the available styles.
          styles: [
            'alignLeft', 'alignCenter', 'alignRight', 'full', 'side'
          ],
          // Configure the available image resize options.
          resizeOptions: [
            {
              name: 'resizeImage:original',
              label: 'Original',
              value: null
            },
            {
              name: 'resizeImage:25',
              label: '25%',
              value: '25'
            },
            {
              name: 'resizeImage:50',
              label: '50%',
              value: '50'
            },
            {
              name: 'resizeImage:75',
              label: '75%',
              value: '75'
            }
          ],
          // You need to configure the image toolbar, too, so it shows the new style
          // buttons as well as the resize buttons.
          toolbar: [
            'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight',
            '|',
            'resizeImage',
            '|',
            'imageTextAlternative',
            'linkImage'
          ]
        },
        // ------------------------------------------------------------------------
        heading: {
          options: [
            {
              model: 'paragraph',
              title: 'Paragraph',
              class: 'ck-heading_paragraph',
            },
            {
              model: 'heading1',
              view: {
                name: 'h1',
                classes: 'MuiTypography-root MuiTypography-h1',
              },
              title: 'Heading 1',
              // It needs to be converted before the standard 'heading2'.
              converterPriority: 'high',
            },
            {
              model: 'heading2',
              view: {
                name: 'h2',
                classes: 'MuiTypography-root MuiTypography-h2',
              },
              title: 'Heading 2',
              // It needs to be converted before the standard 'heading2'.
              converterPriority: 'high',
            },
            {
              model: 'heading3',
              view: {
                name: 'h3',
                classes: 'MuiTypography-root MuiTypography-h3',
              },
              title: 'Heading 3',
              // It needs to be converted before the standard 'heading2'.
              converterPriority: 'high',
            },
            {
              model: 'heading4',
              view: {
                name: 'h4',
                classes: 'MuiTypography-root MuiTypography-h4',
              },
              title: 'Heading 4',
              // It needs to be converted before the standard 'heading2'.
              converterPriority: 'high',
            },
          ],
        },
        // -------------------------------------------------------------------------------
        table: {
          contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells',
            'tableCellProperties',
            'tableProperties',
          ]
        },
        // -------------------------------------------------------------------------------
        // Refer: https://github.com/ckeditor/ckeditor5/blob/master/packages/ckeditor5-media-embed/src/mediaembedediting.js

        mediaEmbed: {
          toolbar: ['bold']
        },

        /*
        mediaEmbed: {
          extraProviders: [
            {
              name: 'extraProvider',
              url: /^example\.com\/media\/(\w+)/,
              html: match => `The HTML representing the media with ID=${match[1]}`
            },
 
            // You can allow any sort of media in the editor using the "allow–all" RegExp. 
            {
              name: 'allow-all',
              url: /^.+/,
 
              // To implement responsive media, you can use the following HTML structure:
 
              html: match =>
                '<div style="position:relative; padding-bottom:100%; height:0">' +
                '<iframe src="..." frameborder="0" ' +
                'style="position:absolute; width:100%; height:100%; top:0; left:0">' +
                '</iframe>' +
                '</div>'
 
            },
 
          ],
 
          // removeProviders: ['instagram', 'twitter', 'googleMaps', 'flickr', 'facebook'],
        },
 
        */

        // -------------------------------------------------------------------------------
        /*
         TextTransformation  (some default ones)
        From 	To
        (tm) 	™
        (c)   © 
        1/2 	½
        -> 	  →
        --  	–
        Customizations. (AutoComplete)
        */



        // typing: {
        //   transformations: {
        //     include: [
        //       // Use only the 'quotes' and 'typography' groups.
        //       'quotes',
        //       'typography',

        //       // Plus some custom transformation.
        //       { from: 'CKE', to: 'CKEditor' }
        //     ],

        //     remove: [
        //       // Do not use the transformations from the
        //       // 'symbols' and 'quotes' groups.
        //       'symbols',
        //       'quotes',

        //       // As well as the following transformations.
        //       'arrowLeft',
        //       'arrowRight'
        //     ],

        //     extra: [
        //       // Add some custom transformations – e.g. for emojis.
        //       { from: ':)', to: '🙂' },
        //       { from: ':+1:', to: '👍' },
        //       { from: ':tada:', to: '🎉' },

        //       // You can also define patterns using regular expressions.
        //       // Note: The pattern must end with `$` and all its fragments must be wrapped
        //       // with capturing groups.
        //       // The following rule replaces ` "foo"` with ` «foo»`.
        //       /*
        //                     {
        //                       from: /(^|\s)(")([^"]*)(")$/,
        //                       to: [null, '«', null, '»']
        //                     },
        //       */

        //       // Finally, you can define `to` as a callback.
        //       // This (naive) rule will auto-capitalize the first word after a period.
        //       {
        //         from: /(\. )([a-z])$/,
        //         to: matches => [null, matches[1].toUpperCase()]
        //       }
        //     ],

        //   }
        // },


        // -------------------------------------------------------------------------------
        // Add custom Programming language to support using Codeblocks
        /*
                codeBlock: {
                  languages: [
                    { language: 'css', label: 'CSS' },
                    { language: 'html', label: 'HTML' },
        
        
                    // Do not render the CSS class for the plain text code blocks.
                    { language: 'plaintext', label: 'Plain text', class: '' },
        
                    // Use the "php-code" class for PHP code blocks.
                    { language: 'php', label: 'PHP', class: 'php-code' },
        
                    // Use the "js" class for JavaScript code blocks.
                    // Note that only the first ("js") class will determine the language of the block when loading data.
                    { language: 'javascript', label: 'JavaScript', class: 'js javascript js-code' },
        
                    // Python code blocks will have the default "language-python" CSS class.
                    { language: 'python', label: 'Python' },
        
                    // ------------------------------------------------
                    // DEFAULT VALUE
        
                    { language: 'plaintext', label: 'Plain text' }, // The default language.
                    { language: 'c', label: 'C' },
                    { language: 'cs', label: 'C#' },
                    { language: 'cpp', label: 'C++' },
                    { language: 'css', label: 'CSS' },
                    { language: 'diff', label: 'Diff' },
                    { language: 'html', label: 'HTML' },
                    { language: 'java', label: 'Java' },
                    { language: 'javascript', label: 'JavaScript' },
                    { language: 'php', label: 'PHP' },
                    { language: 'python', label: 'Python' },
                    { language: 'ruby', label: 'Ruby' },
                    { language: 'typescript', label: 'TypeScript' },
                    { language: 'xml', label: 'XML' },
                    // ------------------------------------------------
                    // Note: The first language defined in the configuration is considered the default one.
                  ]
                },
        */

        // -------------------------------------------------------------------------------
        // -------------------------------------------------------------------------------


        // Sanitize hmtlEmbed to prevent Malicious script. (You can disable it, if sure about which kind of script you are putting inside)
        //Refer: https://ckeditor.com/docs/ckeditor5/latest/features/html-embed.html

        htmlEmbed: {
          showPreviews: true,
          sanitizeHtml: (inputHtml) => {
            // Strip unsafe elements and attributes, e.g.:
            // the `<script>` elements and `on*` attributes.
            const outputHtml = sanitize(inputHtml);

            return {
              html: outputHtml,
              // true or false depending on whether the sanitizer stripped anything.
              hasChanged: true
            };
          }
        },

        // -------------------------------------------------------------------------------
        // indentBlock: {
        // 	offset: 1,
        // 	unit: 'em',
        // },
        link: {
          // Automatically add target="_blank" and rel="noopener noreferrer" to all external links.
          addTargetToExternalLinks: true,
        },
        // ------------------------------------------------------------------------
        // Count number of characters and words
        wordCount: {
          // container
          displayWords: true,
          displayCharacters: true,
          onUpdate: stats => {

            // Prints the current content statistics.

            setWordsCount(stats.words);
            setCharactersCount(stats.characters);
            // console.log(`Characters: ${stats.characters}\nWords: ${stats.words}`);
          }
        },

        // ------------------------------------------------------------------------
        // Side Block Toobar 

        // blockToolbar: {
        //   items: [
        //     'paragraph', 'heading1', 'heading2', 'heading3',
        //     '|',
        //     'bulletedList', 'numberedList',
        //     '|',
        //     'blockQuote', 'uploadImage'
        //   ],
        //   shouldNotGroupWhenFull: true
        // },

        // ------------------------------------------------------------------------

        // Refer: https://ckeditor.com/docs/ckeditor5/latest/features/toolbar/toolbar.html#extended-toolbar-configuration-format

        // --------------------------------------------------------------
        // ========================================================================================

        toolbar: {

          items: [
            'heading',
            'fontSize',
            'fontBackgroundColor',
            'fontColor',
            'fontFamily',
            'highlight',
            '|',
            'bold',
            'italic',
            'underline',
            'strikethrough',
            '|',
            'link',
            'bulletedList',
            'numberedList',
            'todoList',
            '|',
            'blockQuote',
            'alignment',
            'outdent',
            'indent',
            '|',
            'imageUpload',
            'imageInsert',
            'mediaEmbed',
            'insertTable',
            '|',
            'code',
            'codeBlock',
            'htmlEmbed',
            'MathType',
            // 'ChemType',
            'specialCharacters',
            '|',
            'subscript',
            'superscript',
            'horizontalLine',
            'pageBreak',
            'selectAll',
            '|',
            'undo',
            'redo',
            'removeFormat',
            // 'lineHeight', // not available
            // '-',// Explicit break point
            // '|', 'clipboard',
            // 'tableCellProperties', 'tableProperties', 'imageInsert',
          ],

          // -----------------------------------------------------------

          // viewportTopOffset: 30,
          shouldNotGroupWhenFull: true,
          licenseKey: ''
        },

        // ==================================================================================
      }

      }

      onReady={editor => {
        // You can store the "editor" and use when it is needed.


        // console.log('Editor is Now ready to use!', editor);
        console.log('Editor is Now ready to use!');

        // To check list of all available toolbar items:
        // console.log(Array.from(editor.ui.componentFactory.names()));

        // Insert the toolbar before the editable area.
        editor.ui.view.editable.element.parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.view.editable.element,
          // editor.ui.getEditableElement()
        );


        // to change Editable area Editor Height 
        // editor size resize height
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
        // console.log(event);

        // Word Count test --------------------------------


        // --------------------------------------------------
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



    //   <div className="ck ck-word-count" style={{ border: "1px solid" }}>
    //     <div className="ck-word-count__words pl-2">Words: <b>{wordsCount}</b></div>
    //     <div className="ck-word-count__characters pl-2">Characters: <b>{charactersCount}</b></div>
    //   </div>


    // </div>
  ) : (
    <div><h2>Editor Loading . . .</h2></div>
  );
}


{/* 
Note that CKEditor uses the window object of the browser and
therefore cannot be rendered on the server (on the server side of NextJS).
So make sure that the 'WYSIWYGCKEditor' is imported (dynamically)
and used only in the browser of your NextJS application.
    */}