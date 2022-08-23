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
            if (Frame.getName() == "minecraft:frame" || Frame.getName() == "minecraft:glow_frame") {
                const frameActor = region.getBlockEntity(posFrame);
                if (frameActor.save().Item) {
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
            if (Frame.getName() == "minecraft:frame" || Frame.getName() == "minecraft:glow_frame") {
                const frameActor = region.getBlockEntity(posFrame);
                if (frameActor.save().Item) {
                    if (frameActor.save().Item.Name == "minecraft:amethyst_shard") {
                        //ev.entity.sendActionbar("DOWN!!");
                        ev.entity.setSneaking(false);
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
                if (Frame.getName() == "minecraft:frame" || Frame.getName() == "minecraft:glow_frame") {
                    const frameActor = region.getBlockEntity(posFrame);
                    if (frameActor.save().Item) {
                        if (frameActor.save().Item.Name == "minecraft:amethyst_shard") {
                            player.teleport(blockpos_1.Vec3.create(pos.x, Math.floor(i) + 1, pos.z), player.getDimensionId(), blockpos_1.Vec3.create(player.getRotation().x, 1, player.getRotation().y));
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
    else if (type == Type.down) {
        for (let i = Math.floor(pos.y - 3); i > -64; i--) {
            const posCrying = blockpos_1.BlockPos.create(Math.floor(pos.x), Math.floor(i) - 2, Math.floor(pos.z));
            const posFrame = blockpos_1.BlockPos.create(Math.floor(pos.x), Math.floor(i) - 1, Math.floor(pos.z));
            const Crying = region.getBlock(posCrying);
            const Frame = region.getBlock(posFrame);
            if (Crying.getName() == "minecraft:crying_obsidian") {
                if (Frame.getName() == "minecraft:frame") {
                    const frameActor = region.getBlockEntity(posFrame);
                    if (frameActor.save().Item) {
                        if (frameActor.save().Item.Name == "minecraft:amethyst_shard") {
                            player.teleport(blockpos_1.Vec3.create(pos.x, Math.floor(i) + 1, pos.z), player.getDimensionId(), blockpos_1.Vec3.create(player.getRotation().x, 1, player.getRotation().y));
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxldmFkb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlbGV2YWRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLGdEQUFtRDtBQUduRCxzQ0FBb0M7QUFDcEMsNENBQThDO0FBRTlDLElBQUssSUFHSjtBQUhELFdBQUssSUFBSTtJQUNMLDJCQUFFLENBQUE7SUFDRiwrQkFBSSxDQUFBO0FBQ1IsQ0FBQyxFQUhJLElBQUksS0FBSixJQUFJLFFBR1I7QUFFRCxjQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUN0QixNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JDLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDcEMsTUFBTSxTQUFTLEdBQUcsbUJBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0YsTUFBTSxRQUFRLEdBQUcsbUJBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUYsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUUsQ0FBQztJQUMzQyxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBRSxDQUFDO0lBRXpD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