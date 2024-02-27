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
        SKILLS_TOGGLE           : 'skill-toggle'
      }
    static initialize() {
        //? Sheet Header Settings                        
        game.settings.register(this.ID, this.SETTINGS.HEADER_IMAGE, {
            name        : "Character Sheet Header Image",
            default     : "systems/dnd5e/ui/official/banner-character.jpg",
            type        : String,
            scope       : 'client',
            config      : true,
            filePicker  : "image",
            hint        : "This settings allows for the replacement of the default image in the character sheet header. Default DnD5e System \
                Image image is used if nothing is specified. Setting will accept custom URL, ie.. https://mysite/mypath/myimage.jpg",
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
        game.settings.register(this.ID, this.SETTINGS.HEADER_IMAGE_NULL, {
            name    : "Remove Character Sheet Header Image",
            default : false,
            type    : Boolean,
            scope   : 'client',
            config  : true,
            hint    : "This setting when enabled will remove the image from the character sheet header, even if a custom image is chosen above.",
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
    const imagePath = currentSettingValues['header-image'] || game.settings.settings.get(`${TgceRestyler5e3.ID}.header-image`)?.default;
    //? The below is required to modify the image path to be useable in the CSS 
    if (imagePath.includes("http:")) {var constructedImagePath = "url(\""+imagePath+"\")"
        } else if (imagePath.includes("https://")) {var constructedImagePath = "url(\""+imagePath+"\")"
            } else {var constructedImagePath = "url(\"../../../"+imagePath+"\")"
    };    
    //? Injects the new header image value if header-image-null setting is false, otherwise clears the header image from the character sheet. 
    if(!currentSettingValues['header-image-null']){document.documentElement.style.setProperty('--tgce-restyler5e3-charsheetheader-image', constructedImagePath);
        } else {document.documentElement.style.setProperty('--tgce-restyler5e3-charsheetheader-image', "null");
    };
    const hueRotateValue = (currentSettingValues['header-hue-rotate'] || game.settings.settings.get(`${TgceRestyler5e3.ID}.header-hue-rotate`)?.default)+"deg";
    console.log(hueRotateValue);
    //* ---------------- Other Character Sheet Updates
    document.documentElement.style.setProperty('--tgce-restyler5e3-charsheetheader-name-color', (currentSettingValues['header-name-color'] || game.settings.settings.get(`${TgceRestyler5e3.ID}.header-name-color`)?.default));
    document.documentElement.style.setProperty('--tgce-restyler5e3-charsheetheader-bg-color', (currentSettingValues['header-bg-color'] || game.settings.settings.get(`${TgceRestyler5e3.ID}.header-bg-color`)?.default));
    document.documentElement.style.setProperty('--tgce-restyler5e3-charsheetheader-text-color', (currentSettingValues['header-text-color'] || game.settings.settings.get(`${TgceRestyler5e3.ID}.header-text-color`)?.default));
    document.documentElement.style.setProperty('--tgce-restyler5e3-hue-rotate-degrees', hueRotateValue);
    document.documentElement.style.setProperty('--tgce-restyler5e3-sectionheader-color-left', (currentSettingValues['sheet-card-headers-l'] || game.settings.settings.get(`${TgceRestyler5e3.ID}.sheet-card-headers-l`)?.default));
    document.documentElement.style.setProperty('--tgce-restyler5e3-sectionheader-color-right', (currentSettingValues['sheet-card-headers-r'] || game.settings.settings.get(`${TgceRestyler5e3.ID}.sheet-card-headers-r`)?.default));
    document.documentElement.style.setProperty('--tgce-restyler5e3-sectionheader-text-color', (currentSettingValues['sheet-card-headers-txt'] || game.settings.settings.get(`${TgceRestyler5e3.ID}.sheet-card-headers-txt`)?.default));

    console.log(currentSettingValues)
});


//*_______________________   (Module Hooks: Contributed)    _________________________________________________________/ 
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
    if (game.settings.get(TgceRestyler5e3.ID, TgceRestyler5e3.SETTINGS.SKILLS_TOGGLE)) {
        if (sheet._mode !== sheet.constructor.MODES.PLAY) return;
        const div = document.createElement("DIV");
        const abi = sheet._hiddenAbility ??= "tool";
        div.innerHTML = `<a class="swap hide-${abi}"><i class="fa-solid fa-right-left"></i></a>`;
        div.firstElementChild.addEventListener("click", swapAbilityBox.bind(sheet));
        html.querySelector(".dnd5e2.sheet.actor.character .sheet-body .tab-body .col-2 > .left").prepend(div.firstElementChild);
    }
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

//*_______________________   (Functions: Contributed)    ____________________________________________________________/
function swapAbilityBox(event) {
    const target = event.currentTarget;
    this._hiddenAbility = this._hiddenAbility === "skill" ? "tool" : "skill";
    target.classList.toggle("hide-skill", this._hiddenAbility === "skill");
    target.classList.toggle("hide-tool", this._hiddenAbility !== "skill");
}




