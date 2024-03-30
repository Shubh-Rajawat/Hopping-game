import React from 'react'
import kaboom from "kaboom";
import { useEffect, useState } from 'react';
import jet from "../sprites/jet.svg"
const Flight = () => {
    const [ restart, setRestart ] = useState( false )
    useEffect( () => {
        let boom = kaboom();
        let obstacle;
        let obstacle2;
        let player;
        let platform;
        let upperPlatform;
        console.log( "kaboom->", boom.move )

        boom.setGravity( 900 )
        boom.loadBean()
        boom.loadSprite( "jet", jet )
        boom.scene( "game", () => {

            //|||||
            player = boom.add( [
                boom.sprite( "jet" ),
                boom.pos( 140, 200 ),
                boom.area(),
                boom.body(),
                "player"
            ] )

            platform = boom.add( [
                boom.rect( 2000, 48 ),
                boom.pos( 0, 950 - 48 ),
                boom.outline( 4 ),
                boom.area(),
                boom.body( { isStatic: true } ),
                boom.color( 127, 200, 255 ),
                "platform"
            ] )
            upperPlatform = boom.add( [
                boom.rect( 2000, 48 ),
                boom.pos( 0, 0 ),
                boom.outline( 4 ),
                boom.area(),
                boom.body( { isStatic: true } ),
                boom.color( 127, 200, 255 ),
                "platform"
            ] )

            boom.loop( 2.5, () => {
                obstacle = boom.add( [
                    boom.rect( 48, boom.rand( 200, 500 ) ),
                    boom.area(),
                    boom.outline( 4 ),
                    boom.pos( boom.rand( 1200, 1400 ), 950 - 48 ),
                    boom.anchor( "botleft" ),
                    boom.color( 255, 180, 255 ),
                    boom.move( 180, 240 ),
                    "tree",
                ] );
            } )
            boom.loop( 2, () => {
                obstacle2 = boom.add( [
                    boom.rect( 48, boom.rand( 200, 500 ) ),
                    boom.area(),
                    boom.outline( 4 ),
                    boom.pos( boom.rand( 1200, 1500 ), 48 ),
                    boom.anchor( "topleft" ),
                    boom.color( 255, 180, 255 ),
                    boom.move( 180, 240 ),
                    "tree",
                ] );
            } )
            boom.onKeyPress( "space", () => {
                player.jump( 300 )
            } )
            boom.onKeyPress( "up", () => {
                player.jump( 300 )
            } )

            player.onCollide( "tree", () => {
                boom.go( "lose", score )
                boom.burp();
                boom.addKaboom( player.pos );
                boom.shake();
                // player.destroy();
                setRestart( !restart )

            } );
            player.onCollide( "platform", () => {
                boom.go( "lose", score )
                boom.burp();
                boom.addKaboom( player.pos );
                boom.shake();
                // player.destroy();
                setRestart( !restart )

            } );
            ////////////
            let score = 0;

            const scoreLabel = boom.add( [
                boom.text( score ),
                boom.pos( 24, 24 ),
            ] );

            // increment score every frame
            boom.onUpdate( () => {
                score++;
                scoreLabel.text = score;
            } );



        } )
        // loose scene
        boom.scene( "lose", ( score ) => {

            boom.add( [
                boom.sprite( "bean" ),
                boom.pos( 950, 900 / 2 - 80 ),
                boom.scale( 2 ),
                boom.anchor( "center" ),
            ] );

            // display score
            boom.add( [
                boom.text( score ),
                boom.pos( 950, 900 / 2 + 80 ),
                boom.scale( 2 ),
                boom.anchor( "center" ),
            ] );
            boom.add( [
                boom.text( "Press space to restart" ),
                boom.pos( 950, 600 ),
                boom.scale( 1 ),
                boom.color( 0, 0, 0 ),
                boom.anchor( "center" ),
            ] );

            // go back to game with space is pressed
            boom.onKeyPress( "space", () => boom.go( "game" ) );
            boom.onClick( () => boom.go( "game" ) );

        } );
        boom.go( "game" )







    }, [] )

    return (
        <></>
    )
}

export default Flight