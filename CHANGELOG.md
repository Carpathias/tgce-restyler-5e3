# [CHANGELOG]: TGCE Restyler for DnD5e 3.0

## v2.0.01
- Per Actor sheet editing, settings stored as flags on Actor.
-- Only edit one sheet at a time.
-- Restyler UI will disable the Actor sheet close button while open. 
- Restyler UI is now accessed from a 'paintbrush' button on the sheet header.
-- Sheet editing can be enabled/disabled globally in settings. 
- Navigation Tab relocation has been removed from the module.
-- May return in a future release. 

## v1.2.0
### Resolved Issue[#4](https://github.com/Carpathias/tgce-restyler-5e3/issues/4)
- Relocate Navigation Tabs
  - The additional nav tab has been removed in favor of just a single Boolean setting to enable/disable.
  - This setting does require a reload.
- Other Changes
  - Character sheet no longer needs opened and closed to refresh style settings.
    - Settings will apply as soon as Settings UI is saved and closed. 
  - Added additional chat pill highlighting for Concentration tag.
  - Added the ability to scale the entire sheet down to .8 (80%) of default.

## v1.1.1
### Issue#4 Relocation Nav Button / Not working - Running on forge-vtt.com
- Repackaged to v1.1.1 for troubleshooting this issue.

Update
https://github.com/Carpathias/tgce-restyler-5e3/issues/4
- Continuing to work on Issue#4
- After the v1.1.1 update Foundry/Forge did not recognize the update
- Manually installed v1.1.1 update from manifest in local dev instance and Forge-vtt instance
  - Nav tab functionality issues seemed resolved in Forge-vtt instance
  - Both Foundry and Forge prompting for update to 'new' version v1.1.0
- Removed all packages from Foundry Package Manager
  - Foundry now recoginzes v1.1.1 and installs successfully
  - Forge now recognizes v1.1.1, but issue with nav buttons persists
  - Manually installing from manifest fixes the issues
    - https://github.com/Carpathias/tgce-restyler-5e3/releases/download/v1.1.1/module.json
    - Need to uncheck the toggle for 'Install from the Bazaar if the package is found' when installing
- Recreated a new v1.1.1 package in Foundry Package Manager
- Will need to monitor and continue testing on Forge. 

## v1.1.0
### Issue[#1] 
- Resolved.
  
### Issue[#2] Need to add option to enable/disable relocation of nav buttons.
- Complete. 

## v1.0.0
- initial release.
