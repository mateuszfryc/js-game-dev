## Features:

- [ ] information feedback for player, sorrounindg and who and what is here
  - [ ] where am I? - genral info of space station and current location
  - [ ] what can I use in here? - list of usable items?
  - [ ] when am I - short info bout time (some distant date)
  - [ ] what I wear
  - [ ] what I have - inventory
  - [ ] who am I?
  - [ ] where can I go?
- [ ] input history
  - [x] use arrows to navigate input
  - [x] cache history in browser local storage
  - [x] while using arrows filter out the same input to avoid having to hit arrow twice for the same text
  - [ ] suggestions?
- [ ] save game
  - [ ] implement game state
    - [ ] progress saved per character
    - [ ] messages progress - first time massage, and then changed or short and messages
    - [ ] game state tree that saves progress of information that protagonist learns on it's way, e.g. at first he has vague recollections of where he is but he can learn more from other crew members or computers
  - [ ] use local storage to save game state (auto)
  - [ ] download game state (manual)

Adventure Game Editor

- avoid situations when player needs to use [wait] command
- game save
- how big is [target]
- go back (previous location)
- refuse
- close -> slams shut
- input suggestions
- mark action as question to imply the need of question mark or add keyWords with question mark?
- CONTEXT
  - may impact the keywords, actions
- close it - context for previously mentioned?/referened items
- "go to" action could/should? allow player to make fast travel with random events if the destination was already visited
- "open second locker" if there are more than two within the reach
- take all
- when dropping item by name allow using "all" to drop all of these items at once
- input history can remove conseqiutive repetitions of the same command
- save game every few minutes that triggers popup with window to save file
- drawing clickable locations with window/panel that alows to edit their contents, add entities etc.
- add/edit entity panel
- story diagram editor
- some actions could make player endup in jail where he would be given discription of the passing time and then station explosion
- for some entites if there is more than one add words that could replace the number of them in the location description, i.e. instead of informing player that there are "5 flies" print "few flies"

  - start node
  - event trigers

- Axe before entering (chop your way through the door)
- A connoisseur of literature (use . at the end of at least 10 consecutive commands)

// ! Periotheus Space Station
// ! turn off red flashes, this could be replaced by red light glowing on the edges of the screen
// ! help text could go into modal to avoid polluting message log
// ! there will be second person that moved back in time on the station that also lost her memory, she will try to stop the player

// TODO batch messages and require from player to pres ENTER to see next one?
// TODO TUTORIAL
// TODO cache player input results
// TODO turns counter - turn is accepted player command

// TODO routing actions that could link to actuall actions
// e.g. look that could be used with 'look up' to look at the sky or ceiling
// or look under to check what is under the bed

// TODO display actions count/score?
// location name always displayed on status bar at the top/bottom?
