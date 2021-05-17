# frontendHumbleBee

Frontend code for Blogging website (nextjs-mongodb)

// ----------------------------------------------------

Setup CKEDITOR Rich Text Editor

- First Install the CKEditor 5 WYSIWYG editor component for React and the editor build of your

  --> `npm install --save @ckeditor/ckeditor5-react @ckeditor/ckeditor5-build-classic`

Use the <CKEditor> component inside your project:

Refer: https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/react.html

For Online CKeditor custom build, refer: https://stackoverflow.com/questions/62243323/reactjs-import-ckeditor-5-from-online-build

npm add file:./ckeditor5 (ckeditor5 is the online downloaded)

add the dependices in config file - src/ckeditor.js and Plugin name

then build the project - npm run build

- npm install --save @ckeditor/ckeditor5-upload --dev
- npm install --save-dev @ckeditor/ckeditor5-clipboard
- npm install --save-dev @ckeditor/ckeditor5-alignment

Refer:https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/installing-plugins.html#adding-a-plugin-to-a-build

---

Alignment
AlignmentEditing
AlignmentUI
AutoImage
AutoLink
AutoMediaEmbed
Autoformat
Autosave
BalloonToolbar
Base64UploadAdapter
BlockQuote
BlockQuoteEditing
BlockQuoteUI
BlockToolbar
Bold
BoldEditing
BoldUI
CKFinder
CKFinderEditing
CKFinderUI
CKFinderUploadAdapter
Clipboard
ClipboardPipeline
CloudServicesUploadAdapter
Code
CodeBlock
CodeBlockEditing
CodeBlockUI
CodeEditing
CodeUI
ColorUI
CommentsOnly
ContextualBalloon
Delete
DragDrop
EasyImage
EditorAnnotations
Enter
Essentials
ExportPdf
ExportWord
FileRepository
Font
FontBackgroundColor
FontBackgroundColorEditing
FontBackgroundColorUI
FontColor
FontColorEditing
FontColorUI
FontFamily
FontFamilyEditing
FontFamilyUI
FontSize
FontSizeEditing
FontSizeUI
Heading
HeadingButtonsUI
HeadingEditing
HeadingUI
Highlight
HighlightEditing
HighlightUI
HorizontalLine
HorizontalLineEditing
HorizontalLineUI
HtmlEmbed
HtmlEmbedEditing
HtmlEmbedUI
Image
ImageCaption
ImageCaptionEditing
ImageEditing
ImageInsert
ImageInsertUI
ImageResize
ImageResizeButtons
ImageResizeEditing
ImageResizeHandles
ImageStyle
ImageStyleEditing
ImageStyleUI
ImageTextAlternative
ImageTextAlternativeEditing
ImageTextAlternativeUI
ImageToolbar
ImageUpload
ImageUploadEditing
ImageUploadProgress
ImageUploadUI
Indent
IndentBlock
IndentEditing
IndentUI
InlineAnnotations
Input
Italic
ItalicEditing
ItalicUI
Link
LinkEditing
LinkImage
LinkImageEditing
LinkImageUI
LinkUI
List
ListEditing
ListStyle
ListStyleEditing
ListStyleUI
ListUI
Markdown
MediaEmbed
MediaEmbedEditing
MediaEmbedToolbar
MediaEmbedUI
Mention
MentionEditing
MentionUI
PageBreak
PageBreakEditing
PageBreakUI
Pagination
Paragraph
ParagraphButtonUI
PasteFromOffice
PastePlainText
RealTimeCollaborativeComments
RealTimeCollaborativeEditing
RealTimeCollaborativeTrackChanges
RemoveFormat
RemoveFormatEditing
RemoveFormatUI
RestrictedEditingMode
RestrictedEditingModeEditing
RestrictedEditingModeUI
SelectAll
SelectAllEditing
SelectAllUI
ShiftEnter
SimpleUploadAdapter
SpecialCharacters
SpecialCharactersArrows
SpecialCharactersCurrency
SpecialCharactersEssentials
SpecialCharactersLatin
SpecialCharactersMathematical
SpecialCharactersText
StandardEditingMode
StandardEditingModeEditing
StandardEditingModeUI
Strikethrough
StrikethroughEditing
StrikethroughUI
Subscript
SubscriptEditing
SubscriptUI
Superscript
SuperscriptEditing
SuperscriptUI
Table
TableCellProperties
TableCellPropertiesEditing
TableCellPropertiesUI
TableClipboard
TableEditing
TableKeyboard
TableMouse
TableProperties
TablePropertiesEditing
TablePropertiesUI
TableSelection
TableToolbar
TableUI
TableUtils
TextPartLanguage
TextPartLanguageEditing
TextPartLanguageUI
TextTransformation
Title
TodoList
TodoListEditing
TodoListUI
TrackChanges
TrackChangesData
TrackChangesEditing
Typing
Underline
UnderlineEditing
UnderlineUI
Undo
UndoEditing
UndoUI
Widget
WidgetResize
WidgetTypeAround
WordCount

---

import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Code from '@ckeditor/ckeditor5-basic-styles/src/code';
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';

import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';

export default class ClassicEditor extends ClassicEditorBase {}

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
Essentials,
UploadAdapter,
Autoformat,
Bold,
Italic,
BlockQuote,
CKFinder,
EasyImage,
Heading,
Image,
ImageCaption,
ImageStyle,
ImageToolbar,
ImageUpload,
Link,
List,
MediaEmbed,
Paragraph,
PasteFromOffice,
Table,
TableToolbar,
Alignment, Underline, Strikethrough, Code, Subscript, Superscript
];

// Editor configuration.
ClassicEditor.defaultConfig = {
toolbar: {
items: [
'heading',
'|',
'bold',
'italic','Underline', 'Strikethrough', 'Code', 'Subscript', 'Superscript',
'alignment',
'link',
'bulletedList',
'numberedList',
'imageUpload',
'blockQuote',
'insertTable',
'mediaEmbed',
'undo',
'redo'
]
},

image: {
toolbar: [
'imageStyle:full',
'imageStyle:side',
'|',
'imageTextAlternative'
]
},

table: {
contentToolbar: [
'tableColumn',
'tableRow',
'mergeTableCells'
]
},
// This value must be kept in sync with the language defined in webpack.config.js.
language: 'en'
};

---
<!-- ------------------------------------------------------------------------------------ -->

# Pre-Render app for SEO 

Refer: https://snipcart.com/blog/react-seo-nextjs-tutorial

To prerender your app, update your next.config.js to the following and run the npm run export command.

const withSass = require('@zeit/next-sass')
module.exports = withSass({
  exportPathMap: function () {
    return {
      '/': { page: '/' },
    }
  }
});
This creates a new directory named out at the root of your project which contains all your static pages.


// ------------------------------------------------------------------------------------------
