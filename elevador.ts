import { Block, BlockSource } from "bdsx/bds/block";
import { BlockPos, Vec3 } from "bdsx/bds/blockpos";
import { NBT } from "bdsx/bds/nbt";
import { Player } from "bdsx/bds/player";
import { events } from "bdsx/event";
import { bedrockServer } from "bdsx/launcher";

enum Type{
    up,
    down
}

events.playerJump.on(ev => {
    const region = ev.player.getRegion();
    const pos = ev.player.getPosition();
    const posCrying = BlockPos.create(Math.floor(pos.x), Math.floor(pos.y)-2, Math.floor(pos.z));
    const posFrame = BlockPos.create(Math.floor(pos.x), Math.floor(pos.y)-1, Math.floor(pos.z));
    const Crying = region.getBlock(posCrying)!;
    const Frame = region.getBlock(posFrame)!;

    if(ev.player.isPlayer()){
        if(Crying.getName() == "minecraft:crying_obsidian"){
            if(Frame.getName() == "minecraft:frame" || Frame.getName() == "minecraft:glow_frame"){
                const frameActor = region.getBlockEntity(posFrame)!;
                if(frameActor.save().Item){
                    if(frameActor.save().Item.Name == "minecraft:amethyst_shard"){
                        //ev.player.sendActionbar("UP!!");
                        getTeleport(ev.player,region,Type.up);
                    }
                }
            }
        }
    }
});

events.entitySneak.on(ev => {
    const region = ev.entity.getRegion();
    const pos = ev.entity.getPosition();
    const posCrying = BlockPos.create(Math.floor(pos.x), Math.floor(pos.y)-2, Math.floor(pos.z));
    const posFrame = BlockPos.create(Math.floor(pos.x), Math.floor(pos.y)-1, Math.floor(pos.z));
    const Crying = region.getBlock(posCrying)!;
    const Frame = region.getBlock(posFrame)!;

    if(ev.entity.isPlayer() && ev.isSneaking && !ev.entity.hasTag("elevador_down")){
        if(Crying.getName() == "minecraft:crying_obsidian"){
            if(Frame.getName() == "minecraft:frame" || Frame.getName() == "minecraft:glow_frame"){
                const frameActor = region.getBlockEntity(posFrame)!;
                if(frameActor.save().Item){
                    if(frameActor.save().Item.Name == "minecraft:amethyst_shard"){
                        //ev.entity.sendActionbar("DOWN!!");
                        ev.entity.setSneaking(false);
                        ev.entity.addTag("elevador_down");
                        setTimeout(function(){
                            ev.entity.removeTag("elevador_down");
                        },500);
                        getTeleport(ev.entity,region,Type.down);
                    }
                }
            }
        }
    }
});

async function getTeleport(player: Player, region: BlockSource, type: Type){
    if(!player.isPlayer()){
        return;
    }
    const pos = player.getPosition();
    if(type == Type.up){
        for(let i=Math.floor(pos.y+3);i<322;i++){
            const posCrying = BlockPos.create(Math.floor(pos.x), Math.floor(i)-2, Math.floor(pos.z));
            const posFrame = BlockPos.create(Math.floor(pos.x), Math.floor(i)-1, Math.floor(pos.z));
            const Crying = region.getBlock(posCrying)!;
            const Frame = region.getBlock(posFrame)!;

            if(Crying.getName() == "minecraft:crying_obsidian"){
                if(Frame.getName() == "minecraft:frame" || Frame.getName() == "minecraft:glow_frame"){
                    const frameActor = region.getBlockEntity(posFrame)!;
                    if(frameActor.save().Item){
                        if(frameActor.save().Item.Name == "minecraft:amethyst_shard"){
                            player.teleport(Vec3.create(pos.x, Math.floor(i)+1, pos.z),player.getDimensionId(),Vec3.create(player.getRotation().x,1,player.getRotation().y));
                            for (const _player of bedrockServer.serverInstance.getPlayers()) {
                                if(_player.getDimensionId() == player.getDimensionId()){
                                    _player.playSound("block.composter.empty", {x:Math.floor(pos.x),y:Math.floor(pos.y), z:Math.floor(pos.z)},100,0.5)
                                    _player.playSound("block.composter.empty", {x:Math.floor(pos.x),y:Math.floor(i), z:Math.floor(pos.z)},100,0.5)
                                }
                            }
                            break;
                        }
                    }
                }
            }
        }
    }
    else if(type == Type.down){
        for(let i=Math.floor(pos.y-3);i>-64;i--){
            const posCrying = BlockPos.create(Math.floor(pos.x), Math.floor(i)-2, Math.floor(pos.z));
            const posFrame = BlockPos.create(Math.floor(pos.x), Math.floor(i)-1, Math.floor(pos.z));
            const Crying = region.getBlock(posCrying)!;
            const Frame = region.getBlock(posFrame)!;

            if(Crying.getName() == "minecraft:crying_obsidian"){
                if(Frame.getName() == "minecraft:frame"){
                    const frameActor = region.getBlockEntity(posFrame)!;
                    if(frameActor.save().Item){
                        if(frameActor.save().Item.Name == "minecraft:amethyst_shard"){
                            player.teleport(Vec3.create(pos.x, Math.floor(i)+1, pos.z),player.getDimensionId(),Vec3.create(player.getRotation().x,1,player.getRotation().y));
                            for (const _player of bedrockServer.serverInstance.getPlayers()) {
                                if(_player.getDimensionId() == player.getDimensionId()){
                                    _player.playSound("block.composter.empty", {x:Math.floor(pos.x),y:Math.floor(pos.y), z:Math.floor(pos.z)},100,0.5)
                                    _player.playSound("block.composter.empty", {x:Math.floor(pos.x),y:Math.floor(i), z:Math.floor(pos.z)},100,0.5)
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