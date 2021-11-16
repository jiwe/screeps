import roleHarvester from "./role.harvester";

var roleUpgrader = {
  /** @param {Creep} creep **/
  run: function (creep: Creep) {
    if (creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
      creep.memory.working = false;
      creep.say("🔄 harvest");
    }
    if (!creep.memory.working && creep.store.getFreeCapacity() == 0) {
      creep.memory.working = true;
      creep.say("⚡ upgrade");
    }

    if (creep.memory.working) {
      if (creep.room.controller) {
        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
          creep.moveTo(creep.room.controller, {
            visualizePathStyle: { stroke: "#ffffff" }
          });
        }
      }
    } else {
      //   const source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
      //   if (source) {
      //     if (creep.harvest(source) == ERR_NOT_IN_RANGE)
      //       creep.moveTo(source, { visualizePathStyle: { stroke: "#ffaa00" } });
      //   }
      let sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], { visualizePathStyle: { stroke: "#ffaa00" } });
      }
    }
  }
};

export default roleHarvester;
