// Bookmarklet for Caroline Charrow to replace Crowdin links
// with 'enus-XX' when aditing a post in Discourse forum
//
// These strings are then localized per user by this theme component
javascript: (function() {
  var crowdinUrlRegex = /(http[s]?:\/\/[^/]+\/translate\/khanacademy\/[^/]+)\/enus-[^#]+(#.*)/g;
  var editor = document.getElementsByClassName("d-editor-input")[0];
  var replaced = editor.value.replace(crowdinUrlRegex, '$1/enus-XX$2');
  editor.value = replaced;
})();
