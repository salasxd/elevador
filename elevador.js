"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blockpos_1 = require("bdsx/bds/blockpos");
const event_1 = require("bdsx/event");
const launcher_1 = require("bdsx/launcher");
function Teleport(player, pos) {
    player.teleport(blockpos_1.Vec3.create(pos.x + 0.5, pos.y, pos.z + 0.5), player.getDimensionId(), blockpos_1.Vec3.create(player.getRotation().x, player.getRotation().y, player.getRotation().x));
    setTimeout(function () {
        Particle(player);
        PlaySound(player.getDimensionId(), blockpos_1.Vec3.create(pos.x + 0.5, pos.y, pos.z + 0.5));
        if (player.hasTag("elevador"))
            player.removeTag("elevador");
    }, 250);
}
function PlaySound(dimension, pos) {
    for (const _player of launcher_1.bedrockServer.serverInstance.getPlayers()) {
        if (_player.getDimensionId() == dimension) {
            _player.playSound("block.composter.empty", { x: (pos.x + 0.5), y: (pos.y), z: (pos.z + 0.5) }, 100, 0.5);
        }
    }
}
function ParticleRandom() {
    const particles = ["portal_directional", "portal_east_west",
        "portal_north_south", "portal_reverse_particle"];
    return particles[Math.floor(Math.random() * 4)];
}
function Particle(player) {
    for (let i = 0; i < 10; i++) {
        launcher_1.bedrockServer.level.spawnParticleEffect(`minecraft:${ParticleRandom()}`, blockpos_1.Vec3.create(Math.floor(player.getPosition().x), Math.floor(player.getPosition().y) - 0.5, Math.floor(player.getPosition().z)), player.getDimension());
    }
}
event_1.events.playerJump.on(ev => {
    const region = ev.player.getRegion();
    const pos = ev.player.getPosition();
    let check = false;
    for (let i = Math.floor(pos.y); i < 322; i++) {
        const posCrying = blockpos_1.BlockPos.create(Math.floor(pos.x), i - 2, Math.floor(pos.z));
        const posFrame = blockpos_1.BlockPos.create(Math.floor(pos.x), i - 1, Math.floor(pos.z));
        const Crying = region.getBlock(posCrying);
        if (Crying) {
            const Frame = region.getBlock(posFrame);
            if (Frame) {
                if (ev.player.isPlayer() && !ev.player.hasTag("elevador")) {
                    if (Crying.getName() == "minecraft:crying_obsidian") {
                        if (Frame.getName() == "minecraft:frame" || Frame.getName() == "minecraft:glow_frame") {
                            const frameActor = region.getBlockEntity(posFrame);
                            if (frameActor && frameActor.save().Item) {
                                if (frameActor.save().Item.Name == "minecraft:amethyst_shard") {
                                    if (check) {
                                        ev.player.addTag("elevador");
                                        Particle(ev.player);
                                        PlaySound(ev.player.getDimensionId(), blockpos_1.Vec3.create(Math.floor(pos.x), Math.floor(pos.y), Math.floor(pos.z)));
                                        Teleport(ev.player, blockpos_1.Vec3.create(Math.floor(pos.x), i - 1, Math.floor(pos.z)));
                                        break;
                                    }
                                    else
                                        check = true;
                                }
                                else if (!check) {
                                    break;
                                }
                            }
                            else if (!check) {
                                break;
                            }
                        }
                        else if (!check) {
                            break;
                        }
                    }
                    else if (!check) {
                        break;
                    }
                }
            }
        }
    }
});
event_1.events.entitySneak.on(ev => {
    const region = ev.entity.getRegion();
    const pos = ev.entity.getPosition();
    let check = false;
    for (let i = Math.floor(pos.y); i > -64; i--) {
        const posCrying = blockpos_1.BlockPos.create(Math.floor(pos.x), i - 2, Math.floor(pos.z));
        const posFrame = blockpos_1.BlockPos.create(Math.floor(pos.x), i - 1, Math.floor(pos.z));
        const Crying = region.getBlock(posCrying);
        if (Crying) {
            const Frame = region.getBlock(posFrame);
            if (Frame) {
                if (ev.entity.isPlayer() && !ev.entity.hasTag("elevador")) {
                    if (Crying.getName() == "minecraft:crying_obsidian") {
                        if (Frame.getName() == "minecraft:frame" || Frame.getName() == "minecraft:glow_frame") {
                            const frameActor = region.getBlockEntity(posFrame);
                            if (frameActor && frameActor.save().Item) {
                                if (frameActor.save().Item.Name == "minecraft:amethyst_shard") {
                                    if (check) {
                                        Particle(ev.entity);
                                        ev.entity.setSneaking(false);
                                        ev.entity.addTag("elevador");
                                        PlaySound(ev.entity.getDimensionId(), blockpos_1.Vec3.create(Math.floor(pos.x), Math.floor(pos.y), Math.floor(pos.z)));
                                        Teleport(ev.entity, blockpos_1.Vec3.create(Math.floor(pos.x), i - 1, Math.floor(pos.z)));
                                        break;
                                    }
                                    else
                                        check = true;
                                }
                                else if (!check) {
                                    break;
                                }
                            }
                            else if (!check) {
                                break;
                            }
                        }
                        else if (!check) {
                            break;
                        }
                    }
                    else if (!check) {
                        break;
                    }
                }
            }
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxldmFkb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlbGV2YWRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLGdEQUFtRDtBQUVuRCxzQ0FBb0M7QUFDcEMsNENBQThDO0FBRTlDLFNBQVMsUUFBUSxDQUFDLE1BQW9CLEVBQUUsR0FBUztJQUM3QyxNQUFNLENBQUMsUUFBUSxDQUFDLGVBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsRUFBQyxlQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4SyxVQUFVLENBQUM7UUFDUCxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakIsU0FBUyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsRUFBRSxlQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2pGLElBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7WUFDeEIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNyQyxDQUFDLEVBQUMsR0FBRyxDQUFDLENBQUM7QUFDWCxDQUFDO0FBRUQsU0FBUyxTQUFTLENBQUMsU0FBc0IsRUFBRSxHQUFTO0lBQ2hELEtBQUksTUFBTSxPQUFPLElBQUksd0JBQWEsQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLEVBQUU7UUFDNUQsSUFBRyxPQUFP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