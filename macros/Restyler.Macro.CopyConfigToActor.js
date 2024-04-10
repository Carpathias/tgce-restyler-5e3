/*  TGCE-RESTYLER-5E3 | MACRO | Copy Restyler Config to Actor
    
    Instructions
    1.  Clear any existing Restyler config found on target actor.   
            The Target actor should have no Restyler config. If the target actor does have an existing config
            use the Restyler UI to clear the target actor to deafults before hand.
    2.  De-select all selected Tokens. 
    3.  Select the 'source' token first.
            This is the token for the actor that has the Restyler config to be copied. 
    4.  Select the 'target' token second.
            This is the token for the actor that will recieve the source token's Restyler config. 
            Note: Hold down the 'shift' when clicking the second token, so two tokens are selected. 
    5.  Run this macro.

*/

if (canvas.tokens.controlled.length !== 2){
  console.log('TGCE-RESTYLER-5E3 | MACRO | Please select two, and only two, tokens...');
  ui.notifications.warn('TGCE-RESTYLER-5E3 | MACRO | Please select two, and only two, tokens... The first token selected will be the source.');
  return;
}

const [sourceActor, targetActor] = canvas.tokens.controlled
const sourceActorData = game.actors.get(sourceActor.document.actorId)
const targetActorData = game.actors.get(targetActor.document.actorId)
const sourceElementFlags = sourceActorData.getFlag('tgce-restyler-5e3', 'elements')
const sourceCssTextFlags = sourceActorData.getFlag('tgce-restyler-5e3', 'cssText')

console.log(`TGCE-RESTYLER-5E3 | MACRO | Clearing existing flags on target:${targetActor.document.actorId}`)
ui.notifications.info(`TGCE-RESTYLER-5E3 | MACRO | Clearing existing flags on target:${targetActor.document.actorId}`);
targetActorData.unsetFlag('tgce-restyler-5e3','elements')
targetActorData.unsetFlag('tgce-restyler-5e3','cssText')

console.log(`TGCE-RESTYLER-5E3 | MACRO | Copying Flags from actor:${sourceActor.document.actorId} to actor:${targetActor.document.actorID}`);
ui.notifications.info(`TGCE-RESTYLER-5E3 | MACRO | Copying Flags from actor:${sourceActor.document.actorId} to actor:${targetActor.document.actorID}`);
Object.entries(sourceElementFlags).forEach(([key, value]) => {
    targetActorData.setFlag('tgce-restyler-5e3', `elements.${key}`, value)
})
Object.entries(sourceCssTextFlags).forEach(([key, value]) => {
    targetActorData.setFlag('tgce-restyler-5e3', `cssText.${key.replace(sourceActor.document.actorId,targetActor.document.actorId)}`, value)
})

console.log(`TGCE-RESTYLER-5E3 | MACRO | Completed. You may need to reload the game to clear any existing CSS for the target actor, if it had an existing Restyler config.`);
ui.notifications.info(`TGCE-RESTYLER-5E3 | MACRO | Completed. You may need to reload the game to clear any existing CSS for the target actor, if it had an existing Restyler config.`);
