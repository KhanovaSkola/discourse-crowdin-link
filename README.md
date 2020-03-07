# Auto-localize Crowdin links

This is a [Discourse theme component](https://meta.discourse.org/t/structure-of-themes-and-theme-components/60848) that is used in Khan Academy i18n forum at https://international-forum.khanacademy.org/

The component auto-localizes Crowdin links such "https://crowdin.com/translate/khanacademy/26335/enus-XX#6550144" into a link targeting a user-specific language. For example, a Czech translator will see "https://crowdin.com/translate/khanacademy/26335/enus-cs#6550144".

The user language is taken from their profile. Specifically, we're using a custom user field "Language" defined at [here](https://international-forum.khanacademy.org/admin/customize/user_fields) and we require each new user to fill it during registration.

## For DEVS

If a new language is added to Khan Academy, its crowdin code needs to be added into
`javascripts/discourse-crowdin-link/lib/languages.js.es6`

As of 7th March 2020, the list should contain all languages found at https://crowdin.com/project/khanacademy, even those that are not yet officially started and do not have their Translation Dashboard.
