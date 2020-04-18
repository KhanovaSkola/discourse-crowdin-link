import { withPluginApi } from "discourse/lib/plugin-api";
import { modifyNode } from '../lib/utilities';
import { langToCrowdinCode } from '../lib/languages';

export default {
  name: 'crowdin-links-initializer',
  initialize(){
    withPluginApi("0.8.7", api => {

      let getCrowdinLangCode = function(lang) {
        if (!lang || !lang instanceof String) {
          return null;
        }
        lang = lang.toLowerCase();
        for (let langKey in langToCrowdinCode) {
          if (lang.search(langKey) !== -1) {
            return langToCrowdinCode[langKey];
          }
        }
        return null;
      };

      // roughly guided by https://stackoverflow.com/questions/8949445/javascript-bookmarklet-to-replace-text-with-a-link
      let skipTags = {
        'iframe': 1,
      };
  
      settings.excluded_tags.split('|').forEach(tag => {
        tag = tag.trim().toLowerCase();
        if (tag !== '') {
          skipTags[tag] = 1;
        }
      });
      
      let createLocalizedLink = function(matchedUrl, localizedUrl) {
        let link = document.createElement('a');
        link.innerHTML = localizedUrl;
        link.href = localizedUrl;
        link.rel = 'nofollow';
        link.target = '_blank';
        link.className = 'crowdin-link no-track-link';
        return link;
      };

      let Action = function(inputListName, method) {
        this.inputListName = inputListName;
        this.createNode = method;
        this.inputs = {};
      };
  
      let activateComponent = function(crowdinCode) {
        //NOTE(danielhollas): This regex is wrapped in word boundary chars later
        const crowdinUrlRegex = '/(http[s]?:\/\/[^/]+\/translate\/khanacademy\/[^/]+)\/enus-XX(.*)/i';
        const localizedCrowdinUrl = '$1/enus-' + crowdinCode + '$2';

        const localizeCrowdinLinks = new Action('dummy_string', createLocalizedLink);
        localizeCrowdinLinks.inputs[crowdinUrlRegex] = localizedCrowdinUrl;
        const actions = [localizeCrowdinLinks];
        
        api.decorateCooked($elem => {
          actions.forEach(a => {
            if (Object.keys(a.inputs).length > 0) {
              modifyNode($elem[0], a, skipTags)
            }
          });
        }, {'id': "autolocalize-crowdin-links"});

        // Apply autolinkify to posts that were cooked
        // before we registered this callback
        $(".cooked").each(function(){
          modifyNode(this, localizeCrowdinLinks, skipTags)
        });
      };

      const currentUser = api.getCurrentUser();
      if (currentUser) {
        api.container.lookup('store:main').find('user', currentUser.username).then((user) => {
          if (!user.user_fields) {
            return;
          }
          // This const is specific for https://international-forum.khanacademy.org/
          const LANGUAGE_USER_FIELD_ID = 1;
          const userLang = user.user_fields[LANGUAGE_USER_FIELD_ID];
          const crowdinCode = getCrowdinLangCode(userLang);
          if (crowdinCode) {
            activateComponent(crowdinCode);
          }
        });
      }
    });
  }
}
