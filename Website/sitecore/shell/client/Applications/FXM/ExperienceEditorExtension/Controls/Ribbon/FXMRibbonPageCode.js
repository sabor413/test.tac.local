﻿define(
  [
    "sitecore",
    "/-/speak/v1/ExperienceEditor/RibbonPageCode.js",
    // access the client beacon
    "/-/speak/v1/FXM/ExperienceEditorExtension/Utils/ClientBeacon.js",
    "/-/speak/v1/FXM/ExperienceEditorExtension/Legacy/LegacyjQuery.js",
    // legacy wrappers for FXM editing
    "/-/speak/v1/FXM/ExperienceEditorExtension/Legacy/ChromeControls.js",
    "/-/speak/v1/FXM/ExperienceEditorExtension/Legacy/ClientActionInserter.js",
    "/-/speak/v1/FXM/ExperienceEditorExtension/Legacy/ReplacerInserter.js",
    "/-/speak/v1/ExperienceEditor/TranslationUtil.js",
    "/-/speak/v1/FXM/ExperienceEditorExtension/Legacy/Chrome.js",
    "/-/speak/v1/FXM/ExperienceEditorExtension/Legacy/SelectorChromeType.js",
    "/-/speak/v1/FXM/ExperienceEditorExtension/Legacy/ClientActionChromeType.js",
    "/-/speak/v1/FXM/ExperienceEditorExtension/Legacy/PlaceholderChromeType.js",
    "/-/speak/v1/FXM/ExperienceEditorExtension/Legacy/RenderingChromeType.js",
    "/-/speak/v1/FXM/ExperienceEditorExtension/Legacy/ChromeManager.js",
    "/-/speak/v1/FXM/ExperienceEditorExtension/Legacy/scSitecore.js",
    "/-/speak/v1/ExperienceEditor/Commands/ChangeLanguage.js" // change language command must be loaded
  ],
    function (Sitecore, RibbonPageCode, _clientBeacon, $sc, _chromeControls, _clientActionInserter, _replacerInserter, TranslationUtil) {
      var FxmPageCode = RibbonPageCode.extend({
        initialize: function () {
          //Initialize of parent extend type
          RibbonPageCode.prototype.initialize.call(this, arguments);
        },
        initialized: function () {

          //Initialized of parent extend type
          RibbonPageCode.prototype.initialized.call(this, arguments);

          _chromeControls.initialize(this.TranslationDictionary);
          _clientActionInserter.initialize(this.TranslationDictionary);
          _replacerInserter.initialize(this.TranslationDictionary);

          var self = this;
          var pipelineContext = this.clone(this.currentContext);

          _clientBeacon = _clientBeacon || {};
          _clientBeacon.bindReady = _clientBeacon.bindReady || function() {}

          this.InitializeFxmPipeline.on("pipelineready", function (pipeline) {
            _clientBeacon.bindReady(function () {
              pipeline.execute({ app: self, currentContext: pipelineContext });
            });
          });

          _clientBeacon.bindReady(function () {
            var language = _clientBeacon.language();
            if (language && language.Name != self.currentContext.language) {
              var languageName = $sc('#scLanguageName').val();
              var message = Sitecore.Helpers.string.format(
                  TranslationUtil.translateTextByServer("This page is in {0}. You are currently creating items in {1}."),
                  language.Title,
                  languageName);

              self.NotificationBar.addMessage("warning", {
                text: message,
                closable: false,
                actions: [{
                  text: Sitecore.Helpers.string.format(TranslationUtil.translateTextByServer("Change language to '{0}'"), language.Title),
                  action: "javascript:return scForm.postEvent(this,event,'webedit:setlanguage(language=" + language.Name + ")');"
                }]
              });
            }
          });

          var beacon = window.top.SCBeacon;
          if (!beacon) {
            _sc.ExperienceEditor.Context.instance.NotificationBar.addMessage("error", {
              text: TranslationUtil.translateTextByServer("Unable to locate JavaScript beacon on external website"),
              closable: false,
            });
          }
        }
      });

      return FxmPageCode;
    });