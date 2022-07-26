"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blockpos_1 = require("bdsx/bds/blockpos");
const event_1 = require("bdsx/event");
const launcher_1 = require("bdsx/launcher");
var Type;
(function (Type) {
    Type[Type["up"] = 0] = "up";
    Type[Type["down"] = 1] = "down";
})(Type || (Type = {}));
event_1.events.playerJump.on(ev => {
    const region = ev.player.getRegion();
    const pos = ev.player.getPosition();
    const posCrying = blockpos_1.BlockPos.create(Math.floor(pos.x), Math.floor(pos.y) - 2, Math.floor(pos.z));
    const posFrame = blockpos_1.BlockPos.create(Math.floor(pos.x), Math.floor(pos.y) - 1, Math.floor(pos.z));
    const Crying = region.getBlock(posCrying);
    const Frame = region.getBlock(posFrame);
    if (ev.player.isPlayer()) {
        if (Crying.getName() == "minecraft:crying_obsidian") {
            if (Frame.getName() == "minecraft:frame") {
                const frameActor = region.getBlockEntity(posFrame);
                if (frameActor.save().Item.Name != undefined) {
                    if (frameActor.save().Item.Name == "minecraft:amethyst_shard") {
                        //ev.player.sendActionbar("UP!!");
                        getTeleport(ev.player, region, Type.up);
                    }
                }
            }
        }
    }
});
event_1.events.entitySneak.on(ev => {
    const region = ev.entity.getRegion();
    const pos = ev.entity.getPosition();
    const posCrying = blockpos_1.BlockPos.create(Math.floor(pos.x), Math.floor(pos.y) - 2, Math.floor(pos.z));
    const posFrame = blockpos_1.BlockPos.create(Math.floor(pos.x), Math.floor(pos.y) - 1, Math.floor(pos.z));
    const Crying = region.getBlock(posCrying);
    const Frame = region.getBlock(posFrame);
    if (ev.entity.isPlayer() && ev.isSneaking && !ev.entity.hasTag("elevador_down")) {
        if (Crying.getName() == "minecraft:crying_obsidian") {
            if (Frame.getName() == "minecraft:frame") {
                const frameActor = region.getBlockEntity(posFrame);
                if (frameActor.save().Item.Name != undefined) {
                    if (frameActor.save().Item.Name == "minecraft:amethyst_shard") {
                        //ev.entity.sendActionbar("DOWN!!");
                        //ev.entity.setSneaking(false);
                        ev.entity.addTag("elevador_down");
                        setTimeout(function () {
                            ev.entity.removeTag("elevador_down");
                        }, 500);
                        getTeleport(ev.entity, region, Type.down);
                    }
                }
            }
        }
    }
});
async function getTeleport(player, region, type) {
    if (!player.isPlayer()) {
        return;
    }
    const pos = player.getPosition();
    if (type == Type.up) {
        for (let i = Math.floor(pos.y + 3); i < 322; i++) {
            const posCrying = blockpos_1.BlockPos.create(Math.floor(pos.x), Math.floor(i) - 2, Math.floor(pos.z));
            const posFrame = blockpos_1.BlockPos.create(Math.floor(pos.x), Math.floor(i) - 1, Math.floor(pos.z));
            const Crying = region.getBlock(posCrying);
            const Frame = region.getBlock(posFrame);
            if (Crying.getName() == "minecraft:crying_obsidian") {
                if (Frame.getName() == "minecraft:frame") {
                    const frameActor = region.getBlockEntity(posFrame);
                    if (frameActor.save().Item.Name == "minecraft:amethyst_shard") {
                        player.teleport(blockpos_1.Vec3.create(pos.x, Math.floor(i) + 1, pos.z), player.getDimensionId(), player.getFeetPos());
                        for (const _player of launcher_1.bedrockServer.serverInstance.getPlayers()) {
                            if (_player.getDimensionId() == player.getDimensionId()) {
                                _player.playSound("block.composter.empty", { x: Math.floor(pos.x), y: Math.floor(pos.y), z: Math.floor(pos.z) }, 100, 0.5);
                                _player.playSound("block.composter.empty", { x: Math.floor(pos.x), y: Math.floor(i), z: Math.floor(pos.z) }, 100, 0.5);
                            }
                        }
                        break;
                    }
                }
            }
        }
    }
    else if (type == Type.down) {
        for (let i = Math.floor(pos.y - 3); i > -64; i--) {
            const posCrying = blockpos_1.BlockPos.create(Math.floor(pos.x), Math.floor(i) - 2, Math.floor(pos.z));
            const posFrame = blockpos_1.BlockPos.create(Math.floor(pos.x), Math.floor(i) - 1, Math.floor(pos.z));
            const Crying = region.getBlock(posCrying);
            const Frame = region.getBlock(posFrame);
            if (Crying.getName() == "minecraft:crying_obsidian") {
                if (Frame.getName() == "minecraft:frame") {
                    const frameActor = region.getBlockEntity(posFrame);
                    if (frameActor.save().Item.Name == "minecraft:amethyst_shard") {
                        player.teleport(blockpos_1.Vec3.create(pos.x, Math.floor(i) + 1, pos.z), player.getDimensionId(), player.getFeetPos());
                        for (const _player of launcher_1.bedrockServer.serverInstance.getPlayers()) {
                            if (_player.getDimensionId() == player.getDimensionId()) {
                                _player.playSound("block.composter.empty", { x: Math.floor(pos.x), y: Math.floor(pos.y), z: Math.floor(pos.z) }, 100, 0.5);
                                _player.playSound("block.composter.empty", { x: Math.floor(pos.x), y: Math.floor(i), z: Math.floor(pos.z) }, 100, 0.5);
                            }
                        }
                        break;
                    }
                }
            }
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxldmFkb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlbGV2YWRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLGdEQUFtRDtBQUduRCxzQ0FBb0M7QUFDcEMsNENBQThDO0FBRTlDLElBQUssSUFHSjtBQUhELFdBQUssSUFBSTtJQUNMLDJCQUFFLENBQUE7SUFDRiwrQkFBSSxDQUFBO0FBQ1IsQ0FBQyxFQUhJLElBQUksS0FBSixJQUFJLFFBR1I7QUFFRCxjQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUN0QixNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JDLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDcEMsTUFBTSxTQUFTLEdBQUcsbUJBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0YsTUFBTSxRQUFRLEdBQUcsbUJBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUYsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMxQyxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRXhD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