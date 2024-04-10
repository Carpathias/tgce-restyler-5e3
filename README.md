
![TGCE_RestylerLogo](https://github.com/Carpathias/tgce-restyler-5e3/assets/79472577/87a2e886-dd2c-4afb-bfd1-fb82fa05c9df)

# Resources and tools helping DMs and Players acheive The Greatest Campaign Ever!

# [TGCE] Restyler for DnD5e 3.0

This module allows for restyling of some of the DnD5e System components for Foundry VTT. 
Creating this module would not have been possible without the wonderful people who haunt the various channels of the Official Foundry VTT Discord Server. 

Thanks, to you all. 
![Restyler0](https://github.com/Carpathias/tgce-restyler-5e3/assets/79472577/eccee81f-9d70-4a05-bfdc-0c245e295396)

![Restyler1](https://github.com/Carpathias/tgce-restyler-5e3/assets/79472577/9902473c-f8ee-4c22-b12e-696e9f3af7a6)

## The Restyler UI is accessed from the Character Sheet using the header button labeled with a paintbrush.

## Restyler config is per Actor. If you want to copy the Restyler config from one actor to another, you can us ethe macro found at the link below.
[RESTYLER | MACRO | CopyConfigToActor](https://github.com/Carpathias/tgce-restyler-5e3/blob/main/macros/Restyler.Macro.CopyConfigToActor.js)

This macro will be included in future release and will eventually make its way into core functionality of the mod. 

## Player Character Sheet Visual Enhancements

![alt text](pictures/charactersheet2.png) ![alt text](pictures/charactersheet3.png)

- The entire character sheet is scalable from .8 (80% of default) to 1 (default)
- The navigation tabs have been relocated to the character sheet header and dressed up a bit.
  - As of v1.2.0 this is now optional.     
- The header image can be replaced, or removed.
- The header background color can be selected.
  - This is typically buried under the image, but if the image is removed, or one with transparency is used, the color will be visible.
- Some header text elements can be colored.
- Hue-Rotation: A color filter can be applied to the entire header, affecting all elements, using the hue-rotation method.
- On other tabs of the sheet (Inventory/Spells, etc..) the section banners (Weapons, Consumables, etc..) on can be color changes, as well as the section header text. 
  - https://www.w3schools.com/cssref/playdemo.php?filename=playcss_filter&preval=hue-rotate(90deg) for an example

## Player Character Sheet Functional Enhancements

![alt text](pictures/skills-tools-toggle1.png) ![alt text](pictures/skills-tools-toggle2.png)

- A button is added to the skill tree to toggle between skill and tools, reducing overall shett height. Especially on higher level characters with many tool proficiencies.

## Chatcard Pill color highlights.

![alt text](pictures/notprofequippill.jpg)![alt text](pictures/concentrationpill.jpg)![alt text](pictures/profnotequippill.jpg)

- The chat pills for profieicy and equipped status will be color coded. These are currently color coded green/maroon, but in a future release will be selectable to account for color blindness.
- Concentration pill is colored yellow with black text to be more visible. 

## Provided sheet banners

- The following four images, sized at 800x170 pixels, can be found in the modules/tgce-restyler-5e3/assets folder. You will have to manually navigate to the location using the file picker. This location will be set as default in a future release. 

![alt text](assets/sheet-banner-darkblood.jpg)

![alt text](assets/sheet-banner-dwarf1.jpg)

![alt text](assets/sheet-banner-goliath.jpg)

![alt text](assets/sheet-banner-stoneface.jpg)

![alt text](assets/sheet-banner-lightrays.jpg)

All of these pictures are proprietary content created by myself. 

### Additional Examples
- The picture below uses only the Hue Rotation option to adjust the coloring of the header on an otherwise stock DnD5e character sheet.

![Hue Rotation (only) of stock DnD5e sheet](pictures/charactersheet.png)
