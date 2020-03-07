# Auto-localize Crowdin links

This is a [Discourse theme component](https://meta.discourse.org/t/structure-of-themes-and-theme-components/60848) that is used in Khan Academy i18n forum at https://international-forum.khanacademy.org/

The component auto-localizes Crowdin links such "https://crowdin.com/translate/khanacademy/26335/enus-XX#6550144" into a link targeting a user-specific language. For example, a Czech translator will see "https://crowdin.com/translate/khanacademy/26335/enus-cs#6550144".

The user language is taken from their profile (and is specified at user registration so it should always be there.

## For DEVS

If a new language is added to Khan Academy, its crowdin code must be added into
`javascripts/discourse-crowdin-link/lib/languages.js.es6`
