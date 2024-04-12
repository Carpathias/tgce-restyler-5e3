/*
! TGCE - The Greatest Campain Ever
! MODULE: tgce-restyler-5e3 || Restyler for DnD5e 3+
! by Carpathias

*/

//?--------------------------------------------------------------------------------------------------
//! CONSTANTS
//?--------------------------------------------------------------------------------------------------

const MODULE                = "tgce-restyler-5e3";
const MODULE_UC             = MODULE.toUpperCase();
const MODULE_NICKNAME       = "TGCE Restyler";
const HEXREGX               = /^#([A-Fa-f0-9]{6})$/;
const DEFAULTDIR            = "modules/tgce-restyler-5e3/assets";
const CSS_HREF              = "dnd5e.css";
const SYSTEMV               = /^3.0.*/

let skillToolToggle;
//?--------------------------------------------------------------------------------------------------
//! CLASSES
//?--------------------------------------------------------------------------------------------------

class Restyler extends FormApplication {
    static init() {
               
        game.settings.register(`${MODULE}`, "enableSheetEdits", {
            name            : "TgceRestyler5e3.SettingHeaderLabel",
            hint            : "TgceRestyler5e3.SettingHeaderLabelHint",
            scope           : "world",
            config          : true,
            type            : Boolean,
            default         : true,
            requiresReload  : false
        });
        game.settings.register(`${MODULE}`, "skillToolToggle", {
            name            : "TgceRestyler5e3.SkillToolToggle",
            hint            : "TgceRestyler5e3.SkillToolToggleHint",
            default         : true,
            type            : Boolean,
            scope           : 'client',
            config          : true,
            requiresReload  : false
        });
        game.settings.register(`${MODULE}`, "chatPillColors", {
            name            : "TgceRestyler5e3.ChatPillToggle",
            hint            : "TgceRestyler5e3.ChatPillToggleHint",
            default         : true,
            type            : Boolean,
            scope           : 'client',
            config          : true,
            requiresReload  : false
        });
        game.settings.register(`${MODULE}`, "debug", {
            name            : "debug",
            default         : false,
            type            : Boolean,
            scope           : 'client',
            config          : false,
            requiresReload  : false
        });   

        Hooks.on("getActorSheetHeaderButtons", (app, array) => {
            debugLog('green', `Inside Hook:getActorSheetHeaderButtons, ${app.id}}`)
            if (app.id){console.log(app.id)} else (console.log("No current app.id"));

            const isChar2 = app.constructor.name === "ActorSheet5eCharacter2";
            if (isChar2 && game.settings.get(MODULE, "enableSheetEdits")) {
                const styleButton = {
                    class   : MODULE,
                    icon    : "fa-solid fa-paintbrush",
                    onclick : async () => new Restyler(app.document).render(true),
                    label   : game.i18n.localize("TgceRestyler5e3.Header")
                };
                array.unshift(styleButton); 
            }
        });        
    }    

    constructor(actor, options = {}) {
        debugLog('green', "Inside the Restyler class constructor...");
        super(actor, options);
        this.actor              = actor;
        this.cssAnchorID        = `#ActorSheet5eCharacter2-Actor-${actor._id}`;
        Restyler.actor          = actor;
        Restyler.cssAnchorID    = `#ActorSheet5eCharacter2-Actor-${actor._id}`;
        Restyler.sheetID        = `ActorSheet5eCharacter2-Actor-${actor._id}`;
        debugLog('magenta', `- Current Actor: ${this.actor} ID: ${this.actor._id}`);
        debugLog('magenta', `- CSS Rule Anchor:: ${this.cssAnchorID} :: will be applied to all CSS for this actor.`)   
    }    

    /** @override */
    get title() {
        debugLog('green', "Inside get title() override...")
        debugLog('magenta', `- App Title: Restyler: ${this.actor.name}`)
        return `${MODULE_NICKNAME}: ${this.actor.name}`
    }

    /** @override */
    get id() {        
        return `${MODULE}-${this.actor.uuid.replaceAll(".", "-")}`;
    }

    /** @override */
    async getData() {
        if (SYSTEMV.test(game.system.version)) {
            const darkTheme = false;
            const cssAnchorID = this.cssAnchorID
            return {darkTheme, cssAnchorID}
        } else {
            const darkTheme = game.settings.get("dnd5e","theme") == "dark";
            const cssAnchorID = this.cssAnchorID
            return {darkTheme, cssAnchorID}
        }                
    };

    /** @override */
    static get defaultOptions() {
        debugLog('green', "Inside get defaultOption() override...")        
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes         : [MODULE],
            template        : `modules/${MODULE}/templates/tgce-restyler-5e3.hbs`,
            width           : 500,
            height          : 500,                    
            submitOnChange  : false,
            submitOnClose   : true,
            closeOnSubmit   : false,
            scrollY         : [".middle-section"],
            resizable       : true
        });       
    }
   
    /** @override */
    activateListeners(html) {
        debugLog('green', "Inside activateListeners() override...")
        super.activateListeners(html);
        html[0].querySelectorAll("[data-action]").forEach(element => {
            debugLog('magenta', `- Adding eventListener to element: ${element.id} of type: ${element.type}`)
            switch (element.dataset.action) {
                case "defaults"         : element.addEventListener("click"      , this._onClickDefaults.bind(this));        break;
                case "clear"            : element.addEventListener("click"      , this._onClickClear.bind(this));           break;
                case "save-close"       : element.addEventListener("click"      , this._onClickSaveClose.bind(this));       break;
                case "get-filepath"     : element.addEventListener("click"      , this._onClickFilePicker.bind(this));      break;
                case "get-hexcolor"     : element.addEventListener("input"      , this._onColorValueChange.bind(this));     break;
                case "get-range"        : element.addEventListener("input"      , this._onRangeValueChange.bind(this));     
                case "get-range"        : element.addEventListener("mousewheel" , this._onRangeValueChange.bind(this));     break;
            }
        });
    } 

    _onClickDefaults(event) {
        debugLog('green', `${event.target.id} Defaults button clicked`)        
        //? Removing cssRules for Actor from DnD5e styleSheet
        debugLog('cyan', `- Removing CSS Rules in DOM for actor ${this.actor._id}...`)
        const myStyleSheet = Array.from(document.styleSheets).find((ss) => ss?.href?.includes(CSS_HREF))
        Array.from(myStyleSheet.cssRules).filter((r) => r?.selectorText?.includes(this.cssAnchorID)).forEach((i) => {
            myStyleSheet.deleteRule(i);
        });
        //? Removing all flags from Actor.
        debugLog('cyan', `- Removing CSS Rules stored in flags on actor ${this.actor._id}...`)
        game.actors.get(this.actor._id).unsetFlag(MODULE, 'cssText');
        debugLog('cyan', `- Removing Restyler config stored in flags on actor ${this.actor._id}...`)
        game.actors.get(this.actor._id).unsetFlag(MODULE, 'elements');
        //? Setting applicationForm to defaults.
        this.form.reset();        
    }

    _onClickSaveClose(event) {
        debugLog('green', `${event.target.id} Button clicked, closing form...`)
        this.close();
    }

    _onSelectorValueChange(event) {
        debugLog('green', `${event.target.id} value changed. Is now ${event.target.value}`);
        if (event.target.id == 'theme-selector'){
            game.settings.set('dnd5e', 'theme', `${event.target.value}`);
            this.render();
        }
        
        if (event.target.id == 'color-preset'){
            //Placeholder for Presets Selector (sheet color themes) to come in v2.x...
        }
    }

    _onClickClear(event) {
        debugLog('green', `${event.target.id} Clear button clicked`);
        const targetID              = event.target.id.replace("clear-","")
        if (targetID.includes('-left-right')){
            let left    = document.getElementById(targetID.replace('-right',''));
            left.value              = left.defaultValue;
            let leftTextElement     = document.getElementById(`text-${left}`);
            if (leftTextElement){
                leftTextElement.value = leftTextElement.defaultValue;
            } 
            let right   = document.getElementById(targetID.replace('-left',''));
            right.value             = right.defaultValue;
            let rightTextElement    = document.getElementById(`text-${right}`);
            if (rightTextElement){
                rightTextElement.value = rightTextElement.defaultValue;
            }
            Array.from(Object.values(left.dataset).filter((i) => i.includes(this.cssAnchorID))).forEach((rule) => {            
                const [selector, property, value] = rule.split('||');
                removePropertyOrRule(selector, property, value);
            }); 
        } else {
            let currentElement      = document.getElementById(targetID);
            currentElement.value    = currentElement.defaultValue;
            let textElement         = document.getElementById(`text-${targetID}`);
            if (textElement){
                textElement.value   = currentElement.defaultValue;
            }
            Array.from(Object.values(currentElement.dataset).filter((i) => i.includes(this.cssAnchorID))).forEach((rule) => {            
                const [selector, property, value] = rule.split('||');
                removePropertyOrRule(selector, property, value);
            });
        }        
    }

    _onClickFilePicker(event) {
        debugLog('green', `Inside Method: _onClickFilePicker()...`)
        new FilePicker({
            callback    :(path) => {
                const element = document.getElementById(event.target.id.replace('button-',''));
                element.value = path;
                debugLog('cyan', `${event.target.id.replace('button-','')} value changed(${element.value})... passing to function updateCssImagePath(path)`);
                const rule = element.dataset.csstext.replace('VALUE',updateCssImagePath(path));                
                debugLog('cyan', `path correction complete...passing to function createOrUpdateCssRule()`);
                const [selector, property, value] = rule.split('||');           
                createOrUpdateCssRule(selector, property, value);                
            },
            current     : DEFAULTDIR,
            type        : "image",
            displayMode : "thumbs"            
        }).render(true);        
    }
    
    _onColorValueChange(event) {
        debugLog('green', `Inside Method: _onColorValueChange(event)...`)
        debugLog('cyan', `${event.target.id} value changed(${event.target.value})... passing to function createOrUpdateCssRule()`);
        Array.from(Object.values(event.target.dataset).filter((i) => i.includes(this.cssAnchorID))).forEach((rule) => {            
            if (rule.includes('linear-gradient')){
                if(event.target.id.includes('-left')){
                    const partner = document.getElementById(event.target.id.replace('-left','-right'))
                    rule = rule.replaceAll('VALUE',event.target.value).replaceAll('RGT',partner.value);
                }
                if(event.target.id.includes('-right')){
                    const partner = document.getElementById(event.target.id.replace('-right','-left'))
                    rule = rule.replaceAll('VALUE',event.target.value).replaceAll('LFT',partner.value);
                }                
            } else {
                rule = rule.replaceAll('VALUE',event.target.value);
            }
            if (!event.target.id.includes("text-")){
                document.getElementById(`text-${event.target.id}`).value = event.target.value;
                const [selector, property, value] = rule.split('||');           
                createOrUpdateCssRule(selector, property, value);             }
            if (event.target.id.includes("text-")){            
                if (HEXREGX.test(event.target.value)){
                    document.getElementById(event.target.id.replace("text-","")).value = event.target.value;
                    const [selector, property, value] = rule.split('||');           
                    createOrUpdateCssRule(selector, property, value); 
                }            
            }                                
        });             
    }    
   
    _onRangeValueChange(event) {
        debugLog('green', `Inside Method: _onRangeValueChange(event)...`)
        debugLog('cyan', `${event.target.id} value changed(${event.target.value})... passing to function createOrUpdateCssRule()`);
        Array.from(Object.values(event.target.dataset).filter((i) => i.includes(this.cssAnchorID))).forEach((rule) => {            
            rule = rule.replaceAll('VALUE',event.target.value);
            const [selector, property, value] = rule.split('||');           
            createOrUpdateCssRule(selector, property, value); 
        });      
    }

    _updateObject(){    
        debugLog('green', "Inside _updateObject()...")
        debugLog('cyan', "- Saving Flags to Actor");
        const myStyleSheet = Array.from(document.styleSheets).find((e) => e?.href?.includes(CSS_HREF))
        Array.from(myStyleSheet.cssRules).filter((e) => e?.selectorText?.includes(`${this.cssAnchorID}`)).forEach((e) => {  
            debugLog('cyan', `- Setting CSS Rule to flag:>> ${e.cssText}`)
            const [selector, propertyValue] = e.cssText.split(" {");
            this.actor.setFlag(MODULE, `cssText.${selector.replaceAll('.','&')}`, `{${propertyValue}`);        
        });
        Array.from(Array.from(this.form).filter((e) => e.tagName == "INPUT")).forEach((e) => {            
            if(e.value !== e.defaultValue){
                debugLog('cyan', `- Setting Restyler conig to Flag:>> ${e.id} :: ${e.value}`);
                this.actor.setFlag(MODULE, `elements.${e.id}`, e.value);
            }        
        })
        debugLog('green', "Restyler closed....");
        debugLog('magenta', `${this.cssAnchorID} - Updates Complete...`)
    }
}

//?--------------------------------------------------------------------------------------------------
//! HOOKS
//?--------------------------------------------------------------------------------------------------

Hooks.once("init", () => {
    console.log(`\x1b[36m${MODULE_UC}\x1b[0m | Module Initializing...` )
    Restyler.init();
    console.log(`______________________________________________________________`);
    console.log(`RRRRR                 tt          ll`                          );                   
    console.log(`RR  RR  eeee   ssss   tt   yy  yy ll  eeee   rrrr`             );
    console.log(`RRRRR  ee  ee ss    tttttt yy  yy ll ee  ee rr  rr`            );
    console.log(`RRRR   eeeee   sssss  tt    yyyyy ll eeeee  rr`                );
    console.log(`RR RR  ee         ss  tt       yy ll ee     rr`                );
    console.log(`RR  RR  eeee   ssss   tt    yyyy  ll  eeee  rr     by TGCE`    );
    console.log(`______________________________________________________________`);
});

Hooks.once("ready", () => {
    console.log(`\x1b[36m${MODULE_UC}\x1b[0m | Module Loaded Successfully!` )
});

Hooks.on("closeRestyler", () =>{
    debugLog('green', `Inside Hook:closeRestyler >>`);
    const currentSheet    = document.getElementById(Restyler.sheetID);
    const closeButton     = currentSheet.getElementsByClassName('header-button control close');
    closeButton[0].classList.remove('disabled');
});

Hooks.on("renderRestyler", function(object) {   
    debugLog('green', `Inside Hook:renderRestyler >> Actor: ${object.actor._id}`);

    debugLog('cyan', `- Disabling Close button on ${Restyler.sheetID}...`);
    const currentSheet    = document.getElementById(Restyler.sheetID);
    const closeButton     = currentSheet.getElementsByClassName('header-button control close');
    closeButton[0].classList.add('disabled');

    debugLog('cyan', `- Checking Actor flags for Restyler config...`);
    Array.from(object.form).filter((e) => e.tagName == "INPUT").forEach((e) => {        
        if (object.actor.getFlag(MODULE, `elements.${e.id}`) !== undefined) {
            debugLog('cyan', `- ${e.id}`+" :: "+object.actor.getFlag(MODULE, `elements.${e.id}`));
            if (e.className == "checkbox") {
                document.getElementById(e.id).checked = object.actor.getFlag(MODULE, `elements.${e.id}`)
            } else { 
                document.getElementById(e.id).value = object.actor.getFlag(MODULE, `elements.${e.id}`)
            }
        } 
    })
});

Hooks.on("renderActorSheet5eCharacter2", function(object) {   
    debugLog('green', `Inside Hook:renderActorSheet5eCharacter2 >> Actor: ${object.actor._id}`);    
    const myStyleSheet = Array.from(document.styleSheets).find((e) => e?.href?.includes(CSS_HREF));
    if (game.actors.get(object.actor._id).flags['tgce-restyler-5e3']?.cssText !== undefined){
        debugLog('cyan', `- CSS Rules found in flags for actor ${object.actor._id}`);    
        debugLog('cyan', `- Checking ${myStyleSheet.href} for rules needing added... `);    
        Object.entries(game.actors.get(object.actor._id).flags['tgce-restyler-5e3'].cssText).forEach((e) => {
            if(!Array.from(myStyleSheet.cssRules).find((s) => s.selectorText == e[0].replaceAll('&','.'))){
                myStyleSheet.insertRule(e[0].replaceAll('&','.')+" "+e[1]);
                debugLog('cyan', `- CSS rule created: ${e[0].replaceAll('&','.')+" "+e[1]}`);
            }             
        });
    } else {
        debugLog('yellow', `- CSS Rules NOT found in flags for actor ${object.actor._id}`);    
    }
});

Hooks.on("renderActorSheet5eCharacter2", function(sheet, [html]) {
    if (sheet._mode !== sheet.constructor.MODES.PLAY) return; //!Requires PLAY mode  
    //! SKILLS/TOOLS Toggle
    if (game.settings.get(MODULE, "skillToolToggle")) {
        const div = document.createElement("DIV");
        const abi = sheet._hiddenAbility ??= "tool";
        div.innerHTML = `<a class="swap hide-${abi}"><i class="fa-solid fa-right-left"></i></a>`;
        div.firstElementChild.addEventListener("click", swapAbilityBox.bind(sheet));
        html.querySelector(".dnd5e2.sheet.actor.character .sheet-body .tab-body .col-2 > .left").prepend(div.firstElementChild);
    };     
});

Hooks.on("renderChatMessage", (chatMessage, html, data) => {    
    if (game.settings.get(MODULE, "chatPillColors")) {
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
                        case "Concentration":
                            $(this).addClass('yellow');
                        break;
                        //! Add more cases as needed
                    }
                }
            });
        });
    };
});
  
//?--------------------------------------------------------------------------------------------------
//! FUNCTIONS
//?--------------------------------------------------------------------------------------------------

//* Debugger
function debugLog(color, toLog){
    if      (color == "red")    { if (game.settings.get(MODULE, "debug")) {console.log(`\x1b[31m${MODULE_UC}\x1b[0m | ${toLog}`)}}
    else if (color == "green")  { if (game.settings.get(MODULE, "debug")) {console.log(`\x1b[32m${MODULE_UC}\x1b[0m | ${toLog}`)}}
    else if (color == "yellow") { if (game.settings.get(MODULE, "debug")) {console.log(`\x1b[33m${MODULE_UC}\x1b[0m | ${toLog}`)}}
    else if (color == "blue")   { if (game.settings.get(MODULE, "debug")) {console.log(`\x1b[34m${MODULE_UC}\x1b[0m | ${toLog}`)}}
    else if (color == "magenta"){ if (game.settings.get(MODULE, "debug")) {console.log(`\x1b[35m${MODULE_UC}\x1b[0m | ${toLog}`)}}
    else if (color == "cyan")   { if (game.settings.get(MODULE, "debug")) {console.log(`\x1b[36m${MODULE_UC}\x1b[0m | ${toLog}`)}}
    else { if (game.settings.get(MODULE, "debug")) {console.log(`>> ${toLog}`)}}
}

//* Zhell's skill/tool toggle function
function swapAbilityBox(event) {
    const target = event.currentTarget;
    this._hiddenAbility = this._hiddenAbility === "skill" ? "tool" : "skill";
    target.classList.toggle("hide-skill", this._hiddenAbility === "skill");
    target.classList.toggle("hide-tool", this._hiddenAbility !== "skill");
}

//* Image Path Correction and CSS Rule update
function updateCssImagePath(path){
    debugLog('green', `Inside Function: updateCssImagePath() >> ${path}`)
    const regex = /^http*/
    if (regex.test(path)) {
        return path;
    } else {
        const newPath = `"../../../${path}"`
        debugLog(null, `Corrected Image Path: ${newPath}`);
        return newPath;
    };   
}

//* CSS Rule Creator/Updater(add/modify property)
function createOrUpdateCssRule(selector, property, value) {
    debugLog('green', `Inside Function: createOrUpdateCssRule()`)
    const myStyleSheet = Array.from(document.styleSheets).find((e) => e?.href?.includes(CSS_HREF));    
    const currentCssRule = Array.from(myStyleSheet.cssRules).find((e) => e?.selectorText === selector);
    if (currentCssRule){
        debugLog('cyan', `- CSS Rule Found! Updating CSS Rule...`);
        if (property.includes('--')) {
            currentCssRule.style.setProperty(property, value);
        } else {
            currentCssRule.style[property] = value;
        }
    } else {
        debugLog('cyan', `- CSS Rule Not found! Creating CSS Rule...`);
        myStyleSheet.insertRule(`${selector} { ${property}: ${value}}`);
    }
}

function removePropertyOrRule(selector, property, value) {
    debugLog('green', `Inside Function: removePropertyOrRule()`)
    const myStyleSheet = Array.from(document.styleSheets).find((e) => e?.href?.includes(CSS_HREF));    
    let currentCssRule = Array.from(myStyleSheet.cssRules).find((e) => e?.selectorText === selector);
    if (currentCssRule) {
        if (currentCssRule.style.length <= 1) {
            debugLog('cyan', `- Last rule property, removing rule>> ${selector}`);
            myStyleSheet.deleteRule(Array.from(myStyleSheet.cssRules).findIndex((e) => e?.selectorText == selector));
        } else {
            debugLog('cyan', `- Removing Property>> ${property}: ${value}`);
            currentCssRule.style.removeProperty(property);
        }
    }
}

