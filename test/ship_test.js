var expext = require('chai').expect;

describe('checkForShip', function() {
    var checkForShip = require('../game_logic/ship_methods').checkForShip;

    it('should correctly report no ship at a given players coordinate', function() {
        player = {
            ships: [{
                locations: [
                    [0, 0]
                ]
            }]
        };

        expext(checkForShip(player, [9, 9])).to.be.false;
    });

    it('should correctly report a ship located at a given coordinate', function() {
        player = {
            ships: [{
                locations: [
                    [0, 0]
                ]
            }]
        };

        expext(checkForShip(player, [0, 0])).to.be.deep.equal(player.ships[0]);
    });

    it('should handle ships located at more than one coordinate', function() {
        player = {
            ships: [{
                locations: [
                    [0, 0],
                    [0, 1]
                ]
            }]
        };

        expext(checkForShip(player, [0, 1])).to.deep.equal(player.ships[0]);
        expext(checkForShip(player, [0, 0])).to.deep.equal(player.ships[0]);
        expext(checkForShip(player, [9, 9])).to.be.false;
    });

    it('should handle checking multple ships', function() {
        player = {
            ships: [{
                    locations: [
                        [0, 0],
                        [0, 1]
                    ]
                },
                {
                    locations: [
                        [1, 0],
                        [1, 1]
                    ]
                },
                {
                    locations: [
                        [2, 0],
                        [2, 1],
                        [2, 2],
                        [2, 3]
                    ]
                }
            ]
        };

        expext(checkForShip(player, [0, 1])).to.be.deep.equal(player.ships[0]);
        expext(checkForShip(player, [0, 0])).to.be.deep.equal(player.ships[0]);
        expext(checkForShip(player, [1, 0])).to.be.deep.equal(player.ships[1]);
        expext(checkForShip(player, [1, 1])).to.be.deep.equal(player.ships[1]);
        expext(checkForShip(player, [2, 3])).to.be.deep.equal(player.ships[2]);
        expext(checkForShip(player, [9, 9])).to.be.false;
    });
});

describe('damageShip', function() {
    var damageShip = require('../game_logic/ship_methods').damageShip;

    it('should register damage on a given ship at a given location', function() {
        var ship = {
            locations: [
                [0, 0]
            ],
            damage: []
        };

        damageShip(ship, [0, 0]);

        expext(ship.damage).to.not.be.empty
        expext(ship.damage[0]).to.deep.equal([0, 0]);
    });
});

describe('fire', function() {
    var fire = require('../game_logic/ship_methods').fire;

    it('should record damage on a given ship at a give coordinate', function() {
        var player = {
            ships: [{
                locations: [
                    [0, 0],
                ],
                damage: []
            }]
        }
        fire(player, [0, 0]);

        expext(player.ships[0].damage[0]).to.deep.equal([0, 0]);
    });

    it('should NOT record damage if there is no ship at coordinates', function() {
        var player = {
            ships: [{
                locations: [
                    [0, 0],
                ],
                damage: []
            }]
        }
        fire(player, [9, 9]);

        expext(player.ships[0].damage).to.be.empty;
    });
});