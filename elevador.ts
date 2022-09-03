import { DimensionId } from "bdsx/bds/actor";
import { BlockPos, Vec3 } from "bdsx/bds/blockpos";
import { ServerPlayer } from "bdsx/bds/player";
import { events } from "bdsx/event";
import { bedrockServer } from "bdsx/launcher";

function Teleport(player: ServerPlayer, pos: Vec3){
    player.teleport(Vec3.create(pos.x + 0.5, pos.y, pos.z + 0.5),player.getDimensionId(),Vec3.create(player.getRotation().x,player.getRotation().y,player.getRotation().x));
    setTimeout(function(){
        Particle(player);
        PlaySound(player.getDimensionId(), Vec3.create(pos.x + 0.5, pos.y, pos.z + 0.5));
        if(player.hasTag("elevador"))
            player.removeTag("elevador");
    },250);
}

function PlaySound(dimension: DimensionId, pos: Vec3){
    for(const _player of bedrockServer.serverInstance.getPlayers()) {
        if(_player.getDimensionId() == dimension){
            _player.playSound("block.composter.empty", {x:(pos.x + 0.5),y:(pos.y), z:(pos.z + 0.5)},100,0.5);
        }
    }
}

function ParticleRandom(){
    const particles = ["portal_directional","portal_east_west",
    "portal_north_south","portal_reverse_particle"];
    return particles[Math.floor(Math.random() * 4)];
}

function Particle(player: ServerPlayer){
    for(let i=0;i<10;i++){
        bedrockServer.level.spawnParticleEffect(`minecraft:${ParticleRandom()}`,
        Vec3.create(Math.floor(player.getPosition().x), Math.floor(player.getPosition().y) - 0.5,
        Math.floor(player.getPosition().z)), player.getDimension());
    }
}

events.playerJump.on(ev => {
    const region = ev.player.getRegion();
    const pos = ev.player.getPosition();
    let check = false;
    for(let i=Math.floor(pos.y);i<322;i++){
        const posCrying = BlockPos.create(Math.floor(pos.x), i-2, Math.floor(pos.z));
        const posFrame = BlockPos.create(Math.floor(pos.x), i-1, Math.floor(pos.z));
        const Crying = region.getBlock(posCrying)!;
        if(Crying){
            const Frame = region.getBlock(posFrame)!;
            if(Frame){
                if(ev.player.isPlayer() && !ev.player.hasTag("elevador")){
                    if(Crying.getName() == "minecraft:crying_obsidian"){
                        if(Frame.getName() == "minecraft:frame" || Frame.getName() == "minecraft:glow_frame"){
                            const frameActor = region.getBlockEntity(posFrame)!;
                            if(frameActor && frameActor.save().Item){
                                if(frameActor.save().Item.Name == "minecraft:amethyst_shard"){
                                    if(check){
                                        ev.player.addTag("elevador");
                                        Particle(ev.player);
                                        PlaySound(ev.player.getDimensionId(), Vec3.create(Math.floor(pos.x),Math.floor(pos.y),Math.floor(pos.z)));
                                        Teleport(ev.player, Vec3.create(Math.floor(pos.x),i-1,Math.floor(pos.z)));
                                        break;
                                    }
                                    else
                                        check = true;
                                }
                                else if(!check){
                                    break;
                                }
                            }
                            else if(!check){
                                break;
                            }
                        }
                        else if(!check){
                            break;
                        }
                    }
                    else if(!check){
                        break;
                    }
                }
            }
        }
    }
});

events.entitySneak.on(ev => {
    const region = ev.entity.getRegion();
    const pos = ev.entity.getPosition();
    let check = false;
    for(let i=Math.floor(pos.y);i>-64;i--){
        const posCrying = BlockPos.create(Math.floor(pos.x), i-2, Math.floor(pos.z));
        const posFrame = BlockPos.create(Math.floor(pos.x), i-1, Math.floor(pos.z));
        const Crying = region.getBlock(posCrying)!;
        if(Crying){
            const Frame = region.getBlock(posFrame)!;
            if(Frame){
                if(ev.entity.isPlayer() && !ev.entity.hasTag("elevador")){
                    if(Crying.getName() == "minecraft:crying_obsidian"){
                        if(Frame.getName() == "minecraft:frame" || Frame.getName() == "minecraft:glow_frame"){
                            const frameActor = region.getBlockEntity(posFrame)!;
                            if(frameActor && frameActor.save().Item){
                                if(frameActor.save().Item.Name == "minecraft:amethyst_shard"){
                                    if(check){
                                        Particle(ev.entity);
                                        ev.entity.setSneaking(false);
                                        ev.entity.addTag("elevador");
                                        PlaySound(ev.entity.getDimensionId(), Vec3.create(Math.floor(pos.x),Math.floor(pos.y),Math.floor(pos.z)));
                                        Teleport(ev.entity, Vec3.create(Math.floor(pos.x),i-1,Math.floor(pos.z)));
                                        break;
                                    }
                                    else
                                        check = true;
                                }
                                else if(!check){
                                    break;
                                }
                            }
                            else if(!check){
                                break;
                            }
                        }
                        else if(!check){
                            break;
                        }
                    }
                    else if(!check){
                        break;
                    }
                }
            }
        }
    }
});