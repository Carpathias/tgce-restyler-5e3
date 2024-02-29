//*_______________________   (Script Header: tgce-restyler) _______________________________________________________/
/** 
 *  The Greatest Campaign Ever!
 *  tgce-restyler.js
 *  @author     Carpathias
 *  @email      carpathias@thegreatestcampaignever.com
 *  @discord    Carpathias
 *  @github     Carpathias
 *  @contibutors
 *      DyingNoob
 *      Zhell
 *      Ichabod
 *      mxzf
 *      unsoluable
 *      ChaosOS
 *      esheyw
 */



//*_______________________   (Class Definitions) _______________________________________________________/



class TgceRestyler5e3 {
    static ID = 'tgce-restyler-5e3';    
    static FLAGS = {
      TGCE: 'tgce'
    };    
    static TEMPLATES = {
      TGCERESTYLER5E3: `modules/${this.ID}/templates/tgce-restyler-5e3.hbs`
    };
    static SETTINGS = {
        HEADER_ROTATE           : 'header-hue-rotate',
        HEADER_BG_COLOR         : 'header-bg-color',
        HEADER_NAME_COLOR       : 'header-name-color',
        HEADER_TEXT_COLOR       : 'header-text-color',
        HEADER_IMAGE            : 'header-image',
        HEADER_IMAGE_NULL       : 'header-image-null',
        CARD_HEADERS_COLOR_L    : 'sheet-card-headers-l',
        CARD_HEADERS_COLOR_R    : 'sheet-card-headers-r',
        CARD_HEADERS_TXT        : 'sheet-card-headers-txt',
        CHAT_PILL_HILITE        : 'chat-pill-hilite',
        NAV_RELOC_TOGGLE        : 'nav-reloc-toggle',
        RELOC_ALWAYS            : 'reloc-always',
        SKILLS_TOGGLE           : 'skill-toggle',
        ENABLE_IMAGE_REPLACE    : 'image-replace'
      }
    static initialize() {
        
        //? Enable Nav Reloaction 
        game.settings.register(this.ID, this.SETTINGS.NAV_RELOC_TOGGLE, {
            name    : "Enable Navigation Tab Relocation",
            default : true,
            type    : Boolean,
            scope   : 'client',
            config  : true,
            hint    : "This setting when enabled will add an additonal tab to the character sheet when in EDIT mode. Clicking this tab will \
                relocate the sheet navigation tabs from the right side of the sheet to the header. Clicking the button again will move the \
                navigation tabs back to default position. Note: If the sheet is already in EDIT mode when this option is enabled, you will \
                need to toggle EDIT mode again to render the new tab.",
        });
        game.settings.register(this.ID, this.SETTINGS.RELOC_ALWAYS, {
            name    : "Force Navigation Tab Relocation",
            default : true,
            type    : Boolean,
            scope   : 'client',
            config  : true,
            hint    : "This setting when enabled will always relocate the navigation tabs to the header. Navigation Tab Relocation must be \
                enabled above.",
        });    
        //? Sheet Header Settings
        game.settings.register(this.ID, this.SETTINGS.ENABLE_IMAGE_REPLACE, {
            name    : "Enable Image Replacement",
            default : false,
            type    : Boolean,
            scope   : 'client',
            config  : true,
            hint    : "This setting must be enabled to allow for header image replacement below.",
        });                        
        game.settings.register(this.ID, this.SETTINGS.HEADER_IMAGE, {
            name        : "Character Sheet Header Image",
            default     : "assets/sheet-banner-goliath.jpg",
            type        : String,
            scope       : 'client',
            config      : true,
            filePicker  : "image",
            hint        : "This settings allows for the replacement of the default image in the character sheet header. Default DnD5e System \
                Image image is used if nothing is specified. Setting will accept custom URL, ie.. https://mysite/mypath/myimage.jpg",
        });
        game.settings.register(this.ID, this.SETTINGS.HEADER_IMAGE_NULL, {
            name    : "Remove Character Sheet Header Image",
            default : false,
            type    : Boolean,
            scope   : 'client',
            config  : true,
            hint    : "This setting when enabled will remove the image from the character sheet header, even if a custom image is chosen above. \
            Image Replacement does not need enabled, but could be.",
        });
        game.settings.register(this.ID, this.SETTINGS.HEADER_BG_COLOR, {
            name    : "Character Sheet Header Color",
            default : '#741b2b',
            type    : String,
            scope   : 'client',
            config  : true,
            hint    : "This setting allows for choice of Character Sheet header color. It sits behind the image so will not show if an image is \
                present, unless the image has transparent areas.",
        });       
        game.settings.register(this.ID, this.SETTINGS.HEADER_NAME_COLOR, {
            name    : "Character Name Text Color",
            default : "#ffffff",
            type    : String,
            scope   : 'client',
            config  : true,
            hint    : "This setting allows for chosing the text color of the character's name.",
        });
        game.settings.register(this.ID, this.SETTINGS.HEADER_TEXT_COLOR, {
            name    : "Character Sheet Header Text Color",
            default : "#9f9275",
            type    : String,
            scope   : 'client',
            config  : true,
            hint    : "This setting allows for chsoing the text color of other header elements.",
        });
        game.settings.register(this.ID, this.SETTINGS.HEADER_ROTATE, {
            name    : "Character Sheet Header Color Hue-Rotation",
            default : 0,
            type    : Number,
            range: {
                min: 0,
                max: 360,
                step: 1
              },
            scope   : 'client',
            config  : true,
            hint    : "Choose a value between 0 and 360 from the 'hue-rotate' color wheel ('google it' for reference). Blank is default, same as 0. \
                This will have an effect on all of the elements above. Will be set to 0 (no change) if no image is specified, so as not to alter the \
                chosen background color.",
        });        
        //? Sheet Card Header Settings       
        game.settings.register(this.ID, this.SETTINGS.CARD_HEADERS_COLOR_L, {
            name    : "Sheet Card Header Color - Left",
            default : "#401f25",
            type    : String,
            scope   : 'client',
            config  : true,            
        });
        game.settings.register(this.ID, this.SETTINGS.CARD_HEADERS_COLOR_R, {
            name    : "Sheet Card Header Color - Right",
            default : "#741b2b",
            type    : String,
            scope   : 'client',
            config  : true,
            hint    : "The two settings above allow for choice of color for the headers of the sections on the varios sheet tabs, \
                ie.. On the Inventory page of the sheet for Weapons, Items, Consumables etc. The mod by default sets these both to \
                white so that they look good with any possible main header color choice. If two different colors are chosen the \
                system code will blend them left to right.",
        });
        game.settings.register(this.ID, this.SETTINGS.CARD_HEADERS_TXT, {
            name    : "Sheet Card Header Text Color",
            default : "#ffffff",
            type    : String,
            scope   : 'client',
            config  : true,
            hint    : "This settings allows for choice of text color in the character sheet section headers.",
        });
        //? Sheet Functionality Settings
        game.settings.register(this.ID, this.SETTINGS.SKILLS_TOGGLE, {
            name    : "Enable Skill/Tool toggle",
            default : true,
            type    : Boolean,
            scope   : 'client',
            config  : true,
            hint    : "This setting when enabled will inject a button that will allow Skill/Tool toggle, reducing the overall height requirement of the character sheet.",
        });
        //? Chat Card Settings
        game.settings.register(this.ID, this.SETTINGS.CHAT_PILL_HILITE, {
            name    : "Colorize Chat Pills",
            default : true,
            type    : Boolean,
            scope   : 'client',
            config  : true,
            hint    : "This setting when enabled will color the Equipped/Proficient chat pills green/red on chat cards containing them.",
        });       
    }
}

//*_______________________   (Module Hooks)    _________________________________________________________/ 

//* Module Class Initialization Hook
Hooks.once('init', () => {
    TgceRestyler5e3.initialize();    
}); 

//* Welcome to TGCE notification message
Hooks.on("ready", () => {
    console.log("Welcome to [TGCE] The Greatest Campaign Ever!");    
});

//* Character Sheet Modification Hook
Hooks.on("renderActorSheet5eCharacter2", () => {    
    //* ---------------- Get all settings
    const currentSettingValues = {};
    for (const setting of Object.values(TgceRestyler5e3.SETTINGS)) {
        currentSettingValues[setting] = game.settings.get(TgceRestyler5e3.ID,setting)
    }
    
    //* ---------------- Character Sheet Main Page Updates 
    
    //? Injects the new header image value if header-image-null setting is false, otherwise clears the header image from the character sheet. 
    if(!currentSettingValues['header-image-null']){
        if (currentSettingValues['image-replace']) {
            const imagePath = currentSettingValues['header-image'] || game.settings.settings.get(`${TgceRestyler5e3.ID}.header-image`)?.default;
            //? The below is required to modify the image path to be useable in the CSS 
            if (imagePath.includes("http:")) {var constructedImagePath = "url(\""+imagePath+"\")"
                } else if (imagePath.includes("https://")) {var constructedImagePath = "url(\""+imagePath+"\")"
                    } else {var constructedImagePath = "url(\"../../../"+imagePath+"\")"
            }; 
            document.documentElement.style.setProperty('--tgce-restyler5e3-charsheetheader-image', constructedImagePath);        
        };
    } else {
        document.documentElement.style.setProperty('--tgce-restyler5e3-charsheetheader-image', "null");
    };

    //? Format Hue-Rotation value to be usable in the CSS
    const hueRotateValue = (currentSettingValues['header-hue-rotate'] || game.settings.settings.get(`${TgceRestyler5e3.ID}.header-hue-rotate`)?.default)+"deg";
    
    //* ---------------- Other Character Sheet Updates
    document.documentElement.style.setProperty('--tgce-restyler5e3-charsheetheader-name-color', (currentSettingValues['header-name-color'] || game.settings.settings.get(`${TgceRestyler5e3.ID}.header-name-color`)?.default));
    document.documentElement.style.setProperty('--tgce-restyler5e3-charsheetheader-bg-color', (currentSettingValues['header-bg-color'] || game.settings.settings.get(`${TgceRestyler5e3.ID}.header-bg-color`)?.default));
    document.documentElement.style.setProperty('--tgce-restyler5e3-charsheetheader-text-color', (currentSettingValues['header-text-color'] || game.settings.settings.get(`${TgceRestyler5e3.ID}.header-text-color`)?.default));
    if (currentSettingValues['header-image-null']) {
        document.documentElement.style.setProperty('--tgce-restyler5e3-hue-rotate-degrees', "0deg");
    } else {
        document.documentElement.style.setProperty('--tgce-restyler5e3-hue-rotate-degrees', hueRotateValue);
    }
    document.documentElement.style.setProperty('--tgce-restyler5e3-sectionheader-color-left', (currentSettingValues['sheet-card-headers-l'] || game.settings.settings.get(`${TgceRestyler5e3.ID}.sheet-card-headers-l`)?.default));
    document.documentElement.style.setProperty('--tgce-restyler5e3-sectionheader-color-right', (currentSettingValues['sheet-card-headers-r'] || game.settings.settings.get(`${TgceRestyler5e3.ID}.sheet-card-headers-r`)?.default));
    document.documentElement.style.setProperty('--tgce-restyler5e3-sectionheader-text-color', (currentSettingValues['sheet-card-headers-txt'] || game.settings.settings.get(`${TgceRestyler5e3.ID}.sheet-card-headers-txt`)?.default));
});

Hooks.on("renderChatMessage", (chatMessage, html, data) => {    
    if (game.settings.get(TgceRestyler5e3.ID, TgceRestyler5e3.SETTINGS.CHAT_PILL_HILITE)) {
        const ulElements = html.find('ul.card-footer.pills');
        ulElements.each(function () {
            const liElements = $(this).find('li.pill.pill-sm');
            liElements.each(function () {
                const span = $(this).find('span.label');
                if (span.length > 0) {
                    switch (span.text().trim()) {
                        case "Equipped":
                            $(this).addClass('green');
                            break;
                        case "Not Equipped":
                            $(this).addClass('maroon');
                            break;
                        case "Proficient":
                            $(this).addClass('green');
                            break;
                        case "Not Proficient":
                            $(this).addClass('maroon');
                            break;
                        //! Add more cases as needed
                    }
                }
            });
        });
    };
});

Hooks.on("renderActorSheet5eCharacter2", function(sheet, [html]) {
    if (sheet._mode == sheet.constructor.MODES.PLAY) return; //! Requires EDIT mode
    
    if (!game.settings.get(TgceRestyler5e3.ID, TgceRestyler5e3.SETTINGS.NAV_RELOC_TOGGLE)) {
        const myTgceStyleSheet = Array.from(document.styleSheets).find((e) => (e)?.href?.includes("tgce-restyler-5e3"));
        const rulesForActor = Array.from(myTgceStyleSheet.cssRules).filter((e) => (e).selectorText.includes(`${sheet.object._id}`));
        if(!rulesForActor.length == 0){
            Array.from(rulesForActor).forEach((e) => {
                const currentSelectorText = (e)?.selectorText
                myTgceStyleSheet.deleteRule(Array.from(myTgceStyleSheet.cssRules).findIndex((e) => (e)?.selectorText === currentSelectorText));                    
            });
        };
        return;             
    };
    
    if (game.settings.get(TgceRestyler5e3.ID, TgceRestyler5e3.SETTINGS.RELOC_ALWAYS)) return; 

    if (game.settings.get(TgceRestyler5e3.ID, TgceRestyler5e3.SETTINGS.NAV_RELOC_TOGGLE)) { //? If relocation is enabled continue....                
        const myDiv = document.createElement("DIV") //? Configure and add the click listener if relocation is enabled but not default. 
            myDiv.innerHTML = `<a id="${sheet.object._id}" class="item control" data-group="primary" data-tooltip= "Relocate Nav" aria-label="Relocate Nav"><i class="fa-solid fa-right-left"></i></a>`;        
            myDiv.firstElementChild.addEventListener("click", () => {
                const myTgceStyleSheet = Array.from(document.styleSheets).find((e) => (e)?.href?.includes("tgce-restyler-5e3"));
                const rulesForActor = Array.from(myTgceStyleSheet.cssRules).filter((e) => (e).selectorText.includes(`${sheet.object._id}`));
                if(!rulesForActor.length == 0){
                    Array.from(rulesForActor).forEach((e) => {
                        const currentSelectorText = (e)?.selectorText
                        myTgceStyleSheet.deleteRule(Array.from(myTgceStyleSheet.cssRules).findIndex((e) => (e)?.selectorText === currentSelectorText));                    
                    });                
                } else {                
                    Array.from(styleLibrary, (e) => `#ActorSheet5eCharacter2-Actor-${sheet.object._id}${e}`).forEach(function(rule) {
                        myTgceStyleSheet.insertRule(rule, myTgceStyleSheet.cssRules.length)
                    });
                };
            });        
        sheet._element[0].children[0].appendChild(myDiv.firstElementChild);  //? Add the new nav relocate tab      
    };
});


Hooks.on("renderActorSheet5eCharacter2", function(sheet, [html]) {
    if (sheet._mode !== sheet.constructor.MODES.PLAY) return; //!Requires PLAY mode
    
    //! SKILLS/TOOLS Toggle
    if (game.settings.get(TgceRestyler5e3.ID, TgceRestyler5e3.SETTINGS.SKILLS_TOGGLE)) {
        const div = document.createElement("DIV");
        const abi = sheet._hiddenAbility ??= "tool";
        div.innerHTML = `<a class="swap hide-${abi}"><i class="fa-solid fa-right-left"></i></a>`;
        div.firstElementChild.addEventListener("click", swapAbilityBox.bind(sheet));
        html.querySelector(".dnd5e2.sheet.actor.character .sheet-body .tab-body .col-2 > .left").prepend(div.firstElementChild);
    };

    if (document.getElementById(`${sheet.object._id}`)){
        document.getElementById(`${sheet.object._id}`).remove()
    };   

    if (!game.settings.get(TgceRestyler5e3.ID, TgceRestyler5e3.SETTINGS.NAV_RELOC_TOGGLE)) {
        const myTgceStyleSheet = Array.from(document.styleSheets).find((e) => (e)?.href?.includes("tgce-restyler-5e3"));
        const rulesForActor = Array.from(myTgceStyleSheet.cssRules).filter((e) => (e).selectorText.includes(`${sheet.object._id}`));
        if(!rulesForActor.length == 0){
            Array.from(rulesForActor).forEach((e) => {
                const currentSelectorText = (e)?.selectorText
                myTgceStyleSheet.deleteRule(Array.from(myTgceStyleSheet.cssRules).findIndex((e) => (e)?.selectorText === currentSelectorText));                    
            });
        };
        return;             
    };
    
    if (game.settings.get(TgceRestyler5e3.ID, TgceRestyler5e3.SETTINGS.RELOC_ALWAYS)) {
        if (game.settings.get(TgceRestyler5e3.ID, TgceRestyler5e3.SETTINGS.RELOC_ALWAYS)) { //? If relocation is default, just move the nav tabs and return. 
            const myTgceStyleSheet = Array.from(document.styleSheets).find((e) => (e)?.href?.includes("tgce-restyler-5e3"));
            const rulesForActor = Array.from(myTgceStyleSheet.cssRules).filter((e) => (e).selectorText.includes(`${sheet.object._id}`));   
            Array.from(styleLibrary, (e) => `#ActorSheet5eCharacter2-Actor-${sheet.object._id}${e}`).forEach(function(rule) {
                myTgceStyleSheet.insertRule(rule, myTgceStyleSheet.cssRules.length)
            });
            return;
        };
    };    
});
  
Hooks.on('renderSettingsConfig', (app, el, data) => { 
    const currentSettingValues = {};
    for (const setting of Object.values(TgceRestyler5e3.SETTINGS)) {
        currentSettingValues[setting] = game.settings.get(TgceRestyler5e3.ID,setting)
    }    
    const hdrbgclr = currentSettingValues['header-bg-color'] || game.settings.settings.get(`${TgceRestyler5e3.ID}.header-bg-color`)?.default
    const hdrnmclr = currentSettingValues['header-name-color'] || game.settings.settings.get(`${TgceRestyler5e3.ID}.header-name-color`)?.default
    const hdrtxclr = currentSettingValues['header-text-color'] || game.settings.settings.get(`${TgceRestyler5e3.ID}.header-bg-color`)?.default
    const shtltclr = currentSettingValues['sheet-card-headers-l'] || game.settings.settings.get(`${TgceRestyler5e3.ID}.sheet-card-headers-l`)?.default
    const shtrtclr = currentSettingValues['sheet-card-headers-r'] || game.settings.settings.get(`${TgceRestyler5e3.ID}.sheet-card-headers-r`)?.default
    const shttxclr = currentSettingValues['sheet-card-headers-txt'] || game.settings.settings.get(`${TgceRestyler5e3.ID}.sheet-card-headers-txt`)?.default

    el.find('[name="tgce-restyler-5e3.header-bg-color"]').parent()
        .append(`<input type="color" value="${hdrbgclr}" data-edit="tgce-restyler-5e3.header-bg-color">`)
    el.find('[name="tgce-restyler-5e3.header-name-color"]').parent()
        .append(`<input type="color" value="${hdrnmclr}" data-edit="tgce-restyler-5e3.header-name-color">`)
    el.find('[name="tgce-restyler-5e3.header-text-color"]').parent()
        .append(`<input type="color" value="${hdrtxclr}" data-edit="tgce-restyler-5e3.header-text-color">`)
    el.find('[name="tgce-restyler-5e3.sheet-card-headers-l"]').parent()
        .append(`<input type="color" value="${shtltclr}" data-edit="tgce-restyler-5e3.sheet-card-headers-l">`)
    el.find('[name="tgce-restyler-5e3.sheet-card-headers-r"]').parent()
        .append(`<input type="color" value="${shtrtclr}" data-edit="tgce-restyler-5e3.sheet-card-headers-r">`)
    el.find('[name="tgce-restyler-5e3.sheet-card-headers-txt"]').parent()
        .append(`<input type="color" value="${shttxclr}" data-edit="tgce-restyler-5e3.sheet-card-headers-txt">`)
    
});

//*_______________________   (Functions)  ______________________________________________________________________________/
function swapAbilityBox(event) {
    const target = event.currentTarget;
    this._hiddenAbility = this._hiddenAbility === "skill" ? "tool" : "skill";
    target.classList.toggle("hide-skill", this._hiddenAbility === "skill");
    target.classList.toggle("hide-tool", this._hiddenAbility !== "skill");
}

//*_______________________   (Styles Library)  ____________________________________________________________/
const styleLibrary = new Array ( '.dnd5e2.sheet.actor.character:not(.minimized) nav.tabs > .item { \
    width:3.5rem; \
    height:2rem; \
    padding:0; \
    flex-direction: row; \
    justify-content: center; \
    align-items: center; \
    border-radius:8px; \
}',
'.dnd5e2.sheet.actor.character nav.tabs > .item.active, .dnd5e2.sheet.actor.character nav.tabs > .item:hover{ \
    text-shadow: none; \
    margin: 0; \
    border-color: var(--dnd5e-color-red); \
    box-shadow: 0 6px 6px var(--dnd5e-color-gold); \
    transform: scale(1.25); \
}',
'.dnd5e2.sheet.actor.character nav.tabs { \
    --tab-full-width: initial; \
    --tab-inactive-width: initial; \
}',
'.dnd5e2.sheet.actor.character:not(.minimized) nav.tabs > .item:after { \
    border:initial;\
    inset:0.25rem; \
    border: 1px solid var(--dnd5e-color-gold); \
    border-radius: 4px; \
}',
'.dnd5e2.sheet.actor.character:not(.minimized) nav.tabs > .item > i{ \
    display:block; \
}',
'.dnd5e2.sheet.actor.character:not(.minimized) nav.tabs[data-group="primary"] { \
    top:10px; \
    left:8%; \
    display: flex; \
    flex-direction: row; \
    gap: 2rem; \
    z-index:10; \
}',
'.dnd5e2.sheet.actor.character .sheet-header > .right > div:last-child .sheet-header-buttons { \
    display: flex; \
    align-items: center; \
    gap: 0.5rem; \
    position: absolute; \
    top: 1.5rem; \
    left: 0px; \
}',
'.dnd5e2.sheet.actor.character .sheet-header > .right > div:last-child .sheet-header-buttons button{ \
    width:2rem; \
    height:2rem; \
}',
'.dnd5e2.sheet.actor.character .sheet-header > .right > div:last-child .sheet-header-buttons button:hover{ \
    transform: scale(1.25);	\
}',
'.dnd5e2.create-document.dialog{ \
    border-radius:8px; \
    border: 1px solid var(--dnd5e-color-gold); \
    width: auto !important; \
    height: auto !important; \
}',
'.dnd5e2.create-document.dialog .window-header{ \
    background: #000; \
    border-radius: 8px 8px 0 0; \
}',
'.dnd5e2.create-document.dialog .dialog-button{ \
    padding:0.25rem 0.5rem; \
}')

